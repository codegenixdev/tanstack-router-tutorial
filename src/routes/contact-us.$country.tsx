import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";
import { countriesAndCities, type Country } from "./-data/countriesAndCities";

export const Route = createFileRoute("/contact-us/$country")({
  component: RouteComponent,
  loader: async ({ params: { country } }) => {
    const cities = countriesAndCities[country as Country];
    if (!cities) {
      throw notFound();
    }
    return cities;
  },
});

function RouteComponent() {
  const cities = Route.useLoaderData();

  return (
    <>
      <div className="space-x-2">
        Cities:{" "}
        {cities.map((city) => (
          <Link
            className="underline"
            to="/contact-us/$country/$city"
            activeProps={{
              className: "bg-green-500",
            }}
            from={Route.fullPath}
            params={{
              city,
            }}
            key={city}
          >
            {city}
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
