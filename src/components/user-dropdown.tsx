import { SiGithub } from "@icons-pack/react-simple-icons";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import { CodeXml, LogOut, Settings, UserRound } from "lucide-react";

import { useAuth } from "@/lib/auth";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserRound className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuLabel className="font-semibold">Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <UserRound className="text-foreground" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="text-foreground" />
          Settings
        </DropdownMenuItem>
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
        <LogoutDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutDialog() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await auth.logout();
    navigate({ to: "/" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
          variant="destructive"
        >
          <LogOut className="text-destructive" />
          Logout
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
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
