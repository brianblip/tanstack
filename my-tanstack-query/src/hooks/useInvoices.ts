import { useQuery } from "@tanstack/react-query";
import { fetchInvoices } from "../api/client";

export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });
};
