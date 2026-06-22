import { db } from '#/db'
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTable,
} from '#/db/schema'
import { redisStorage } from '@better-auth/redis-storage'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { APP_NAME_EN, MAGIC_LINK_EXPIRES_IN_SECONDS } from './const'
import { env } from './env.server'
import { sendAuthMail } from './mailer.server'
import { redisClient } from './redis.server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  appName: APP_NAME_EN,
  baseURL: env.APP_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 50,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  plugins: [
    magicLink({
      expiresIn: MAGIC_LINK_EXPIRES_IN_SECONDS,
      storeToken: 'hashed',
      sendMagicLink: async (data) => {
        sendAuthMail({
          to: data.email,
          magicLink: data.url,
        }).catch(console.error)
      },
    }),
    tanstackStartCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          let name = ''

          do {
            name = uniqueNamesGenerator({
              dictionaries: [adjectives, animals],
              style: 'lowerCase',
              separator: '_',
              length: 2,
            })
          } while (name.length < 3 || name.length > 50)

          return {
            data: {
              ...user,
              name,
            },
          }
        },
      },
    },
  },
  advanced: {
    database: { generateId: false },
  },
  verification: {
    disableCleanup: false,
    storeInDatabase: false,
    storeIdentifier: 'hashed',
  },
  secondaryStorage: redisStorage({
    client: redisClient,
    keyPrefix: 'better-auth:',
  }),
})
