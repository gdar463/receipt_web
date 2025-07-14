import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";

import { DashSidebar } from "@/components/dashSidebar";
import { ThemeSelector } from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard - Receipt Tracker",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <DashSidebar />
        <header className="w-full bg-background border-b sticky">
          <div className="max-w-screen container flex h-14 items-center justify-between pl-3 pr-5">
            <Trigger />
          </div>
        </header>
        <Outlet />
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeSelector />
        </div>
      </SidebarProvider>
    </div>
  );
}

function Trigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={toggleSidebar} size="icon" variant="ghost">
      <PanelLeft />
    </Button>
  );
}
