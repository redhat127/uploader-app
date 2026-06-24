import { getMyFilesServerFn } from '#/serverfn/file'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Suspense } from 'react'

export const MyFiles = () => {
  return (
    <Suspense fallback={<div></div>}>
      <MyFilesSuspense />
    </Suspense>
  )
}

const MyFilesSuspense = () => {
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

  return myFiles.length ? null : (
    <p className="text-sm italic">هیچ فایلی یافت نشد.</p>
  )
}
