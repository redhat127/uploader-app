import { DropdownMenuItem } from '#/components/ui/dropdown-menu'
import { authClient } from '#/lib/auth-client'
import { errorMsg, successMsg  } from '#/lib/message'
import type {ERROR_MSG_KEYS} from '#/lib/message';
import { useNavigate } from '@tanstack/react-router'
import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Logout = () => {
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()

  return (
    <DropdownMenuItem
      disabled={isPending}
      variant="destructive"
      onSelect={(e) => e.preventDefault()}
      onClick={async () => {
        try {
          setIsPending(true)

          const { error } = await authClient.signOut()

          if (error) {
            toast.error(
              (error.code && errorMsg[error.code as ERROR_MSG_KEYS]) ||
                error.message ||
                errorMsg['generic'],
            )

            return
          }

          await navigate({ to: '/auth', replace: true })

          toast.success(successMsg['logoutSuccess'])
        } catch {
          toast.error(errorMsg['generic'])
        } finally {
          setIsPending(false)
        }
      }}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <LogOutIcon />}
      {isPending ? 'در حال خروج...' : 'خروج'}
    </DropdownMenuItem>
  )
}
