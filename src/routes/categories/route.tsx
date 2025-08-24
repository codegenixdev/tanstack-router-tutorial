import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getCategories } from "../../lib/mock";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <div>
      <h2 className="heading">Categories:</h2>
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
      <Outlet />
    </div>
  );
}
