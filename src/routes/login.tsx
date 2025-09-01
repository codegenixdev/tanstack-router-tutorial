import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    const { isAdmin, isClient, isAuthenticated } = context;
    console.log("isAuthenticated");
    if (isAdmin || isClient) {
      throw redirect({
        to: !isAuthenticated ? "/login" : isAdmin ? "/admin" : "/client",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const { login } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const [username, setUsername] = useState("");
  return (
    <form>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <button
        className="button"
        type="submit"
        onClick={() => {
          if (username === "admin") {
            login("admin");
            navigate({ to: "/admin" });
          } else {
            login("client");
            navigate({ to: "/client" });
          }
        }}
      >
        Authenticate
      </button>
    </form>
  );
}
