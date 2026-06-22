import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_sp/_guest')({
  component: RouteComponent,
  beforeLoad({ context: { user } }) {
    if (user) throw redirect({ to: '/', replace: true })
  },
})

function RouteComponent() {
  return <Outlet />
}
