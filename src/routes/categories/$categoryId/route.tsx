import { getSubcategories } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/categories/$categoryId")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const subcategories = await getSubcategories(categoryId);
    if (subcategories.length === 0) {
      throw notFound();
    }
    return { subcategories };
  },
});

function RouteComponent() {
  const { subcategories } = Route.useLoaderData();
  return (
    <div>
      <h2 className="heading">Subcategories:</h2>
      {subcategories.map((subcategory) => (
        <Link
          className="card"
          activeProps={{
            className: "active-card",
          }}
          from="/categories/$categoryId"
          to="/categories/$categoryId/$subcategoryId"
          params={{ subcategoryId: subcategory.id }}
          key={subcategory.id}
        >
          {subcategory.name}
        </Link>
      ))}
      <Outlet />
    </div>
  );
}
