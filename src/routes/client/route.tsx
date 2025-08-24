import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

export const Route = createFileRoute("/client")({
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
      <Link className="nav-link" to="/client/files/$">
        Files
      </Link>
      <Outlet />
    </>
  );
}
