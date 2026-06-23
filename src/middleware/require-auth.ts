import { getSessionUser } from '#/lib/session.server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

const createRequireAuthMiddleware = ({
  forApiCall = false,
}: {
  forApiCall?: boolean
} = {}) =>
  createMiddleware().server(async ({ next }) => {
    const user = await getSessionUser()

    if (!user) {
      if (forApiCall) {
        return Response.json({ error: 'کاربر یافت نشد.' }, { status: 401 })
      }

      throw redirect({ to: '/auth', replace: true })
    }

    return next({
      context: {
        user: { id: user.id, image: user.image },
      },
    })
  })

export const requireAuthMiddleware = createRequireAuthMiddleware()
export const requireAuthApiMiddleware = createRequireAuthMiddleware({
  forApiCall: true,
})
