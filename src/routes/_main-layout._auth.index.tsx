import { Uploader } from '#/components/uploader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_auth/')({
  component: Home,
})

function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-2xl font-bold">آپلود فایل</h1>
      <Uploader />
    </div>
  )
}
