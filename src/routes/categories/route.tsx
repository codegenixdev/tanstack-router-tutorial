import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getCategories } from "../../lib/mock";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
  pendingComponent: () => <div>Categories are loading...</div>,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <div className="space-y-2">
      <h2 className="heading">Categories:</h2>
      <div className="list">
        {categories.map((category) => (
          <Link
            className="card"
            activeProps={{
              className: "active-card",
            }}
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            key={category.id}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
