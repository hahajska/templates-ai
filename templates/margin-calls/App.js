import React from "react";
import { Agentation } from "agentation";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";

export default function App() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="flex divide-x divide-border border-b border-border">
            <div className="flex-1 px-8 py-6">
              <p className="text-sm text-muted-foreground">Label</p>
              <p className="text-xl text-semibold text-foreground mt-1">Data</p>
            </div>
            <div className="flex-1 px-8 py-6">
              <p className="text-sm text-muted-foreground">Label</p>
              <p className="text-xl text-semibold text-foreground mt-1">Data</p>
            </div>
            <div className="flex-1 px-8 py-6">
              <p className="text-sm text-muted-foreground">Label</p>
              <p className="text-xl text-semibold text-foreground mt-1">Data</p>
            </div>
            <div className="flex-1 px-8 py-6">
              <p className="text-sm text-muted-foreground">Label</p>
              <p className="text-xl text-semibold text-foreground mt-1">Data</p>
            </div>
          </div>
          <main className="flex-1 p-6">
            <DataTable />
          </main>
        </SidebarInset>
      </SidebarProvider>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
