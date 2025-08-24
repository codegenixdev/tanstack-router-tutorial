import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isAuthenticated = true;
export const Route = createFileRoute("/account")({
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
      <Link to="/account/files/$">Files</Link>
      <Outlet />
    </div>
  );
}
