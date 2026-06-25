import { Button } from '#/components/ui/button'
import { CopyIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const CopyBtn = ({ text }: { text: string }) => {
  const [isPending, setIsPending] = useState(false)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          disabled={isPending}
          size="icon"
          variant="outline"
          onClick={async () => {
            try {
              setIsPending(true)
              await window.navigator.clipboard.writeText(text)
              toast.success('کپی شد.')
            } catch {
              toast.error('خطا در کپی کردن! دوباره تلاش کنید.')
            } finally {
              setIsPending(false)
            }
          }}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : <CopyIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>کپی</TooltipContent>
    </Tooltip>
  )
}
