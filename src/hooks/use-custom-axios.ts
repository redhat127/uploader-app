import { errorMsg } from '#/lib/message'
import type { ERROR_MSG_KEYS } from '#/lib/message'
import { objHasErrorKeyString } from '#/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'

export const useCustomAxios = () => {
  const navigate = useNavigate()

  const customAxios = axios.create()

  customAxios.interceptors.response.use(
    (response) => response,
    (e: AxiosError) => {
      if (e.response?.status === 401) {
        localStorage.setItem('auth-event', crypto.randomUUID())

        navigate({ to: '/auth', replace: true })

        return new Promise(() => {})
      } else if (objHasErrorKeyString(e.response?.data)) {
        const { error } = e.response.data

        toast.error(
          errorMsg[error as ERROR_MSG_KEYS] || error || errorMsg['generic'],
        )
      } else {
        toast.error(errorMsg['generic'])
      }

      return Promise.reject(e)
    },
  )

  return customAxios
}
