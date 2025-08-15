import * as React from "react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import { cn } from "../../lib/utils";

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  // extra props go here
};

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a ref={ref} {...props} className={cn("text-green-500", className)} />
    );
  }
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      activeProps={{ className: "font-bold" }}
      preload={"intent"}
      {...props}
    />
  );
};
