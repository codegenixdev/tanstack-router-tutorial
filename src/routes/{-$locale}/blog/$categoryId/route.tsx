import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getBlogCategoryById, type Locale } from "../../../../lib/mock";

export const Route = createFileRoute("/{-$locale}/blog/$categoryId")({
  component: RouteComponent,
  loader: async ({ params: { categoryId, locale } }) => {
    const blogCategory = getBlogCategoryById(
      parseInt(categoryId),
      locale as Locale
    );
    return { blogCategory };
  },
});

function RouteComponent() {
  const { blogCategory } = Route.useLoaderData();
  return (
    <div>
      <p>Posts:</p>
      {blogCategory?.posts.map((post) => (
        <Link
          className="block p-2 border rounded-md"
          to="/{-$locale}/blog/$categoryId/$postId"
          from="/{-$locale}/blog/$categoryId"
          params={{ postId: post.id.toString() }}
          key={post.id}
        >
          {post.title}
        </Link>
      ))}
      <Outlet />
    </div>
  );
}
