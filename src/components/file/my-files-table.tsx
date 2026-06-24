import { Button } from '#/components/ui/button'
import { fileMimePersianTranslation } from '#/lib/storage'
import type { File } from '#/serverfn/file'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CopyIcon, Loader2Icon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

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
  const [copyAddressPending, setCopyAddressPending] = useState(false)

  return (
    <TableRow>
      <TableCell className="min-w-0 truncate">{file.originalName}</TableCell>
      <TableCell className="hidden min-w-0 truncate sm:table-cell">
        {fileMimePersianTranslation(file.mime)}
      </TableCell>
      <TableCell className="hidden truncate text-right sm:table-cell" dir="ltr">
        {(Number(file.sizeBytes) / 1024).toFixed(2)} KB
      </TableCell>
      <TableCell className="hidden whitespace-normal md:table-cell">
        {new Date(file.createdAt).toLocaleDateString('fa-IR')}
      </TableCell>
      <TableCell className="hidden text-center md:table-cell">
        <Button
          type="button"
          disabled={copyAddressPending}
          size="icon"
          variant="outline"
          title="کپی"
          onClick={async () => {
            try {
              setCopyAddressPending(true)
              await window.navigator.clipboard.writeText(
                new URL(
                  `/api/file/${file.name}`,
                  window.location.href,
                ).toString(),
              )
              toast.success('کپی شد.')
            } catch {
            } finally {
              setCopyAddressPending(false)
            }
          }}
        >
          {copyAddressPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <CopyIcon />
          )}
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button type="button" variant="destructive" size="icon">
          <TrashIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
