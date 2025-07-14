import { UserRound } from "lucide-react";

import { useAuth } from "@/lib/auth";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { UserDropdown } from "./userDropdown";

export function DashSidebar() {
  const auth = useAuth();
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
      <SidebarFooter className="mt-auto">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserDropdown className="w-full flex-row items-center justify-start text-start">
                <UserRound className="size-7" />
                <div className="flex flex-col ml-1">
                  <span className="text-sm">{auth.user?.displayName}</span>
                  <span className="text-xs font-normal">
                    {auth.user?.email}
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
