import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isClient = localStorage.getItem("role") === "client";

export const Route = createFileRoute("/client")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (!isClient) {
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
