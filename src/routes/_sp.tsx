import { useSpToast } from '#/hooks/use-sp-toast'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/_sp')({
  component: RouteComponent,
  validateSearch: z.object({
    error: z.string().optional(),
    success: z.string().optional(),
  }),
})

function RouteComponent() {
  useSpToast()

  return <Outlet />
}
