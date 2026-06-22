import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_sp/')({ component: Home })

function Home() {
  return null
}
