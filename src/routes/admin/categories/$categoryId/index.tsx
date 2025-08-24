import { createFileRoute } from "@tanstack/react-router";
import { getCategoryById } from "../../../../lib/mock";

export const Route = createFileRoute("/admin/categories/$categoryId/")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const category = await getCategoryById(Number(categoryId));
    return { category };
  },
});

function RouteComponent() {
  const { category } = Route.useLoaderData();
  return (
    <div>
      <div className="text-2xl font-bold">Category: {category?.name}</div>
      <div className="text-lg">Description: {category?.description}</div>
      <div className="text-lg">Slug: {category?.slug}</div>
      <div className="text-lg">ID: {category?.id}</div>
    </div>
  );
}
