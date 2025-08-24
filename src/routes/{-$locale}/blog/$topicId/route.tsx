import { getTopic } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/blog/$topicId")({
  component: RouteComponent,
  loader: async ({ params: { topicId } }) => {
    const topic = await getTopic(topicId);
    if (!topic) {
      throw notFound();
    }
    return { topic };
  },
  pendingComponent: () => <div>Posts are loading...</div>,
});

function RouteComponent() {
  const { topic } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Posts:</h2>
      <div className="list">
        {topic?.posts.map((post) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            from="/{-$locale}/blog/$topicId"
            to="/{-$locale}/blog/$topicId/$postId"
            params={{ postId: post.id }}
            key={post.id}
          >
            <p className="title">{post.title}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
