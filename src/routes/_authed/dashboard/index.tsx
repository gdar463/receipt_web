import { createFileRoute } from "@tanstack/react-router";

import { ThemeSelector } from "@/components/theme-selector";
import { UserDropdown } from "@/components/user-dropdown";

export const Route = createFileRoute("/_authed/dashboard/")({
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
      <header className="w-full bg-background border-b">
        <div className="max-w-screen container flex h-14 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Receipt Tracker</span>
          </div>
          <UserDropdown />
        </div>
      </header>
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSelector />
      </div>
    </div>
  );
}
