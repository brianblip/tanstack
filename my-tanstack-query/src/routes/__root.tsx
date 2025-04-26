import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="container mx-auto py-6 px-4">
      <nav className="mb-6 pb-4 border-b">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-primary hover:underline [&.active]:font-bold">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/clients" className="text-primary hover:underline [&.active]:font-bold">
              Clients
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </div>
  ),
});