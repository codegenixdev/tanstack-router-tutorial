import { useRouterContextState } from "@/lib/use-router-context-state";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  context: {
    role: null,
    login: () => {},
    logout: () => {},
    isAdmin: false,
    isClient: false,
    isAuthenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const routerContextState = useRouterContextState();
  return <RouterProvider router={router} context={routerContextState} />;
}

export default App;
