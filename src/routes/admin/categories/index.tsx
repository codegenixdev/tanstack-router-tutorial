import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/categories/"!</div>
}
