import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

export function ModeToggle({
  align = 'end',
}: {
  align?: ComponentProps<typeof DropdownMenuContent>['align']
}) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-8">
          <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">انتخاب پوسته</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          روشن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          تاریک
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <MonitorIcon className="h-[1.2rem] w-[1.2rem]" />
          سیستم
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
