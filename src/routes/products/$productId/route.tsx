import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  return (
    <div>
      <p>productId: {productId}</p>
      <Link to="/products/$productId/review" params={{ productId }}>
        Review
      </Link>
      <Outlet />
    </div>
  );
}
