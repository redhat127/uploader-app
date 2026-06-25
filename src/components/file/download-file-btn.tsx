import { Button } from '#/components/ui/button'
import { createDownloadLink } from '#/lib/file'
import { DownloadIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export const DownloadFileBtn = ({
  fileName,
  fileOriginalName,
}: {
  fileName: string
  fileOriginalName: string
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => createDownloadLink({ fileName, fileOriginalName })}
    >
      <DownloadIcon />
    </Button>
  )
}

export const DownloadFileDropdownMenuItem = ({
  fileName,
  fileOriginalName,
  children,
}: {
  fileName: string
  fileOriginalName: string
  children: ReactNode
}) => {
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault()
        createDownloadLink({ fileName, fileOriginalName })
      }}
    >
      <DownloadIcon />
      {children}
    </DropdownMenuItem>
  )
}
