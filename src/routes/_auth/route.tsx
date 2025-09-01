import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,

  beforeLoad: async ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
