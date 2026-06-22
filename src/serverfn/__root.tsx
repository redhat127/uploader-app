import { getUser } from '#/lib/user.server'
import { createServerFn } from '@tanstack/react-start'

export const getRootData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await getUser()
    return { user }
  },
)
