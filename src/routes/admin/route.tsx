import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavLink } from "../-components/nav-link";

const isAuthenticated = true;
export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated) {
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
    <div>
      <div className="space-x-2">
        <NavLink to="/admin/reports">Reports</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
