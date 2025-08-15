import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/products/$productId"!
      <Outlet />
    </div>
  );
}
