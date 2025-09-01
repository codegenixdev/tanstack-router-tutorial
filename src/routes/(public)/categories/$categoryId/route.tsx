import { getSubcategories } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/categories/$categoryId")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const subcategories = await getSubcategories(categoryId);
    if (subcategories.length === 0) {
      throw notFound();
    }
    return { subcategories };
  },
  pendingComponent: () => <div>Subcategories are loading...</div>,
});

function RouteComponent() {
  const { subcategories } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Subcategories:</h2>
      <div className="list">
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
            <p className="title">{subcategory.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
