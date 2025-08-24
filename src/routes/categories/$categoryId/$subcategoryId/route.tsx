import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getProductsBySubcategory } from "../../../../lib/mock";

export const Route = createFileRoute("/categories/$categoryId/$subcategoryId")({
  component: RouteComponent,
  loader: async ({ params: { subcategoryId } }) => {
    const products = await getProductsBySubcategory(Number(subcategoryId));
    return { products };
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();
  return (
    <div>
      <div>
        {products.length === 0 && <div>No products found</div>}
        <p className="text-2xl font-bold">Products:</p>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to="/categories/$categoryId/$subcategoryId/$productId"
              params={{
                productId: product.id.toString(),
              }}
              hash="product-details"
              from="/categories/$categoryId/$subcategoryId"
              className="border border-gray-300 rounded-md p-4"
              activeProps={{
                className: "bg-gray-200",
              }}
            >
              <div>{product.name}</div>
              <div>{product.price}</div>
              <div>{product.description.slice(0, 100)}...</div>
              <div>{product.images[0]}</div>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
