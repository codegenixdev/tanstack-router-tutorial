import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { countriesAndCities } from "./-data/countriesAndCities";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
});

const countries = Object.keys(countriesAndCities);

function RouteComponent() {
  return (
    <div>
      What country are you at?
      <div className="space-x-2">
        Countries:{" "}
        {countries.map((country) => (
          <Link
            activeProps={{ className: "bg-green-500" }}
            className="underline"
            to="/contact-us/$country"
            params={{
              country,
            }}
            key={country}
          >
            {country}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
