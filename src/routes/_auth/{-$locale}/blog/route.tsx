import { getTopics, LOCALES, type Locale } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/{-$locale}/blog")({
  component: RouteComponent,
  loader: async ({ params: { locale } }) => {
    if (!["en", "fr", "es"].includes(locale ?? "en")) {
      throw redirect({ to: "/{-$locale}/blog", params: { locale: undefined } });
    }
    const topics = await getTopics(locale as Locale);
    return { topics };
  },
  pendingComponent: () => <div>Topics are loading...</div>,
});

function RouteComponent() {
  const { topics } = Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <div className="space-y-2">
      <h1 className="heading">Blog</h1>
      <p className="label">Select your language</p>

      <div className="space-x-2">
        {LOCALES.map((item) => (
          <Link
            className={`outlined-button ${!locale && item === "en" ? "bg-green-500 text-white" : ""}`}
            activeProps={{ className: "bg-green-500 text-white" }}
            to="/{-$locale}/blog"
            params={{ locale: item }}
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>
      <h2 className="heading">Topics:</h2>
      <div className="list">
        {topics.map((topic) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/{-$locale}/blog/$topicId"
            params={{ topicId: topic.id.toString() }}
            key={topic.id}
          >
            <p className="title">{topic.name}</p>
            <p className="description">
              {topic.posts.map((post) => post.title).join(", ")}
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
