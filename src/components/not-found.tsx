import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <h1 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-500">
        404 - یافت نشد
      </h1>
      <p className="mb-4">صفحه ی مورد نظر یافت نشد.</p>
      <Button type="button" asChild>
        <Link to="/">
          <ChevronLeftIcon />
          بازگشت به خانه
        </Link>
      </Button>
    </div>
  )
}
