import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  return (
    <div>
      <h1>File: {_splat}</h1>
    </div>
  );
}
