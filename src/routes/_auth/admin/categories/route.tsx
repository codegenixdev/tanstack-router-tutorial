import { getCategories } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <>
      <Link className="button" to="/admin/categories/create">
        New Category
      </Link>
      <div className="heading">Categories:</div>
      <div className="list">
        {categories.map((category) => (
          <Link
            className="card"
            to="/admin/categories/$categoryId"
            params={{ categoryId: category.id.toString() }}
            key={category.id}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
