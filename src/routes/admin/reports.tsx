import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/reports")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/reports"!</div>;
}
