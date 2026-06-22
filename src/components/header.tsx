import { Link, useRouteContext } from '@tanstack/react-router'
import { UserKeyIcon } from 'lucide-react'
import { Logo } from './logo'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const Header = () => {
  const { user } = useRouteContext({ from: '__root__' })

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-(--header-height) items-center border-b bg-white p-8 dark:bg-transparent">
      <Link to="/" viewTransition>
        <Logo />
      </Link>
      <div className="mr-auto flex items-center gap-2">
        {user ? null : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="size-8"
                asChild
                variant="outline"
              >
                <Link to="/auth" viewTransition>
                  <UserKeyIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">ثبت نام یا ورود</TooltipContent>
          </Tooltip>
        )}
        <ModeToggle align="end" />
      </div>
    </header>
  )
}
