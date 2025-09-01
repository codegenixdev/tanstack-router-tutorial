import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { NavLink } from "@/routes/-components/nav-link";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <NavLink to="/">Main Page</NavLink>
      <NavLink to="/about">About Page</NavLink>

      <Outlet />
    </React.Fragment>
  );
}
