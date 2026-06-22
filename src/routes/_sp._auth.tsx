import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_sp/_auth')({
  component: RouteComponent,
  beforeLoad({ context: { user } }) {
    if (!user) throw redirect({ to: '/auth', replace: true })
  },
})

function RouteComponent() {
  return <Outlet />
}
