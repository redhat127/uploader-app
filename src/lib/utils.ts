import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { APP_NAME_FARSI } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateTitle = (title: string) => {
  return `${APP_NAME_FARSI} - ${title}`
}
