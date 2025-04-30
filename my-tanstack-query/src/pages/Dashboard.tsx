import { useClients } from "@/hooks/useClients";
import { useInvoices } from "@/hooks/useInvoices";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = useClients();

  const {
    data: invoices,
    isLoading: isInvoicesLoading,
    isError: isInvoicesError,
    error: invoicesError,
  } = useInvoices();

  /*   const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useProjects(); */

  const isLoading = isClientsLoading || isInvoicesLoading;
  const isError = isClientsError || isInvoicesError;
  const error = clientsError || invoicesError;

  // Calculate dashboard metrics
  const totalClients = clients?.length || 0;
  const totalIncome =
    invoices?.reduce((sum, invoice) => sum + invoice.amount, 0) || 0;
  const pendingInvoices =
    invoices?.filter((invoice) => invoice.status === "pending").length || 0;
  const recentInvoices = invoices?.slice(0, 5) || [];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="opacity-60 animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded-md w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded-md w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="opacity-60 animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded-md w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 bg-muted rounded-md"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Display error state
  if (isError) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-destructive mb-2">
          Error loading dashboard data
        </h2>
        <p className="text-muted-foreground mb-4">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingInvoices}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Your most recent invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {recentInvoices.length > 0 ? (
              <ul className="space-y-4">
                {recentInvoices.map((invoice) => {
                  const client = clients?.find(
                    (c) => c.id === invoice.clientId
                  );
                  return (
                    <li
                      key={invoice.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">
                          {client?.name || `Client #${invoice.clientId}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Status:{" "}
                          <span
                            className={`capitalize ${
                              invoice.status === "paid"
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </p>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No recent invoices
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Link
              to="/invoices"
              className="text-sm text-primary hover:underline"
            >
              View all invoices
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Common actions and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/clients"
                className="block p-4 border rounded-lg hover:bg-muted"
              >
                <div className="font-medium">Clients</div>
                <div className="text-sm text-muted-foreground">
                  Manage your clients
                </div>
              </Link>
              <Link
                to="/invoices"
                className="block p-4 border rounded-lg hover:bg-muted"
              >
                <div className="font-medium">Invoices</div>
                <div className="text-sm text-muted-foreground">
                  Manage invoices
                </div>
              </Link>
              <Link
                to="/projects"
                className="block p-4 border rounded-lg hover:bg-muted"
              >
                <div className="font-medium">Projects</div>
                <div className="text-sm text-muted-foreground">
                  Track your projects
                </div>
              </Link>
              <Link
                to="/reports"
                className="block p-4 border rounded-lg hover:bg-muted"
              >
                <div className="font-medium">Reports</div>
                <div className="text-sm text-muted-foreground">
                  View financial reports
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Export as named export for router
export { Dashboard };
