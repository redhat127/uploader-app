import z from 'zod'
import { validStorageName } from './storage.server'

export const env = z
  .object({
    DATABASE_URL: z.string().url(),
    APP_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(64),
    SMTP_URL: z.string().url(),
    NODE_ENV: z
      .literal(['development', 'production', 'test'])
      .optional()
      .default('development'),
    REDIS_URL: z.string().url(),
    STORAGE_NAME: z.literal(validStorageName),
  })
  .parse(process.env)
