import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/client")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    if (!context.isClient) {
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
  return (
    <>
      <Link className="nav-link" to="/client/files/$">
        Files
      </Link>
      <Outlet />
    </>
  );
}
