import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    } else if (!context.isAdmin) {
      throw redirect({
        to: "/client",
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Link className="button" to="/admin/reports">
        Reports
      </Link>
      <Link className="button" to="/admin/categories">
        Categories
      </Link>
      <Outlet />
    </>
  );
}
