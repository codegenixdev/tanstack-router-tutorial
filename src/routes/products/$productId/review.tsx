import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId/review")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  return <div>review for product: {productId}</div>;
}
