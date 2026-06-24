import { toast } from 'sonner'
import { warningMsg } from './message'

export function signalSessionExpired() {
  if (typeof window === 'undefined') return

  localStorage.setItem('auth-event', crypto.randomUUID())

  toast.warning(warningMsg['sessionExpired'])
}
