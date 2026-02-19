import React from "react";
import { Agentation } from "agentation";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";

export default function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <main className="flex-1 p-6">
            <DataTable />
          </main>
        </SidebarInset>
      </SidebarProvider>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
