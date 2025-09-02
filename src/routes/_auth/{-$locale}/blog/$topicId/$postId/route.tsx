import { getPost } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/{-$locale}/blog/$topicId/$postId")(
  {
    component: RouteComponent,
    loader: async ({ params: { postId } }) => {
      const post = await getPost(postId);
      if (!post) {
        throw notFound();
      }
      return { post };
    },
    pendingComponent: () => <div>Post is loading...</div>,
  }
);

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <h1 className="heading">Post:</h1>
      <p className="title">{post?.title}</p>
      <p className="description">{post?.description}</p>
    </>
  );
}
