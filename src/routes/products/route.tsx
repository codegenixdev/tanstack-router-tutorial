import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-x-2">
      <div className="space-x-2">
        <p>Products:</p>
        <Link to="/products/$productId" params={{ productId: "1" }}>
          Product 1
        </Link>
        <Link to="/products/$productId" params={{ productId: "2" }}>
          Product 2
        </Link>
        <Link to="/products/$productId" params={{ productId: "3" }}>
          Product 3
        </Link>
      </div>
      <Link className="block" to="/products/featured">
        Featured
      </Link>
      <Link to="/products/search">Search</Link>
      <Outlet />
    </div>
  );
}
