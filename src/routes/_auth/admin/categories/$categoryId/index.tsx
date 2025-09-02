import { getCategory } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories/$categoryId/")({
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
    <div className="space-y-3">
      <div className="heading">Category:</div>
      <p className="title">{category?.name}</p>
    </div>
  );
}
