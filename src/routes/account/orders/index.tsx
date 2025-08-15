import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/account/orders"!</div>;
}
