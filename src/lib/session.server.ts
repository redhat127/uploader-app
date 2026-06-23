import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'

export const getSessionUser = async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  return session?.user
}
