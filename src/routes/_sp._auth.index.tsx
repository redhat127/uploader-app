import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_sp/_auth/')({ component: Home })

function Home() {
  return null
}
