import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from './ui/button'

export const ErrorComponent = ({ reset }: { reset: () => void }) => {
  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <h1 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-500">
        خطایی رخ داده!
      </h1>
      <p className="mb-4">لطفا دوباره تلاش کنید یا به خانه برگردید.</p>
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={() => reset()}
          variant="outline"
          className="w-full sm:w-auto"
        >
          دوباره تلاش کن!
        </Button>
        <Button type="button" asChild className="w-full sm:w-auto">
          <Link to="/">
            <ChevronLeftIcon />
            بازگشت به خانه
          </Link>
        </Button>
      </div>
    </div>
  )
}
