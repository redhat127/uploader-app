import z from 'zod'

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
  })
  .parse(process.env)
