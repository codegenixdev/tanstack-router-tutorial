import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories_/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/categories_/create"!</div>;
}
