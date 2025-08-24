import { getCities } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us/$country/$city")({
  component: RouteComponent,
  loader: async ({ params: { country, city } }) => {
    const cities = await getCities(country);
    if (!cities.includes(city)) {
      throw notFound();
    }
    return { city };
  },
});

function RouteComponent() {
  const { city } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Selected City:</h2>
      <p className="title">{city}</p>
    </>
  );
}
