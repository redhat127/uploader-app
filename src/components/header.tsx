import { APP_NAME_FARSI } from '#/lib/const'
import { Link } from '@tanstack/react-router'
import { UploadCloudIcon } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-(--header-height) items-center border-b bg-white p-8 dark:bg-transparent">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <UploadCloudIcon className="text-sidebar-primary" />
        {APP_NAME_FARSI}
      </Link>
      <div className="mr-auto">
        <ModeToggle align="end" />
      </div>
    </header>
  )
}
