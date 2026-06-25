import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { XCircleIcon } from 'lucide-react'
import { ImagePreview } from '../image/image-preview'
import { FileDetails } from './file-details'

export type SelectedFileType = { name: string; file: File }

export const SelectedFile = ({
  selectedFile,
  removeFile,
}: {
  selectedFile: SelectedFileType
  removeFile: (name: string) => void
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4 dark:bg-zinc-900">
      <p className="flex-1 truncate">{selectedFile.name}</p>
      <div className="flex items-center gap-2">
        <FileDetails file={selectedFile.file} fileName={selectedFile.name} />
        {selectedFile.file.type.startsWith('image/') && (
          <ImagePreview file={selectedFile.file} fileName={selectedFile.name} />
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeFile(selectedFile.name)}
            >
              <XCircleIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>حذف فایل</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
