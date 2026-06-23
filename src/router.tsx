import {
  createRouter as createTanStackRouter,
  Link,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { ChevronLeftIcon } from 'lucide-react'
import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'
import { getContext } from './integrations/tanstack-query/root-provider'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: false,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent() {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
          <div className="mx-auto w-full max-w-sm text-center">
            <h1 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-500">
              404 - یافت نشد
            </h1>
            <p className="mb-4">صفحه ی مورد نظر یافت نشد.</p>
            <Button type="button" asChild>
              <Link to="/">
                <ChevronLeftIcon />
                بازگشت به خانه
              </Link>
            </Button>
          </div>
        </div>
      )
    },
    defaultErrorComponent({ reset }) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
          <div className="mx-auto w-full max-w-sm text-center">
            <h1 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-500">
              خطایی رخ داده!
            </h1>
            <p className="mb-4">لطفا دوباره تلاش کنید یا به خانه برگردید.</p>
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Button
                type="button"
                onClick={() => reset()}
                variant="outline"
                className="w-full sm:w-auto"
              >
                دوباره تلاش کن!
              </Button>
              <Button type="button" asChild className="w-full sm:w-auto">
                <Link to="/">
                  <ChevronLeftIcon />
                  بازگشت به خانه
                </Link>
              </Button>
            </div>
          </div>
          <div className="-order-1 mb-4">
            <ModeToggle align="center" />
          </div>
        </div>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
