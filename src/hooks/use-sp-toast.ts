import type { ERROR_MSG_KEYS, SUCCESS_MSG_KEYS } from '#/lib/message'
import { errorMsg, successMsg } from '#/lib/message'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useSpToast = () => {
  const { error, success } = useSearch({ from: '/_main-layout' })

  const navigate = useNavigate()

  const displayedKey = useRef<string | null>(null)

  const key = `${error ?? ''}-${success ?? ''}`

  useEffect(() => {
    if (!error && !success) return
    if (displayedKey.current === key) return

    if (error) {
      toast.error(errorMsg[error as ERROR_MSG_KEYS] || errorMsg['generic'])
    } else if (success) {
      const successKey = success as SUCCESS_MSG_KEYS

      if (successKey === 'loggedIn' || successKey === 'newUserWelcome') {
        localStorage.setItem('auth-event', crypto.randomUUID())
      }

      toast.success(successMsg[successKey])
    }

    displayedKey.current = key

    navigate({ to: '.', replace: true, search: {} })
  }, [error, success])
}
