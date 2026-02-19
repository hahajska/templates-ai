import React from "react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function Navbar() {
  return (
    <header className="flex items-center h-14 gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="h-4 w-px bg-border mx-2" />
      <span className="text-sm font-medium text-foreground">Margin Calls</span>
      <div className="ml-auto">
        <Button>Connect Wallet</Button>
      </div>
    </header>
  );
}
