import "./App.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Clients } from "./pages/Clients";

// Layout component for consistent navigation across pages
const Layout = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <nav className="mb-6 pb-4 border-b">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/clients" className="text-primary hover:underline">
              Clients
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="invoices" element={<div>Invoices Page</div>} />
        <Route path="projects" element={<div>Projects Page</div>} />
        <Route path="reports" element={<div>Reports Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
