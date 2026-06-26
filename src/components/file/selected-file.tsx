import { ImageDimension } from '#/components/image/image-dimension'
import { ImagePreview } from '#/components/image/image-preview'
import { Button, buttonVariants } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useAxiosErrorHandler } from '#/hooks/use-axios-error-handler'
import { successMsg } from '#/lib/message'
import { fileZodSchema } from '#/zod-schema/file'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import {
  CheckIcon,
  Loader2Icon,
  UploadCloudIcon,
  XCircleIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { FileDetailsBtn } from './file-details'

export type SelectedFileType = { name: string; file: File; uploaded: boolean }

type UploadState = 'idle' | 'uploading' | 'completed'

export const SelectedFile = ({
  selectedFile,
  removeFile,
  markFileUploadCompleted,
}: {
  selectedFile: SelectedFileType
  removeFile: (name: string) => void
  markFileUploadCompleted: (fileName: string) => void
}) => {
  const [validationPassed, setValidationPassed] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const [uploadState, setUploadState] = useState<UploadState>('idle')

  const changeUploadState = (value: UploadState) => {
    setUploadState(value)
  }

  useEffect(() => {
    if (validationPassed) return

    const { error } = fileZodSchema.safeParse(selectedFile.file)

    if (error) {
      setValidationError(error.issues[0].message)
    } else {
      setValidationPassed(true)
    }
  }, [validationPassed, selectedFile.file])

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4 dark:bg-zinc-900">
      <div className="space-y-1 truncate">
        <p className="flex-1 truncate">{selectedFile.name}</p>
        {validationError && (
          <p className="text-destructive truncate">{validationError}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {validationPassed && (
          <StartUpload
            selectedFile={selectedFile}
            uploadState={uploadState}
            changeUploadState={changeUploadState}
            markFileUploadCompleted={markFileUploadCompleted}
          />
        )}
        {validationPassed && (
          <div className="hidden sm:block">
            <FileDetailsBtn
              fileName={selectedFile.file.name}
              fileType={selectedFile.file.type}
              fileSize={selectedFile.file.size}
              fileDate={selectedFile.file.lastModified}
              fileDateType="lastModified"
            >
              <ImageDimension file={selectedFile.file} />
            </FileDetailsBtn>
          </div>
        )}
        {validationPassed && selectedFile.file.type.startsWith('image/') && (
          <div className="hidden sm:block">
            <ImagePreview
              file={selectedFile.file}
              fileName={selectedFile.name}
            />
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              disabled={uploadState === 'uploading'}
              variant="destructive"
              size="icon"
              onClick={() => removeFile(selectedFile.name)}
            >
              <XCircleIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>حذف فایل از لیست</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

const StartUpload = ({
  selectedFile,
  uploadState,
  changeUploadState,
  markFileUploadCompleted,
}: {
  selectedFile: SelectedFileType
  uploadState: UploadState
  changeUploadState: (value: UploadState) => void
  markFileUploadCompleted: (fileName: string) => void
}) => {
  const { handler: axiosErrorHandler } = useAxiosErrorHandler()

  const queryClient = useQueryClient()

  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortController.current?.abort()
  }, [])

  const mutation = useMutation<{}, AxiosError, { formData: FormData }>({
    onMutate() {
      changeUploadState('uploading')

      abortController.current = new AbortController()
    },
    async mutationFn({ formData }) {
      const { data } = await axios.post<{}>('/api/file', formData, {
        signal: abortController.current?.signal,
      })

      return data
    },
    onSuccess() {
      changeUploadState('completed')

      markFileUploadCompleted(selectedFile.name)

      toast.success(successMsg['fileUploaded'])

      queryClient.invalidateQueries({
        queryKey: ['my-files'],
        exact: true,
      })
    },
    async onError(e) {
      changeUploadState('idle')

      await axiosErrorHandler(e)
    },
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {uploadState === 'idle' ? (
          <Button
            type="button"
            size="icon"
            onClick={() => {
              const formData = new FormData()
              formData.set('file', selectedFile.file)

              mutation.mutate({ formData })
            }}
          >
            <UploadCloudIcon />
          </Button>
        ) : (
          <div
            className={buttonVariants({
              variant: 'default',
              size: 'icon',
            })}
          >
            {uploadState === 'uploading' && (
              <Loader2Icon className="animate-spin" />
            )}
            {uploadState === 'completed' && <CheckIcon />}
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>
        {uploadState === 'idle' && 'شروع آپلود'}
        {uploadState === 'uploading' && 'در حال آپلود...'}
        {uploadState === 'completed' && 'آپلود شد'}
      </TooltipContent>
    </Tooltip>
  )
}
