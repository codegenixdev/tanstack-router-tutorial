import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/files/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/account/files/"!</div>;
}
