import { MyFiles } from '#/components/file/my-files'
import { NoReturnAlertDialog } from '#/components/no-return-alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Uploader } from '#/components/upload/uploader'
import { useState } from 'react'

export const UploadFiles = () => {
  const [tab, setTab] = useState('my-files')
  const [toBeUploadedCounts, setToBeUploadedCounts] = useState(0)
  const [pendingLeaveOpen, setPendingLeaveOpen] = useState(false)

  const changeToBeUploadedCounts = (value: number) => {
    setToBeUploadedCounts(value)
  }

  const handleValueChange = (value: string) => {
    if (value === 'my-files' && toBeUploadedCounts > 0) {
      setPendingLeaveOpen(true)
      return
    }

    setTab(value)
    if (value === 'upload-file') setToBeUploadedCounts(0)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <Tabs
        value={tab}
        activationMode="manual"
        onValueChange={handleValueChange}
      >
        <TabsList>
          <TabsTrigger value="my-files">فایل های من</TabsTrigger>
          <TabsTrigger value="upload-file">آپلود فایل</TabsTrigger>
        </TabsList>
        <TabsContent value="my-files" className="space-y-4 py-2">
          <h1 className="text-xl font-bold">فایل های من</h1>
          <div className="rounded-xl bg-white p-4 dark:bg-zinc-900">
            <MyFiles />
          </div>
        </TabsContent>
        <TabsContent value="upload-file" className="space-y-4 py-2">
          <h1 className="text-xl font-bold">آپلود فایل</h1>
          <Uploader
            toBeUploadedCounts={toBeUploadedCounts}
            changeToBeUploadedCounts={changeToBeUploadedCounts}
          />
        </TabsContent>
      </Tabs>

      <NoReturnAlertDialog
        open={pendingLeaveOpen}
        onOpenChange={setPendingLeaveOpen}
        title="فایل‌ های آپلود نشده"
        description={`هنوز ${toBeUploadedCounts} فایل آپلود نشده دارید. در صورت رفتن به «فایل‌ های من» ، این فایل‌ ها از بین خواهند رفت. آیا می‌ خواهید ادامه دهید؟`}
        action={() => {
          setToBeUploadedCounts(0)
          setTab('my-files')
          setPendingLeaveOpen(false)
        }}
        actionText="ادامه"
      />
    </div>
  )
}
