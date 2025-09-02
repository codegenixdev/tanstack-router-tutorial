import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().default("/"),
  }),
  beforeLoad: async ({ context, search }) => {
    const { isAdmin, isAuthenticated } = context;
    if (isAuthenticated) {
      throw redirect({
        to: search.redirect || (isAdmin ? "/admin" : "/client"),
      });
    }
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { login } = Route.useRouteContext();
  const router = useRouter();
  const search = Route.useSearch();
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
          } else {
            login("client");
          }
          router.invalidate();
          navigate({ to: search.redirect });
        }}
      >
        Login
      </button>
    </form>
  );
}
