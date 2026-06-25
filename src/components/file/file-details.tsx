import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { persianFileDate, persianFileSize, persianFileType } from '#/lib/file'
import { InfoIcon } from 'lucide-react'
import { useState } from 'react'
import { ImageDimension } from '../image/image-dimension'

export const FileDetails = ({
  file,
  fileName,
}: {
  file: File
  fileName: string
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setOpenDialog(true)}
          >
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>جزئیات</TooltipContent>
      </Tooltip>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogTitle className="sr-only">جزئیات {fileName}</DialogTitle>
          <div className="space-y-2">
            <p>نوع فایل : {persianFileType(file.type)}</p>
            <p>حجم فایل : {persianFileSize(file.size)}</p>
            <ImageDimension file={file} />
            <p>آخرین تغییرات در : {persianFileDate(file.lastModified, true)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
