import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import { ThemeSelector } from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Route = createFileRoute("/_landing")({
  component: LandingLayout,
});

function LandingLayout() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Outlet />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeSelector />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Receipt Tracker</span>
        </div>
        <NavigationMenu className="flex-1 justify-end">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Button className="h-9 w-9" variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/gdar463/receipt_api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <SiGithub className="size-5" />
                </a>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="secondary" className="font-medium" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
