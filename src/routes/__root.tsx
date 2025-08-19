import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavLink } from "./-components/nav-link";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="container mx-auto max-w-xl">
      <div className="space-x-2">
        <NavLink to="/contact-us">Contact us</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>
      {/* <CustomLink to="/contact-us" hash="section-1">
        Foo
      </CustomLink> */}

      {/* <Link to="/search">Search</Link>
      <hr />
      <Link to="/search" search={{ filter: "", page: 10, sort: "newest" }}>
        Search with params
      </Link> */}
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
