import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/_auth/')({
  component: Home,
})

function Home() {
  return null
}
