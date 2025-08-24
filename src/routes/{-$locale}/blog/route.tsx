import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { getBlogCategories, LOCALES, type Locale } from "../../../lib/mock";

export const Route = createFileRoute("/{-$locale}/blog")({
  component: RouteComponent,
  loader: async ({ params: { locale } }) => {
    if (!["en", "fr", "es"].includes(locale ?? "en")) {
      throw redirect({ to: "/{-$locale}/blog", params: { locale: undefined } });
    }
    const blogCategories = getBlogCategories(locale as Locale);
    return { blogCategories };
  },
});

function RouteComponent() {
  const { blogCategories } = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <p>Blog</p>
      <p>Select your language</p>

      <div className="space-x-2">
        {LOCALES.map((locale) => (
          <Link
            className="uppercase border rounded-md p-2"
            to="/{-$locale}/blog"
            params={{ locale }}
            activeProps={{ className: "bg-blue-500 text-white" }}
            key={locale}
          >
            {locale}
          </Link>
        ))}
      </div>
      {blogCategories.map((category) => (
        <Link
          className="block p-2 border rounded-md"
          to="/{-$locale}/blog/$categoryId"
          params={{ categoryId: category.categoryId.toString() }}
          key={category.categoryId}
        >
          <h1>{category.title}</h1>
          <p>{category.description}</p>
        </Link>
      ))}
      <Outlet />
    </div>
  );
}
