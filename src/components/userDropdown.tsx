import { SiGithub } from "@icons-pack/react-simple-icons";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import { CodeXml, LogOut, Settings, UserRound } from "lucide-react";
import { type ReactNode, useState } from "react";

import { useAuth } from "@/lib/auth";

import { SettingsDialog, type SettingsState } from "./settingsDialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function UserDropdown({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<SettingsState>({
    open: false,
    tab: "settings",
  });
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="user" variant="ghost" className={className}>
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-48 ml-[1.125rem] ${dialog.open ? "hidden" : ""}`}
        side={isMobile ? "bottom" : "right"}
        align="end"
      >
        <DropdownMenuLabel className="font-semibold">Account</DropdownMenuLabel>
        <SettingsDialog
          className="w-full align-start"
          setOpen={setOpen}
          state={{ dialog, setDialog }}
        >
          <DropdownMenuItem
            onSelect={(event) => {
              setDialog({ open: true, tab: "profile" });
              event.preventDefault();
            }}
          >
            <UserRound className="text-foreground" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              setDialog({ open: true, tab: "settings" });
              event.preventDefault();
            }}
          >
            <Settings className="text-foreground" />
            Settings
          </DropdownMenuItem>
        </SettingsDialog>
        <DropdownMenuSeparator />
        <a
          href="https://github.com/gdar463/receipt_api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DropdownMenuItem>
            <SiGithub className="text-foreground" />
            Github
          </DropdownMenuItem>
        </a>
        <Tooltip delayDuration={400}>
          <TooltipTrigger>
            <DropdownMenuItem disabled>
              <CodeXml className="text-foreground" />
              API
            </DropdownMenuItem>
          </TooltipTrigger>
          <TooltipContent>Soon™</TooltipContent>
        </Tooltip>
        <DropdownMenuSeparator />
        <LogoutDialog>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
            }}
            variant="destructive"
          >
            <LogOut className="text-destructive" />
            Logout
          </DropdownMenuItem>
        </LogoutDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutDialog({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await auth.logout();
    navigate({ to: "/" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">Logout</DialogTitle>
          <DialogDescription className="text-base">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
