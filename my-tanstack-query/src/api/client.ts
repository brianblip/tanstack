import axios from "axios";
import { Client, Invoice, Project } from "@/types";

// Create a reusable axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchClients = async (): Promise<Client[]> => {
  try {
    const res = await api.get<Client[]>("/clients");
    return res.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const res = await api.get<Invoice[]>("/invoices");
    return res.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices");
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await api.get<Project[]>("/projects");
    return res.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};
