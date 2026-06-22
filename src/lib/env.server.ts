import z from 'zod'

export const env = z
  .object({
    DATABASE_URL: z.string().url(),
    APP_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(64),
  })
  .parse(process.env)
