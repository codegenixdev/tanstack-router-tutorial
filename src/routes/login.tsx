import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

const isAdmin = localStorage.getItem("role") === "admin";
const isClient = localStorage.getItem("role") === "client";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (isAdmin || isClient) {
      throw redirect({
        to: isAdmin ? "/admin" : "/client",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [username, setUsername] = useState("");
  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="button"
        onClick={() => {
          if (username === "admin") {
            localStorage.setItem("role", "admin");
            navigate({ to: "/admin" });
          } else {
            localStorage.setItem("role", "client");
            navigate({ to: "/client" });
          }
        }}
      >
        Authenticate
      </button>
    </div>
  );
}
