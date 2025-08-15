import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/products"!
      <Outlet />
    </div>
  );
}
