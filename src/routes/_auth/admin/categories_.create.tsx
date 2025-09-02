import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/categories_/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/admin/categories_/create"!</div>
}
