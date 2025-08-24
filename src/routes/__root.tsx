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
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/contact-us">Contact us</NavLink>
        <NavLink to="/{-$locale}/blog">Blog</NavLink>
        <NavLink to="/client">Account</NavLink>
        <NavLink to="/admin">Admin</NavLink>

        <button
          className="button"
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
          }}
        >
          Sign out
        </button>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
