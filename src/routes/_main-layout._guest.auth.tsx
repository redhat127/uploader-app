import { AuthForm } from '#/components/form/auth-form'
import { CardLayout } from '#/components/layout/card-layout'
import { Button } from '#/components/ui/button'
import { generateTitle } from '#/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

const title = 'ثبت نام یا ورود'

export const Route = createFileRoute('/_main-layout/_guest/auth')({
  component: RouteComponent,
  head() {
    return { meta: [{ title: generateTitle(title) }] }
  },
})

function RouteComponent() {
  return (
    <div className="mx-auto mt-16 max-w-sm">
      <CardLayout
        title={<h1>{title}</h1>}
        description="برای ارسال ایمیل حاوی لینک ثبت نام یا ورود ، از فرم زیر استفاده نمایید."
      >
        <AuthForm />
        <Button type="button" asChild variant="outline" className="mt-8 w-full">
          <Link to="/">
            <ChevronLeftIcon />
            بازگشت به خانه
          </Link>
        </Button>
      </CardLayout>
    </div>
  )
}
