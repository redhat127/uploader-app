import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_auth')({
  component: RouteComponent,
  beforeLoad({ context: { user } }) {
    if (!user) throw redirect({ to: '/auth', replace: true })
    return { currentUser: user }
  },
})

function RouteComponent() {
  return <Outlet />
}
