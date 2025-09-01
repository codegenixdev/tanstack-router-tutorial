import { getCountries } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
  loader: async () => {
    const countries = await getCountries();
    return { countries };
  },
  pendingComponent: () => <div>Countries are loading...</div>,
});

function RouteComponent() {
  const { countries } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">What country are you at?</h2>
      <div className="list">
        {countries.map((country) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/contact-us/$country"
            params={{
              country: country.name,
            }}
            key={country.name}
          >
            <p className="title">{country.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
