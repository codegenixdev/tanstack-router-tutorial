import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { NavLink } from "@/routes/-components/nav-link";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// export const Route = createRootRoute({
//   component: RootComponent,
// });

export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { logout, isAuthenticated, isAdmin, isClient } =
    Route.useRouteContext();
  const navigate = Route.useNavigate();
  const location = useLocation();

  return (
    <div className="container mx-auto max-w-xl">
      <div className="space-x-2">
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/about">About Page</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/{-$locale}/blog">Blog</NavLink>
        {isClient && <NavLink to="/client">Account</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {isAuthenticated ? (
          <button
            className="button"
            onClick={() => {
              logout();
              navigate({ to: "/login", search: { redirect: location.href } });
            }}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
