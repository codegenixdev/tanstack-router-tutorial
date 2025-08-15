import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/products/create/"!</div>;
}
