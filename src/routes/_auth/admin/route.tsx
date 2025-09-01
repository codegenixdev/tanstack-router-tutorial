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
    <div className="space-x-2 space-y-3">
      <Link
        className="card"
        activeProps={{ className: "active-card" }}
        to="/admin/reports"
      >
        Reports
      </Link>
      <Link
        className="card"
        activeProps={{ className: "active-card" }}
        activeOptions={{ exact: true }}
        to="/admin/categories"
      >
        Categories
      </Link>

      <Outlet />
    </div>
  );
}
