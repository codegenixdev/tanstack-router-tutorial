import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId/review')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/$productId/review"!</div>
}
