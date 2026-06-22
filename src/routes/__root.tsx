import { HeadContent, createRootRouteWithContext } from '@tanstack/react-router'

import appCss from '../styles.css?url'

import { Body } from '#/components/body'
import { generateTitle } from '#/lib/utils'
import type { QueryClient } from '@tanstack/react-query'

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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <Body>{children}</Body>
    </html>
  )
}
