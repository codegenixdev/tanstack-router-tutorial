import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/blog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/-$locale/blog/"!
      <Outlet />
    </div>
  );
}
