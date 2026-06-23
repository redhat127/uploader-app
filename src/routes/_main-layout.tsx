import { Header } from '#/components/header'
import { Toaster } from '#/components/ui/sonner'
import type { SUCCESS_MSG_KEYS, errorMsg, successMsg, type ERROR_MSG_KEYS  } from '#/lib/message'
import { getUserServerFn } from '#/serverfn/user'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export const Route = createFileRoute('/_main-layout')({
  component: RouteComponent,
  validateSearch: z.object({
    error: z.string().optional(),
    success: z.string().optional(),
  }),
  async beforeLoad() {
    const { user } = await getUserServerFn()

    return { user }
  },
})

function RouteComponent() {
  const { error, success } = Route.useSearch()

  const navigate = useNavigate()

  const displayedKey = useRef<string | null>(null)

  const key = `${error ?? ''}-${success ?? ''}`

  useEffect(() => {
    if (!error && !success) return
    if (displayedKey.current === key) return

    if (error) {
      toast.error(errorMsg[error as ERROR_MSG_KEYS] || errorMsg['generic'])
    } else if (success) {
      toast.success(successMsg[success as SUCCESS_MSG_KEYS])
    }

    displayedKey.current = key

    navigate({ to: '.', replace: true, search: {} })
  }, [error, success])

  return (
    <>
      <Header />
      <main className="mt-(--header-height) p-8">
        <Outlet />
      </main>
      <Toaster
        closeButton
        duration={8000}
        position="top-center"
        expand
        className="font-sans!"
      />
    </>
  )
}
