import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Foo } from "../../foo";

// show that if error, url correctly redirect to catch
const searchSchema = z.object({
  page: z.number().default(1).catch(1),
  filter: z.string().default("").catch(""),
  sort: z.enum(["newest", "oldest", "price"]).default("newest").catch("newest"),
});

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const { filter, page, sort } = Route.useSearch();
  return (
    <pre>
      ``````
      <Foo />
      ````````
      {JSON.stringify({ filter, page, sort }, null, 2)}
    </pre>
  );
}
