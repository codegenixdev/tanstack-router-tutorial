import { searchProducts } from "@/lib/mock";
import { FilterPanel } from "@/routes/search/-components/filter-panel";
import { searchSchema } from "@/routes/search/-types/searchSchema";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const products = await searchProducts(search);
    return { products };
  },
});

function RouteComponent() {
  // show also an example o getRouterApi
  const { products } = Route.useLoaderData();

  return (
    <>
      <FilterPanel />
      <div className="list">
        {products.map((product) => (
          <Link
            className="card"
            to="/categories/$categoryId/$subcategoryId/$productId"
            params={{
              productId: product.id,
              categoryId: product.categoryId,
              subcategoryId: product.subcategoryId,
            }}
            key={product.id}
          >
            <p className="title">{product.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">{product.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
