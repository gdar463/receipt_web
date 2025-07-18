import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";

import { DashSidebar } from "@/components/dashSidebar";
import { ThemeSelector } from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard - Receipt Tracker",
      },
    ],
  }),
  loader: ({ location }) => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      throw redirect({ to: "/dashboard/list" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-dvh">
      <SidebarProvider className="min-h-dvh">
        <DashSidebar />
        <SidebarInset>
          <header className="w-full bg-background border-b sticky">
            <div className="max-w-screen container flex h-14 items-center justify-between pl-3 pr-5">
              <Trigger />
            </div>
          </header>
          <div className="m-2 h-full">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSelector />
      </div>
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
