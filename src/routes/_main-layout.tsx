import { ErrorComponent } from '#/components/error-component'
import { Header } from '#/components/header'
import { NotFound } from '#/components/not-found'
import { Toaster } from '#/components/ui/sonner'
import { useSpToast } from '#/hooks/use-sp-toast'
import { getUserServerFn } from '#/serverfn/user'
import {
  ClientOnly,
  createFileRoute,
  Outlet,
  useRouter,
} from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
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
  notFoundComponent() {
    return (
      <Wrapper>
        <div className="mt-16">
          <NotFound />
        </div>
      </Wrapper>
    )
  },
  errorComponent({ reset }) {
    return (
      <Wrapper>
        <div className="mt-16">
          <ErrorComponent reset={reset} />
        </div>
      </Wrapper>
    )
  },
})

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-(--header-height) p-8">{children}</main>
    </>
  )
}

function RouteComponent() {
  useSpToast()

  return (
    <>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Toaster
        closeButton
        duration={8000}
        position="top-center"
        expand
        className="font-sans!"
      />
      <ClientOnly fallback={<div></div>}>
        <Client />
      </ClientOnly>
    </>
  )
}

const Client = () => {
  const router = useRouter()

  const authEventRef = useRef<string | null>(null)

  useEffect(() => {
    const existing = localStorage.getItem('auth-event')
    const initial = existing || crypto.randomUUID()

    if (!existing) {
      localStorage.setItem('auth-event', initial)
    }

    authEventRef.current = initial
  }, [])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (!authEventRef.current || e.key !== 'auth-event' || !e.newValue) return

      if (e.newValue !== authEventRef.current) {
        authEventRef.current = e.newValue

        router.invalidate()
      }
    }

    window.addEventListener('storage', handler)

    return () => window.removeEventListener('storage', handler)
  }, [router])

  return <div></div>
}
