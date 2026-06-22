import { ThemeProvider } from '#/components/theme-provider'
import { DirectionProvider } from '#/components/ui/direction'
import { Toaster } from '#/components/ui/sonner'
import { TooltipProvider } from '#/components/ui/tooltip'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'

import TanStackQueryDevtools from '#/integrations/tanstack-query/devtools'
import { Header } from './header'

export const Body = ({ children }: { children: ReactNode }) => {
  return (
    <body className="w-full overflow-x-hidden bg-orange-100 font-sans! antialiased dark:bg-zinc-900 dark:text-white">
      <DirectionProvider dir="rtl">
        <TooltipProvider>
          <ThemeProvider storageKey="theme" defaultTheme="system">
            <Header />
            <main className="mt-(--header-height) p-8">{children}</main>
          </ThemeProvider>
        </TooltipProvider>
        <Toaster
          closeButton
          duration={8000}
          position="top-center"
          expand
          className="font-sans!"
        />
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
  )
}
