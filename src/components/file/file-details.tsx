import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'
import { DropdownMenuItem } from '#/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { persianFileDate, persianFileSize, persianFileType } from '#/lib/file'
import { Info, InfoIcon } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'

type FileDetailsProps = {
  fileName: string
  fileType: string
  fileSize: number
  fileDate: number | Date
  fileDateType: 'createdAt' | 'lastModified'
  children?: ReactNode
}

const FileDetailsDialog = ({
  fileName,
  fileType,
  fileSize,
  fileDate,
  fileDateType,
  children,
  openDialog,
  changeOpenDialogState,
}: FileDetailsProps & {
  openDialog: boolean
  changeOpenDialogState: (value: boolean) => void
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={changeOpenDialogState}>
      <DialogContent>
        <DialogTitle className="sr-only">جزئیات {fileName}</DialogTitle>
        <div className="space-y-2">
          <p>نوع فایل : {persianFileType(fileType)}</p>
          <p>حجم فایل : {persianFileSize(fileSize)}</p>
          <p>
            {fileDateType === 'createdAt' && 'ایجاد شده در : '}
            {fileDateType === 'lastModified' && 'آخرین تغییرات در : '}
            {persianFileDate(fileDate)}
          </p>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const FileDetailsBtn = ({
  noTooltip = false,
  ...props
}: FileDetailsProps & { noTooltip?: boolean }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const changeOpenDialogState = (value: boolean) => {
    setOpenDialog(value)
  }

  const btn = (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => changeOpenDialogState(true)}
    >
      <InfoIcon />
    </Button>
  )

  return (
    <>
      {noTooltip ? (
        btn
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{btn}</TooltipTrigger>
          <TooltipContent>جزئیات</TooltipContent>
        </Tooltip>
      )}
      <FileDetailsDialog
        {...props}
        openDialog={openDialog}
        changeOpenDialogState={changeOpenDialogState}
      />
    </>
  )
}

export const FileDetailsDropdownMenuItem = (props: FileDetailsProps) => {
  const [openDialog, setOpenDialog] = useState(false)

  const changeOpenDialogState = (value: boolean) => {
    setOpenDialog(value)
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault()
          changeOpenDialogState(true)
        }}
      >
        <Info />
        جزئیات
      </DropdownMenuItem>
      <FileDetailsDialog
        {...props}
        openDialog={openDialog}
        changeOpenDialogState={changeOpenDialogState}
      />
    </>
  )
}
