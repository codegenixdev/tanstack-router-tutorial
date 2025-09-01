import { getProduct } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/categories/$categoryId/$subcategoryId/$productId"
)({
  component: RouteComponent,
  loader: async ({ params: { productId } }) => {
    const product = await getProduct(productId);
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  pendingComponent: () => <div>Product is loading...</div>,
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Product Details:</h2>
      <div id="product-details" className="card">
        <p className="title">{product.name}</p>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
      </div>
    </>
  );
}
