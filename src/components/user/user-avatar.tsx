import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import type { UserTableSelect } from '#/db/schema'

export const UserAvatar = ({
  user: { name, image },
}: {
  user: Pick<UserTableSelect, 'name' | 'image'>
}) => {
  return (
    <Avatar>
      <AvatarImage src={image || undefined} alt={`${name} avatar`} />
      <AvatarFallback className="bg-primary text-primary-foreground capitalize">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
