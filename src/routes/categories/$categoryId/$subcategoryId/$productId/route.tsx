import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProductById } from "../../../../../lib/mock";

export const Route = createFileRoute(
  "/categories/$categoryId/$subcategoryId/$productId"
)({
  component: RouteComponent,
  loader: async ({ params: { productId } }) => {
    const product = await getProductById(Number(productId));
    if (!product) {
      throw notFound();
    }
    return { product };
  },
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  return (
    <>
      <p className="text-2xl font-bold">Product Details:</p>
      <div
        id="product-details"
        className="border border-gray-300 rounded-md p-4 space-y-2"
      >
        <div className="text-2xl font-bold">{product.name}</div>
        <div className="text-lg">${product.price}</div>
        <div className="text-sm">{product.description}</div>
      </div>
    </>
  );
}
