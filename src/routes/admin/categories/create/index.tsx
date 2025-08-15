import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/categories/create/"!</div>;
}
