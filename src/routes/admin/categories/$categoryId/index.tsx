import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories/$categoryId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/categories/$categoryId/"!</div>;
}
