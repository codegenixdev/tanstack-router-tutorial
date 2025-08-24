import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useState } from "react";

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

const filesRouterApi = getRouteApi("/account/files/$/");
function RouteComponent() {
  const { _splat } = filesRouterApi.useParams();
  const [filepath, setFilepath] = useState(_splat);
  return (
    <div>
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        value={filepath}
        onChange={(e) => setFilepath(e.target.value)}
      />
      <Link to="/account/files/$" params={{ _splat: filepath }}>
        Go to file
      </Link>
      <Outlet />
    </div>
  );
}
