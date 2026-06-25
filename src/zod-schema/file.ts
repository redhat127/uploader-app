import z from 'zod'

export const maxFileSizeMB = 10
export const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024

export const validMimeTypes = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WebP',
  'image/gif': 'GIF',
  'image/avif': 'AVIF',
  'application/pdf': 'PDF',
} as const

export const readableValidFileTypes = [
  ...new Set(Object.values(validMimeTypes)),
]

export const validMimeTypesArray = Object.keys(validMimeTypes)

export const fileZodSchema = z
  .instanceof(File, {
    error: 'فایلی انتخاب نشده است.',
  })
  .refine((file) => file.size > 0, {
    error: 'فایل خالی است.',
  })
  .refine((file) => file.size <= maxFileSizeBytes, {
    error: `حجم فایل بیشتر از ${maxFileSizeMB} مگابایت باشد.`,
  })
  .refine((file) => file.type in validMimeTypes, {
    error: 'فرمت فایل مجاز نیست.',
  })

export const filesZodSchema = z.array(fileZodSchema)
