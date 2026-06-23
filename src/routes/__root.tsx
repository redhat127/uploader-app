import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'

import { generateTitle } from '#/lib/utils'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { ThemeProvider } from '#/components/theme-provider'
import { DirectionProvider } from '#/components/ui/direction'
import { TooltipProvider } from '#/components/ui/tooltip'
import TanStackQueryDevtools from '#/integrations/tanstack-query/devtools'
import type { ReactNode } from 'react'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: generateTitle('ساخته شده با Tanstack Start'),
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="w-full overflow-x-hidden bg-orange-100 font-sans! antialiased dark:bg-zinc-900 dark:text-white">
        <DirectionProvider dir="rtl">
          <TooltipProvider>
            <ThemeProvider storageKey="theme" defaultTheme="system">
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </DirectionProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
