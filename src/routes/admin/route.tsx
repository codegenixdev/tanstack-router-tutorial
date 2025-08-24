import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
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
