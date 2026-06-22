import z from 'zod'

export const emailZodSchema = z
  .string()
  .trim()
  .email('ایمیل معتبر الزامی است.')
  .max(50, 'ایمیل بیشتر از 50 کاراکتر است.')
  .refine(
    (email) => email === email.toLowerCase(),
    'ایمیل فقط می تواند حاوی حروف کوچک باشد.',
  )
