import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ImagePreview = ({
  file,
  fileName,
}: {
  file: File
  fileName: string
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (!openDialog) return

    const url = URL.createObjectURL(file)
    setFilePreview(url)

    return () => URL.revokeObjectURL(url)
  }, [openDialog, file])

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
            <EyeIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>پیش نمایش</TooltipContent>
      </Tooltip>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-fit! max-w-[80vw]!">
          <DialogTitle className="sr-only">پیش نمایش {fileName}</DialogTitle>
          {filePreview && (
            <img
              src={filePreview}
              alt={`preview of ${fileName}`}
              className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
