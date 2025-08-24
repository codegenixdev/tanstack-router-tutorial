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
      <div className="text-2xl font-bold">Categories:</div>
      {categories.map((category) => (
        <div key={category.id}>
          <Link
            to="/categories/$categoryId"
            params={{ categoryId: category.id.toString() }}
            className="block p-4 border border-gray-300 rounded-md"
            activeProps={{
              className: "bg-gray-200",
            }}
          >
            {category.name}
          </Link>
        </div>
      ))}
      <Outlet />
    </div>
  );
}
