import { MyFiles } from '#/components/file/my-files'
import { CardLayout } from '#/components/layout/card-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Uploader } from '#/components/uploader'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_main-layout/_auth/')({
  component: Home,
})

function Home() {
  const [tab, setTab] = useState('my-files')

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Tabs value={tab} onValueChange={(e) => setTab(e)}>
        <TabsList>
          <TabsTrigger value="my-files">فایل های من</TabsTrigger>
          <TabsTrigger value="upload-file">آپلود فایل</TabsTrigger>
        </TabsList>
        <TabsContent value="my-files">
          <CardLayout
            title={<h1>فایل های من</h1>}
            description="در اینجا می توانید فایل های خود را مشاهده کنید."
          >
            <MyFiles />
          </CardLayout>
        </TabsContent>
        <TabsContent value="upload-file">
          <CardLayout title={<h1>آپلود فایل</h1>}>
            <Uploader changeTab={(value) => setTab(value)} />
          </CardLayout>
        </TabsContent>
      </Tabs>
    </div>
  )
}
