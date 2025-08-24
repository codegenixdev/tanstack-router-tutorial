import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getBlogPostById, type Locale } from "../../../../../lib/mock";

export const Route = createFileRoute("/{-$locale}/blog/$categoryId/$postId")({
  component: RouteComponent,
  loader: async ({ params: { postId, locale } }) => {
    const blogPost = getBlogPostById(parseInt(postId), locale as Locale);
    return { blogPost };
  },
});

function RouteComponent() {
  const { blogPost } = Route.useLoaderData();
  return (
    <div>
      <h1>{blogPost?.title}</h1>
      <p>{blogPost?.description}</p>
      <Outlet />
    </div>
  );
}
