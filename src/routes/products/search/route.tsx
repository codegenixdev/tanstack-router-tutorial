import { createFileRoute, Link } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";

const sortOptions = {
  newest: "newest",
  oldest: "oldest",
  price: "price",
} as const;
// show that if error, url correctly redirect to catch
const searchSchema = z.object({
  page: z.number().default(1).catch(1),
  filter: z.string().default("").catch(""),
  sort: z.enum(sortOptions).default("newest").catch("newest"),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/products/search")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  // show also an example o getRouterApi
  const { filter, page, sort } = Route.useSearch();
  const [filterInput, setFilterInput] = useState(filter);
  const [pageInput, setPageInput] = useState(page.toString());

  const getSearchParams = (updates: Partial<SearchParams>) => {
    return {
      filter: updates.filter !== undefined ? updates.filter : filter,
      page: updates.page !== undefined ? updates.page : page,
      sort: updates.sort !== undefined ? updates.sort : sort,
    };
  };

  return (
    <div>
      <div>
        <label>
          Filter:
          <input
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </label>
        <Link
          search={getSearchParams({ filter: filterInput })}
          to="/products/search"
        >
          Apply Filter
        </Link>
      </div>

      <div>
        <label>
          Page:
          <input
            type="number"
            min="1"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
          />
        </label>
        <div className="space-x-2 inline">
          <Link
            search={getSearchParams({ page: parseInt(pageInput) || 1 })}
            to="/products/search"
          >
            Go to Page
          </Link>

          <Link
            search={getSearchParams({ page: Math.max(1, page - 1) })}
            disabled={page <= 1}
            to="/products/search"
          >
            Previous
          </Link>
          <Link
            search={getSearchParams({ page: page + 1 })}
            to="/products/search"
          >
            Next
          </Link>
        </div>
      </div>

      <div className="space-x-2">
        <label>Sort:</label>
        {Object.values(sortOptions).map((sortOption) => (
          <Link
            key={sortOption}
            search={getSearchParams({ sort: sortOption })}
            to="/products/search"
          >
            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
          </Link>
        ))}
      </div>

      <pre>{JSON.stringify({ filter, page, sort }, null, 2)}</pre>
    </div>
  );
}
