import { getCategory } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories/$categoryId/")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const category = await getCategory(categoryId);
    if (!category) {
      throw notFound();
    }
    return { category };
  },
});

function RouteComponent() {
  const { category } = Route.useLoaderData();
  return (
    <div>
      <div className="heading">Category</div>
      <div className="card">
        <p className="title">{category?.id}</p>
        <p className="title">{category?.name}</p>
      </div>
    </div>
  );
}
