import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getProducts } from "../../lib/mock";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
  loader: async () => {
    const products = await getProducts();
    return { products };
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();
  return (
    <div className="space-x-2">
      <div className="space-x-2">
        <p className="text-2xl font-bold">Products:</p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              className="border border-gray-300 rounded-md p-4"
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              activeProps={{
                className: "bg-gray-200",
              }}
            >
              {product.name}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
