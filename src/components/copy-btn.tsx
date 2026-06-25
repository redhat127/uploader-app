import { Button } from '#/components/ui/button'
import { CopyIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const useCopyBtn = ({ text }: { text: string }) => {
  const [isPending, setIsPending] = useState(false)

  const handler = async () => {
    try {
      setIsPending(true)
      await window.navigator.clipboard.writeText(text)
      toast.success('کپی شد.')
    } catch {
      toast.error('خطا در کپی کردن! دوباره تلاش کنید.')
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    handler,
  }
}

export const CopyBtn = ({
  text,
  noTooltip = false,
  tooltipContent,
}: {
  text: string
  noTooltip?: boolean
  tooltipContent?: string
}) => {
  const { isPending, handler } = useCopyBtn({ text })

  const copyBtn = (
    <Button
      type="button"
      disabled={isPending}
      size="icon"
      variant="outline"
      onClick={handler}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <CopyIcon />}
    </Button>
  )

  return noTooltip ? (
    copyBtn
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>{copyBtn}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}

export const CopyBtnDropdownMenuItem = ({
  text,
  children,
}: {
  text: string
  children: ReactNode
}) => {
  const { isPending, handler } = useCopyBtn({ text })

  return (
    <DropdownMenuItem disabled={isPending} onClick={handler}>
      {isPending ? <Loader2Icon className="animate-spin" /> : <CopyIcon />}
      {children}
    </DropdownMenuItem>
  )
}
