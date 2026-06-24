import { Skeleton } from '#/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SKELETON_ROWS = 4

export const MyFilesTableSkeleton = () => {
  return (
    <Table className="w-full table-fixed">
      <MyFilesTableSkeletonHeader />
      <TableBody>
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <MyFilesTableSkeletonBodyRow key={i} />
        ))}
      </TableBody>
    </Table>
  )
}

const MyFilesTableSkeletonHeader = () => {
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

const MyFilesTableSkeletonBodyRow = () => {
  return (
    <TableRow>
      <TableCell className="min-w-0">
        <Skeleton className="h-4 w-[70%]" />
      </TableCell>
      <TableCell className="hidden min-w-0 sm:table-cell">
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="me-auto h-4 w-16" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="mx-auto size-8 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="mx-auto size-8 rounded-full" />
      </TableCell>
    </TableRow>
  )
}
