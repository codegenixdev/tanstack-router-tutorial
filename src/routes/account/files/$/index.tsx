import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  return <div>Hello "/account/files/$/"! splat: {_splat}</div>;
}
