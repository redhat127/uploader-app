import { db } from '#/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { APP_NAME_EN } from './const'
import { env } from './env.server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
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
  plugins: [tanstackStartCookies()],
  advanced: {
    database: { generateId: false },
  },
})
