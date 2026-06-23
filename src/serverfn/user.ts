import { getSessionUser } from '#/lib/session.server'
import { createServerFn } from '@tanstack/react-start'

export const getUserServerFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await getSessionUser()
    return { user }
  },
)
