import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getCategories } from "../../../lib/mock";

export const Route = createFileRoute("/admin/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <div>
      <div className="space-y-2">
        <Link
          className="border border-gray-300 rounded-md p-2"
          to="/admin/categories/create"
        >
          New Category
        </Link>
        <div className="text-2xl font-bold">Categories:</div>
        <div className="space-x-2">
          {categories.map((category) => (
            <Link
              className="border border-gray-300 rounded-md p-2"
              to="/admin/categories/$categoryId"
              params={{ categoryId: category.id.toString() }}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
