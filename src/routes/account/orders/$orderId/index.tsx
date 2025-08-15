import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/orders/$orderId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = Route.useParams();
  return <div>Hello "/account/orders/&orderId/"! orderId: {orderId}</div>;
}
