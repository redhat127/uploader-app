import { Button } from '#/components/ui/button'
import { useAxiosErrorHandler } from '#/hooks/use-axios-error-handler'
import { successMsg } from '#/lib/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { NoReturnAlertDialog } from '../no-return-alert-dialog'
import { DropdownMenuItem } from '../ui/dropdown-menu'

const noReturnAlertDialogTitle = 'حذف فایل'
const noReturnAlertDialogDescription =
  'آیا مطمئن هستید می خواهید این فایل را حذف کنید؟ این عملیات غیر قابل بازگشت است.'
const noReturnAlertDialogActionText = 'بله'

const useDeleteFile = () => {
  const { handler: axiosErrorHandler } = useAxiosErrorHandler()

  const queryClient = useQueryClient()

  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortController.current?.abort()
  }, [])

  const mutate = useMutation<undefined, AxiosError, { fileName: string }>({
    onMutate() {
      abortController.current = new AbortController()
    },
    async mutationFn({ fileName }) {
      const { data } = await axios.delete<undefined>(`/api/file/${fileName}`)

      return data
    },
    onSuccess() {
      toast.success(successMsg['fileDeleted'])

      return queryClient.invalidateQueries({
        queryKey: ['my-files'],
        exact: true,
      })
    },
    async onError(e) {
      await axiosErrorHandler(e)
    },
  })

  return {
    mutate,
  }
}

export const DeleteFileBtn = ({ fileName }: { fileName: string }) => {
  const { mutate } = useDeleteFile()

  return (
    <NoReturnAlertDialog
      trigger={
        <Button
          type="button"
          disabled={mutate.isPending}
          variant="destructive"
          size="icon"
        >
          {mutate.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
      }
      title={noReturnAlertDialogTitle}
      description={noReturnAlertDialogDescription}
      action={() => mutate.mutate({ fileName })}
      actionText={noReturnAlertDialogActionText}
    />
  )
}

export const DeleteFileDropdownMenuItem = ({
  fileName,
}: {
  fileName: string
}) => {
  const { mutate } = useDeleteFile()

  return (
    <NoReturnAlertDialog
      trigger={
        <DropdownMenuItem
          disabled={mutate.isPending}
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          {mutate.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <TrashIcon />
          )}
          حذف فایل
        </DropdownMenuItem>
      }
      title={noReturnAlertDialogTitle}
      description={noReturnAlertDialogDescription}
      action={() => mutate.mutate({ fileName })}
      actionText={noReturnAlertDialogActionText}
    />
  )
}
