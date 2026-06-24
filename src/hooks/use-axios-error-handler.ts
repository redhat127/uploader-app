import type { ERROR_MSG_KEYS } from '#/lib/message'
import { errorMsg } from '#/lib/message'
import { signalSessionExpired } from '#/lib/session'
import { objHasErrorKeyString } from '#/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'

export const useAxiosErrorHandler = () => {
  const navigate = useNavigate()

  const handler = async (e: AxiosError) => {
    if (axios.isCancel(e)) return

    if (e.response?.status === 401) {
      signalSessionExpired()

      await navigate({ to: '/auth', replace: true })

      return
    }

    if (objHasErrorKeyString(e.response?.data)) {
      const { error } = e.response.data

      toast.error(
        errorMsg[error as ERROR_MSG_KEYS] || error || errorMsg['generic'],
      )

      return
    }

    toast.error(errorMsg['generic'])
  }

  return { handler }
}
