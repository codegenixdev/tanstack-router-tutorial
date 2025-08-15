import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories/$categoryId/$subcategoryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId, subcategoryId } = Route.useParams();
  return (
    <div>
      categoryId: {categoryId}, subcategoryId: {subcategoryId}
    </div>
  );
}
