import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/products/$productId/"!</div>
}
