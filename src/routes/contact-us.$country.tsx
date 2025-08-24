import { getCities } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us/$country")({
  component: RouteComponent,
  loader: async ({ params: { country } }) => {
    const cities = await getCities(country);
    if (cities.length === 0) {
      throw notFound();
    }
    return { cities };
  },
});

function RouteComponent() {
  const { cities } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Cities:</h2>
      {cities.map((city) => (
        <Link
          className="card"
          activeProps={{
            className: "bg-green-500",
          }}
          from={Route.fullPath}
          to="/contact-us/$country/$city"
          params={{
            city,
          }}
          key={city}
        >
          <p className="title">{city}</p>
        </Link>
      ))}
      <Outlet />
    </>
  );
}
