import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getSubcategoriesByCategory } from "../../../lib/mock";

export const Route = createFileRoute("/categories/$categoryId")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const subcategories = await getSubcategoriesByCategory(Number(categoryId));
    return { subcategories };
  },
});

function RouteComponent() {
  const { categoryId } = Route.useParams();
  const { subcategories } = Route.useLoaderData();
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Subcategories:</div>
      {subcategories.map((subcategory) => (
        <div key={subcategory.id}>
          <Link
            to="/categories/$categoryId/$subcategoryId"
            params={{ categoryId, subcategoryId: subcategory.id.toString() }}
            className="block p-4 border border-gray-300 rounded-md"
            activeProps={{
              className: "bg-gray-200",
            }}
          >
            {subcategory.name}
          </Link>
        </div>
      ))}
      <Outlet />
    </div>
  );
}
