import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../api/client";

export const useClients = () => {
  return useQuery({ queryKey: ["clients"], queryFn: fetchClients });
};
