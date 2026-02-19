import React from "react";
import {
  BookOpen,
  TrendingDown,
  ShieldCheck,
  History,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "./ui/sidebar";

const navMain = [
  { title: "Loanbook", icon: BookOpen },
  { title: "Margin Calls", icon: TrendingDown },
  { title: "Collateral Management", icon: ShieldCheck },
  { title: "History", icon: History },
];

export default function AppSidebar({ activeItem = "Margin Calls", ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map(({ title, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    isActive={activeItem === title}
                    tooltip={title}
                  >
                    <Icon />
                    <span>{title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
