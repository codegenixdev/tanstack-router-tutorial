import { createFileRoute, notFound } from "@tanstack/react-router";
import { countriesAndCities, type Country } from "./-data/countriesAndCities";

export const Route = createFileRoute("/contact-us/$country/$city")({
  component: RouteComponent,
  loader: ({ params: { country, city } }) => {
    const cities = countriesAndCities[country as Country];
    if (!cities.includes(city)) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  const { city, country } = Route.useParams();
  return (
    <div>
      Selected Country & City: {country}, {city}
    </div>
  );
}
