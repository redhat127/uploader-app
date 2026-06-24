import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent } from '#/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useAxiosErrorHandler } from '#/hooks/use-axios-error-handler'
import { successMsg } from '#/lib/message'
import { cn } from '#/lib/utils'
import {
  fileZodSchema,
  maxFileSizeMB,
  readableValidFileTypes,
} from '#/zod-schema/file'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import {
  ChevronLeftIcon,
  EyeIcon,
  Loader2Icon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export const Uploader = ({
  changeTab,
}: {
  changeTab: (value: string) => void
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const clearFileInput = () => {
    if (!fileInputRef.current) return

    fileInputRef.current.value = ''
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
  }

  const validateAndSelectFile = (file: File) => {
    const { error, data } = fileZodSchema.safeParse(file)

    if (error) {
      toast.error(error.issues[0].message)
      return
    }

    setSelectedFile(data)
  }

  const [isDragging, setIsDragging] = useState(false)

  const { handler: axiosErrorHandler } = useAxiosErrorHandler()

  const queryClient = useQueryClient()

  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortController.current?.abort()
  }, [])

  const mutate = useMutation<{}, AxiosError, { formData: FormData }>({
    onMutate() {
      abortController.current = new AbortController()
    },
    async mutationFn({ formData }) {
      const { data } = await axios.post<{}>('/api/file', formData, {
        signal: abortController.current?.signal,
      })

      return data
    },
    onSuccess() {
      toast.success(successMsg['fileUploaded'])

      clearSelectedFile()

      queryClient.invalidateQueries({
        queryKey: ['my-files'],
        exact: true,
      })

      changeTab('my-files')
    },
    async onError(e) {
      await axiosErrorHandler(e)
    },
  })

  const isFileUploading = mutate.isPending

  return (
    <>
      <div className="space-y-4">
        <div
          className={cn(
            'group relative h-full w-full overflow-hidden rounded-xl border border-dashed bg-white transition-colors duration-200 hover:border-gray-400 dark:bg-transparent',
            {
              'cursor-pointer': !isFileUploading,
              'cursor-not-allowed': isFileUploading,
              'border-gray-400': isDragging,
            },
          )}
          onDragEnter={(e) => {
            e.preventDefault()

            if (isFileUploading) return

            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()

            if (isFileUploading) return

            const related = e.relatedTarget

            if (
              !(related instanceof Node) ||
              !e.currentTarget.contains(related)
            ) {
              setIsDragging(false)
            }
          }}
          onDrop={(e) => {
            e.preventDefault()

            if (isFileUploading) return

            const files = e.dataTransfer.files

            if (files.length) {
              validateAndSelectFile(files[0])
            }

            setIsDragging(false)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center"
            onClick={() => {
              if (isFileUploading) return

              fileInputRef.current?.click()
            }}
          >
            <p className="text-sm">
              فایل مورد نظر خود را انتخاب کرده یا به اینجا بکشید.
            </p>
            <div className="bg-primary/20 -order-1 rounded-full p-4">
              <UploadCloudIcon className="text-sidebar-primary" />
            </div>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>حداکثر سایر فایل: {maxFileSizeMB} مگابایت</p>
              <p>فرمت های مجاز:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {readableValidFileTypes.map((fileType) => {
                  return (
                    <Badge key={fileType} variant="outline">
                      {fileType}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>
          <div
            className={cn(
              'absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-white text-center text-sm transition-all duration-200 dark:bg-zinc-900',
              {
                'invisible opacity-0': !isDragging,
                'visible opacity-95': isDragging,
              },
            )}
          >
            <div className="bg-primary/20 -order-1 rounded-full p-4">
              <PlusIcon className="text-sidebar-primary" />
            </div>
            <p>فایل را اینجا رها کنید.</p>
          </div>
        </div>
        {selectedFile && (
          <SelectedFile
            selectedFile={selectedFile}
            clearFileInput={clearFileInput}
            clearSelectedFile={clearSelectedFile}
            startUpload={() => {
              const formData = new FormData()

              formData.set('file', selectedFile)

              mutate.mutate({ formData })
            }}
            isFileUploading={isFileUploading}
          />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        disabled={isFileUploading}
        onChange={(e) => {
          const file = e.target.files?.[0]

          if (!file) return

          validateAndSelectFile(file)
        }}
        className="sr-only"
      />
    </>
  )
}

const SelectedFile = ({
  selectedFile,
  clearFileInput,
  clearSelectedFile,
  startUpload,
  isFileUploading,
}: {
  selectedFile: File
  clearFileInput: () => void
  clearSelectedFile: () => void
  startUpload: () => void
  isFileUploading: boolean
}) => {
  return (
    <div className="space-y-4">
      <FileSelectedDetails
        file={selectedFile}
        clearSelectedFile={() => {
          clearFileInput()

          clearSelectedFile()
        }}
        isFileUploading={isFileUploading}
      />
      <Button
        type="button"
        disabled={isFileUploading}
        className="w-full"
        onClick={() => {
          startUpload()
        }}
      >
        {isFileUploading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <ChevronLeftIcon />
        )}
        <span>{isFileUploading ? 'در حال آپلود...' : 'آپلود فایل'}</span>
      </Button>
    </div>
  )
}

const FileSelectedDetails = ({
  file,
  clearSelectedFile,
  isFileUploading,
}: {
  file: File
  clearSelectedFile: () => void
  isFileUploading: boolean
}) => {
  const [filePreview, setFilePreview] = useState<string | null>()
  const [showPreviewFile, setShowPreviewFile] = useState(false)

  useEffect(() => {
    if (!file.type.startsWith('image/')) return

    const fileObjectURL = URL.createObjectURL(file)

    setFilePreview(fileObjectURL)

    return () => URL.revokeObjectURL(fileObjectURL)
  }, [file])

  return (
    <>
      <div className="xs:flex-row flex flex-col items-center gap-4 rounded-xl border bg-white p-4 dark:bg-zinc-900">
        <p className="text-muted-foreground line-clamp-1 flex-1 text-sm">
          {file.name}
        </p>
        <div className="flex items-center gap-2">
          {file.type.startsWith('image/') && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  disabled={isFileUploading}
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setShowPreviewFile(true)
                  }}
                >
                  <EyeIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>پیش نمایش</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                disabled={isFileUploading}
                onClick={() => {
                  clearSelectedFile()
                }}
                variant="destructive"
                size="icon"
              >
                <TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>حذف</TooltipContent>
          </Tooltip>
        </div>
      </div>
      {filePreview && (
        <Dialog open={showPreviewFile} onOpenChange={setShowPreviewFile}>
          <DialogContent>
            <img
              src={filePreview}
              alt={`preview of ${file.name}`}
              className="aspect-auto"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
