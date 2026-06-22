import { APP_NAME_FARSI } from '#/lib/const'
import { UploadCloudIcon } from 'lucide-react'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <UploadCloudIcon className="text-[oklch(0.685_0.169_237.323)]" />
      {APP_NAME_FARSI}
    </div>
  )
}
