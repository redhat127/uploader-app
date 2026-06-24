import { getSessionUser } from '#/lib/session.server'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

export const requireAuthApiMiddleware = createMiddleware().server(
  async ({ next }) => {
    const user = await getSessionUser()

    if (!user)
      return Response.json({ error: 'کاربر یافت نشد.' }, { status: 401 })

    return next({ context: { user: { id: user.id } } })
  },
)

export const requireAuthMiddleware = createMiddleware({
  type: 'function',
})
  .client(async ({ next }) => {
    const result = await next()

    const context = result.context as unknown as
      | { error: string | null }
      | undefined

    if (context?.error === 'user-not-found') {
      localStorage.setItem('auth-event', crypto.randomUUID())

      throw redirect({ to: '/auth', replace: true })
    }

    return result
  })
  .server(async ({ next }) => {
    const user = await getSessionUser()

    return next({
      context: { user: user ? { id: user.id } : null },
      sendContext: { error: !user ? 'user-not-found' : null },
    })
  })
