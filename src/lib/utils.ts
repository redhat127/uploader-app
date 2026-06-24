import { warningMsg } from '#/lib/message'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { APP_NAME_FARSI } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateTitle = (title: string) => {
  return `${APP_NAME_FARSI} - ${title}`
}

export const objHasErrorKeyString = (
  obj: unknown,
): obj is { error: string } => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    typeof obj.error === 'string'
  )
}

export function signalSessionExpired() {
  if (typeof window === 'undefined') return

  localStorage.setItem('auth-event', crypto.randomUUID())

  toast.warning(warningMsg['sessionExpired'])
}
