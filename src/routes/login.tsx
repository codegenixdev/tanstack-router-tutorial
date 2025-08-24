import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          localStorage.setItem("isAuthenticated", "true");
          navigate({ to: "/client" });
        }}
      >
        Authenticate
      </button>
    </div>
  );
}
