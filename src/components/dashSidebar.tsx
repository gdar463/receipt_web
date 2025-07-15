import { Link } from "@tanstack/react-router";
import { List, Plus, UserRound } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { useSettings } from "@/lib/settings";

import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { UserDropdown } from "./userDropdown";

export function DashSidebar() {
  const auth = useAuth();
  const settings = useSettings();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="container flex h-14 items-center justify-between">
          <span className="text-xl font-semibold px-3 font-[Parkinsans]">
            Receipt Tracker
          </span>
        </div>
        <SidebarSeparator className="relative left-[-0.5rem]" />
      </SidebarHeader>
      <SidebarContent className="py-1">
        <SidebarGroup>
          <SidebarGroupLabel>Receipts</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <Link to="/dashboard/new">
              <Plus />
            </Link>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <Button
              variant="ghost"
              className="flex flex-row items-center justify-start text-start mx-2"
              asChild
            >
              <Link to="/dashboard/list">
                <List className="size-5" />
                <span>List</span>
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserDropdown className="w-full flex-row items-center justify-start text-start">
                <UserRound className="size-7" />
                <div className="flex flex-col ml-1">
                  <span className="text-sm">{auth.user?.displayName}</span>
                  <span className="text-xs font-normal">
                    {settings.options?.streamerMode
                      ? "•••••@•••••.•••"
                      : auth.user?.email}
                  </span>
                </div>
              </UserDropdown>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
