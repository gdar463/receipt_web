import { type LucideIcon, Settings, UserRound, X } from "lucide-react";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

import { ProfileTab } from "./settings/profile";
import { SettingsTab } from "./settings/settings";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
} from "./ui/sidebar";
import { Tabs, TabsContent } from "./ui/tabs";

export type SettingsKeys = "profile" | "settings";

const settings: {
  name: string;
  key: SettingsKeys;
  icon: LucideIcon;
  tab: () => ReactNode;
}[] = [
  {
    name: "Profile",
    key: "profile",
    icon: UserRound,
    tab: ProfileTab,
  },
  {
    name: "Settings",
    key: "settings",
    icon: Settings,
    tab: SettingsTab,
  },
];

export type SettingsState = {
  open: boolean;
  tab: SettingsKeys;
};

export function SettingsDialog({
  className,
  children,
  setOpen,
  state,
}: {
  className?: string | undefined;
  children: ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  state: {
    dialog: SettingsState;
    setDialog: Dispatch<SetStateAction<SettingsState>>;
  };
}) {
  return (
    <Dialog
      open={state.dialog.open}
      onOpenChange={(open) => {
        state.setDialog({ open, tab: state.dialog.tab });
      }}
    >
      <DialogTrigger asChild>
        <div className={className}>{children}</div>
      </DialogTrigger>
      <DialogContent
        className="[&>button]:hidden min-w-[50dvw] min-h-[70dvh] flex flex-col"
        onCloseAutoFocus={() => {}}
      >
        <DialogHeader className="items-end">
          <DialogClose
            onClick={() => {
              setOpen(false);
            }}
            className="relative left-2 bottom-2"
            asChild
          >
            <Button size="icon" variant="ghost">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <Tabs orientation="vertical" value={state.dialog.tab}>
          <SidebarProvider>
            <Sidebar className="max-h-full">
              <SidebarHeader>
                <SidebarMenu>
                  <div className="container flex h-14 items-center justify-between">
                    <span className="text-xl font-semibold mt-3 px-3 font-parkinsans">
                      Settings
                    </span>
                  </div>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                {settings.map((item) => {
                  return (
                    <Button
                      onClick={() => {
                        state.setDialog({
                          open: state.dialog.open,
                          tab: item.key,
                        });
                      }}
                      key={item.key}
                      variant="ghost"
                      className="font-dm justify-start text-base gap-2.5 mx-1.5 align-middle"
                    >
                      {<item.icon className="size-5" />}
                      {item.name}
                    </Button>
                  );
                })}
              </SidebarContent>
            </Sidebar>
            {settings.map((item) => {
              return (
                <TabsContent key={item.key} value={item.key}>
                  <item.tab />
                </TabsContent>
              );
            })}
          </SidebarProvider>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
