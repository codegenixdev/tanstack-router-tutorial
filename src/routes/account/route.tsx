import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/account"!
      <Outlet />
    </div>
  );
}
