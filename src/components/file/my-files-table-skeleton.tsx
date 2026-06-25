import { Skeleton } from '#/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

const SKELETON_ROWS = 4

export const MyFilesTableSkeleton = () => {
  return (
    <Table className="table-fixed">
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
        <TableHead>نام</TableHead>
        <TableHead className="hidden w-14 text-center sm:table-cell">
          جزئیات
        </TableHead>
        <TableHead className="hidden w-20 text-center sm:table-cell">
          کپی آدرس
        </TableHead>
        <TableHead className="hidden w-14 text-center sm:table-cell">
          حذف
        </TableHead>
        <TableHead className="w-14 text-center sm:hidden">عملیات</TableHead>
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
      <TableCell className="hidden text-center sm:table-cell">
        <Skeleton className="mx-auto size-8 rounded-full" />
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <Skeleton className="mx-auto size-8 rounded-full" />
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <Skeleton className="mx-auto size-8 rounded-full" />
      </TableCell>
      <TableCell className="text-center sm:hidden">
        <Skeleton className="mx-auto size-6 rounded-full" />
      </TableCell>
    </TableRow>
  )
}
