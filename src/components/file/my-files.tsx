import { getMyFilesServerFn } from '#/serverfn/file'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Suspense } from 'react'
import { MyFilesTable } from './my-files-table'
import { MyFilesTableSkeleton } from './my-files-table-skeleton'

export const MyFiles = () => {
  return (
    <Suspense fallback={<MyFilesTableSkeleton />}>
      <MyFilesTableSuspense />
    </Suspense>
  )
}

const MyFilesTableSuspense = () => {
  const getMyFilesSf = useServerFn(getMyFilesServerFn)

  const { data: myFiles } = useSuspenseQuery({
    queryKey: ['my-files'],
    queryFn({ signal }) {
      return getMyFilesSf({ signal })
    },
    staleTime: Infinity,
    refetchOnMount: true,
  })

  if (!myFiles) return

  return myFiles.length ? (
    <MyFilesTable files={myFiles} />
  ) : (
    <p className="text-muted-foreground italic">هیچ فایلی یافت نشد.</p>
  )
}
