import { useCustomAxios } from '#/hooks/use-custom-axios'
import { successMsg } from '#/lib/message'
import { cn } from '#/lib/utils'
import {
  fileZodSchema,
  maxFileSizeMB,
  readableValidFileTypes,
} from '#/zod-schema/file'
import {
  ChevronLeftIcon,
  EyeIcon,
  Loader2Icon,
  TrashIcon,
  UploadCloudIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isFileUploading, setIsFileUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const clearFileInput = () => {
    if (!fileInputRef.current) return

    fileInputRef.current.value = ''
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
  }

  return (
    <>
      <div className={cn('mx-auto max-w-3xl space-y-4')}>
        <div
          className={cn(
            'group dark:border-border h-full w-full overflow-hidden rounded-xl border border-dashed border-gray-400 bg-white dark:bg-transparent',
            {
              'cursor-pointer': !isFileUploading,
              'cursor-not-allowed': isFileUploading,
            },
          )}
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
        </div>
        {selectedFile && (
          <SelectedFile
            selectedFile={selectedFile}
            clearFileInput={clearFileInput}
            clearSelectedFile={clearSelectedFile}
            isFileUploading={isFileUploading}
            changeIsFileUploading={(value) => setIsFileUploading(value)}
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

          const { error, data } = fileZodSchema.safeParse(file)

          if (error) {
            toast.error(error.issues[0].message)
            return
          }

          setSelectedFile(data)
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
  isFileUploading,
  changeIsFileUploading,
}: {
  selectedFile: File
  clearFileInput: () => void
  clearSelectedFile: () => void
  isFileUploading: boolean
  changeIsFileUploading: (value: boolean) => void
}) => {
  const customAxios = useCustomAxios()

  const startUpload = async () => {
    try {
      changeIsFileUploading(true)

      const formData = new FormData()

      formData.set('file', selectedFile)

      const {
        data: { fileName },
      } = await customAxios.post<{ fileName: string }>('/api/file', formData)

      console.log(fileName)

      toast.success(successMsg['fileUploaded'])

      clearSelectedFile()
    } catch {
    } finally {
      changeIsFileUploading(false)
    }
  }

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
        onClick={startUpload}
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

    setFilePreview(filePreview)

    return () => URL.revokeObjectURL(fileObjectURL)
  }, [])

  return (
    <>
      <div className="xs:flex-row flex flex-col items-center gap-4 rounded-xl border p-4">
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
