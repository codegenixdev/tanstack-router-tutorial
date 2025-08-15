import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/blog/$categoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/-$locale/blog/$categoryId/"!
      <Outlet />
    </div>
  );
}
