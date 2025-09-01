import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isAdmin) {
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
