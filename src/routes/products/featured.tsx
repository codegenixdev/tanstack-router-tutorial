import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/featured")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/products/featured"!</div>;
}
