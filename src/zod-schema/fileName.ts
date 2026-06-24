import { z } from 'zod'
import { readableValidFileTypes } from './file'

export const filenameSchema = z
  .string()
  .min(1, 'Filename is required')
  .max(255, 'Filename too long')
  // no path separators of any kind
  .refine((name) => !name.includes('/') && !name.includes('\\'), {
    message: 'Invalid filename',
  })
  // no traversal sequences
  .refine((name) => !name.includes('..'), {
    message: 'Invalid filename',
  })
  // no null bytes
  .refine((name) => !name.includes('\0'), {
    message: 'Invalid filename',
  })
  // disallow leading dot (hidden files like .env)
  .refine((name) => !name.startsWith('.'), {
    message: 'Invalid filename',
  })
  // only safe characters: letters, numbers, dash, underscore, dot
  .refine((name) => /^[a-zA-Z0-9._-]+$/.test(name), {
    message: 'Filename contains invalid characters',
  })
  // must end in an allowed extension
  .refine((name) => {
    const ext = name.split('.').pop()?.toLowerCase()
    return ext
      ? readableValidFileTypes.map((t) => t.toLowerCase()).includes(ext)
      : false
  }, 'File type not allowed')
