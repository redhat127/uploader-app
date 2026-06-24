import { Button } from '#/components/ui/button'
import { useAxiosErrorHandler } from '#/hooks/use-axios-error-handler'
import { successMsg } from '#/lib/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const DeleteFile = ({ fileName }: { fileName: string }) => {
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

      queryClient.invalidateQueries({
        queryKey: ['my-files'],
        exact: true,
      })
    },
    async onError(e) {
      await axiosErrorHandler(e)
    },
  })

  return (
    <Button
      type="button"
      disabled={mutate.isPending}
      variant="destructive"
      size="icon"
      onClick={() => {
        if (!confirm('آیا مطمئن هستید می خواهید فایل خود را حذف کنید؟')) return

        mutate.mutate({ fileName })
      }}
    >
      {mutate.isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <TrashIcon />
      )}
    </Button>
  )
}
