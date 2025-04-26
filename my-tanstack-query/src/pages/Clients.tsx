import { useClients } from "@/hooks/useClients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@/types";

const Clients = () => {
  const {
    data: clients,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useClients();

  // Better loading state with skeleton UI pattern
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Clients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="opacity-60 animate-pulse">
              <CardHeader>
                <div className="h-5 bg-muted rounded-md w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded-md w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Better error handling with retry button
  if (isError) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-destructive mb-2">
          Error loading clients
        </h2>
        <p className="text-muted-foreground mb-4">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients</h2>
        {isFetching && (
          <span className="text-sm text-muted-foreground">Refreshing...</span>
        )}
      </div>

      {clients && clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client: Client) => (
            <Card key={client.id}>
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{client.email}</p>
                <p className="mt-2">{client.projects.length} Projects</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground p-8">
          No clients found
        </p>
      )}
    </div>
  );
};

export { Clients };
