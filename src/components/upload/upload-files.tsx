import { MyFiles } from '#/components/file/my-files'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Uploader } from '#/components/upload/uploader'
import { useState } from 'react'

export const UploadFiles = () => {
  const [tab, setTab] = useState('my-files')

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <Tabs value={tab} onValueChange={(e) => setTab(e)}>
        <TabsList>
          <TabsTrigger value="my-files">فایل های من</TabsTrigger>
          <TabsTrigger value="upload-file">آپلود فایل</TabsTrigger>
        </TabsList>
        <TabsContent value="my-files" className="space-y-4 py-2">
          <h1 className="text-xl font-bold">فایل های من</h1>
          <MyFiles />
        </TabsContent>
        <TabsContent value="upload-file" className="space-y-4 py-2">
          <h1 className="text-xl font-bold">آپلود فایل</h1>
          <Uploader />
        </TabsContent>
      </Tabs>
    </div>
  )
}
