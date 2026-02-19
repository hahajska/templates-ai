import React from "react";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">
              Margin Calls
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and manage active margin call positions.
            </p>
          </div>
          <DataTable />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
