import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { UserTableSelect } from '#/db/schema'
import { UserIcon } from 'lucide-react'
import { Logout } from './logout'
import { UserAvatar } from './user-avatar'

export const UserDropdown = ({
  user: { name, image },
}: {
  user: Pick<UserTableSelect, 'name' | 'image'>
}) => {
  const userAvatar = <UserAvatar user={{ name, image }} />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userAvatar}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-54!">
        <DropdownMenuLabel className="text-foreground flex items-center gap-2 text-sm">
          {userAvatar}
          <span className="truncate">سلام ، {name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon />
          حساب کاربری
        </DropdownMenuItem>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
