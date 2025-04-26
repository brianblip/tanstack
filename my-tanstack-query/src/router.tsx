import { Dashboard } from "@/pages/Dashboard";
import { Clients } from "@/pages/Clients";
import { Route, RootRoute, Router, Outlet } from "@tanstack/react-router";

// Create a root route
const rootRoute = new RootRoute({
  component: () => (
    <div className="container mx-auto py-6 px-4">
      <nav className="mb-6 pb-4 border-b">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-primary hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/clients" className="text-primary hover:underline">
              Clients
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});

// Define routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const clientsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/clients",
  component: Clients,
});

// Create and export the route tree
const routeTree = rootRoute.addChildren([indexRoute, clientsRoute]);

// Create the router
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
});

// Types for our router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
