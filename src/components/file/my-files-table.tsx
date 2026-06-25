import { persianFileDate, persianFileSize, persianFileType } from '#/lib/file'
import type { File } from '#/serverfn/file'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CopyBtn } from '../copy-btn'
import { DeleteFile } from './delete-file'

export const MyFilesTable = ({ files }: { files: File[] }) => {
  return (
    <Table className="w-full table-fixed">
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
        <TableHead className="w-auto">نام</TableHead>
        <TableHead className="hidden sm:table-cell sm:w-[18%] md:w-[14%]">
          نوع فایل
        </TableHead>
        <TableHead className="hidden sm:table-cell sm:w-[17%] md:w-[14%]">
          حجم
        </TableHead>
        <TableHead className="hidden whitespace-normal md:table-cell md:w-[18%]">
          ایجاد شده در
        </TableHead>
        <TableHead className="hidden w-12 md:table-cell md:text-center">
          آدرس
        </TableHead>
        <TableHead className="w-12 text-center">حذف</TableHead>
      </TableRow>
    </TableHeader>
  )
}

const MyFilesTableBodyRow = ({ file }: { file: File }) => {
  return (
    <TableRow>
      <TableCell className="min-w-0 truncate">{file.originalName}</TableCell>
      <TableCell className="hidden min-w-0 truncate sm:table-cell">
        {persianFileType(file.mime)}
      </TableCell>
      <TableCell className="hidden truncate text-right sm:table-cell" dir="ltr">
        {persianFileSize(Number(file.sizeBytes))}
      </TableCell>
      <TableCell className="hidden whitespace-normal md:table-cell">
        {persianFileDate(file.createdAt)}
      </TableCell>
      <TableCell className="hidden text-center md:table-cell">
        <CopyBtn
          text={new URL(
            `/api/file/${file.name}`,
            window.location.href,
          ).toString()}
        />
      </TableCell>
      <TableCell className="text-center">
        <DeleteFile fileName={file.name} />
      </TableCell>
    </TableRow>
  )
}
