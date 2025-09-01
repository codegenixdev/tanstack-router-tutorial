import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories_/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Create Category</div>;
}
