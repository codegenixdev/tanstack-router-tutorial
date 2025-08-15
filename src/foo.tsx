import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/search");

const Foo = () => {
  const { filter, page, sort } = routeApi.useSearch();
  return <>{JSON.stringify({ filter, page, sort }, null, 2)}</>;
};

export { Foo };
