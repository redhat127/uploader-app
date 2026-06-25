import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import {
  maxFileSizeMB,
  readableValidFileTypes,
  validMimeTypesArray,
} from '#/zod-schema/file'
import { PlusIcon, UploadCloudIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import type { SelectedFileType } from '../file/selected-file'
import { SelectedFiles } from '../file/selected-files'

function mergeUniqueByName(
  prev: SelectedFileType[],
  next: SelectedFileType[],
): SelectedFileType[] {
  const existingNames = new Set(prev.map((item) => item.name))

  const filteredNext = next.filter((item) => !existingNames.has(item.name))

  return [...prev, ...filteredNext]
}

export const Uploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([])

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [isDragging, setIsDragging] = useState(false)

  const clearFileInputValue = () => {
    if (!fileInputRef.current) return

    fileInputRef.current.value = ''
  }

  const selectFiles = (files: File[] | FileList | null) => {
    if (!files?.length) return

    const pickedFiles = [...files].map((file) => ({
      name: file.name,
      file,
    }))

    setSelectedFiles((prevSelectedFiles) => {
      return mergeUniqueByName(prevSelectedFiles, pickedFiles)
    })

    clearFileInputValue()
  }

  const removeFile = (name: string) => {
    setSelectedFiles((prevSelectedFiles) => {
      return prevSelectedFiles.filter((file) => file.name !== name)
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div
          className={cn(
            'group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-dashed bg-white transition-colors duration-200 hover:border-gray-400 dark:bg-transparent',
            {
              'border-gray-400': isDragging,
            },
          )}
          onDragEnter={(e) => {
            e.preventDefault()

            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()

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

            const files = e.dataTransfer.files

            selectFiles(files)

            setIsDragging(false)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center"
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            <p className="text-sm">
              فایل های خود را انتخاب کرده یا به اینجا بکشید.
            </p>
            <div className="bg-primary/20 -order-1 rounded-full p-4">
              <UploadCloudIcon className="text-sidebar-primary" />
            </div>
            <div className="text-muted-foreground space-y-2 text-sm">
              <p>حداکثر سایز هر فایل: {maxFileSizeMB} مگابایت</p>
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
            <p>اینجا فایل های خود را رها کنید.</p>
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <SelectedFiles
            selectedFiles={selectedFiles}
            removeFile={removeFile}
          />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const files = e.target.files

          selectFiles(files)
        }}
        className="sr-only"
        multiple
        accept={validMimeTypesArray.join(', ')}
      />
    </>
  )
}
