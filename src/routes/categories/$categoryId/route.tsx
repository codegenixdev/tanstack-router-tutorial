import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/categories/$categoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();
  return (
    <div>
      categoryId: {categoryId}
      <Outlet />
    </div>
  );
}
