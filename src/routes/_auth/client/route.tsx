import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/client")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isClient) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Link className="nav-link" to="/client/files/$">
        Files
      </Link>
      <Outlet />
    </>
  );
}
