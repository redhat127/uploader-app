import { CopyBtn, CopyBtnDropdownMenuItem } from '#/components/copy-btn'
import { ImageDimension } from '#/components/image/image-dimension'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import type { File } from '#/serverfn/file'
import { EllipsisVertical } from 'lucide-react'
import { DeleteFileBtn, DeleteFileDropdownMenuItem } from './delete-file-btn'
import {
  DownloadFileBtn,
  DownloadFileDropdownMenuItem,
} from './download-file-btn'
import { FileDetailsBtn, FileDetailsDropdownMenuItem } from './file-details'

export const MyFilesTable = ({ files }: { files: File[] }) => {
  return (
    <Table className="table-fixed">
      <MyFilesTableHeader />
      <TableBody>
        {files.map((file) => {
          return <MyFilesTableBodyRow file={file} key={file.id} />
        })}
      </TableBody>
    </Table>
  )
}

const MyFilesTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>نام</TableHead>
        <TableHead className="hidden w-14 text-center sm:table-cell">
          جزئیات
        </TableHead>
        <TableHead className="hidden w-20 text-center sm:table-cell">
          کپی آدرس
        </TableHead>
        <TableHead className="hidden w-14 text-center sm:table-cell">
          دانلود
        </TableHead>
        <TableHead className="hidden w-14 text-center sm:table-cell">
          حذف
        </TableHead>
        <TableHead className="w-14 text-center sm:hidden">عملیات</TableHead>
      </TableRow>
    </TableHeader>
  )
}

const MyFilesTableBodyRow = ({ file }: { file: File }) => {
  const sharedFileDetailsProps = {
    fileName: file.originalName,
    fileType: file.mime,
    fileSize: Number(file.sizeBytes),
    fileDate: file.createdAt,
    fileDateType: 'createdAt' as const,
  }

  const imageDimensions = file.imageDimension && (
    <ImageDimension imageDimensions={file.imageDimension} />
  )

  const textForCopyBtn = new URL(
    `/api/file/${file.name}`,
    window.location.href,
  ).toString()

  return (
    <TableRow>
      <TableCell className="min-w-0 truncate">{file.originalName}</TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <FileDetailsBtn {...sharedFileDetailsProps} noTooltip>
          {imageDimensions}
        </FileDetailsBtn>
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <CopyBtn text={textForCopyBtn} noTooltip />
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <DownloadFileBtn
          fileName={file.name}
          fileOriginalName={file.originalName}
        />
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <DeleteFileBtn fileName={file.name} />
      </TableCell>
      <TableCell className="text-center sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <FileDetailsDropdownMenuItem {...sharedFileDetailsProps}>
              {imageDimensions}
            </FileDetailsDropdownMenuItem>
            <CopyBtnDropdownMenuItem text={textForCopyBtn}>
              کپی آدرس
            </CopyBtnDropdownMenuItem>
            <DownloadFileDropdownMenuItem
              fileName={file.name}
              fileOriginalName={file.originalName}
            >
              دانلود
            </DownloadFileDropdownMenuItem>
            <DeleteFileDropdownMenuItem fileName={file.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
