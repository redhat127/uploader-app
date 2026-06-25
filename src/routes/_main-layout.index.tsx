import { Button } from '#/components/ui/button'
import { UploadFiles } from '#/components/upload/upload-files'
import {
  ClientOnly,
  createFileRoute,
  Link,
  useRouteContext,
} from '@tanstack/react-router'
import { UserKeyIcon } from 'lucide-react'

export const Route = createFileRoute('/_main-layout/')({
  component: Home,
})

function Home() {
  const { user } = useRouteContext({ from: '/_main-layout' })

  return user ? (
    <ClientOnly
      fallback={
        <p className="text-muted-foreground mx-auto max-w-7xl text-sm">
          در حال بارگذاری...
        </p>
      }
    >
      <UploadFiles />
    </ClientOnly>
  ) : (
    <div className="mx-auto mt-48 w-full max-w-sm text-center">
      <Button type="button" asChild>
        <Link to="/auth">
          <UserKeyIcon />
          اول وارد شو!
        </Link>
      </Button>
    </div>
  )
}
