import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isAdmin = localStorage.getItem("role") === "admin";
export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (!isAdmin) {
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
