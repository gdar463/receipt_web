import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { AuthContext } from "@/lib/auth";

import { ThemeProvider } from "../components/themeProvider";

interface RouterContext {
  auth: AuthContext;
  devTools: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const stuff = useRouterState({ select: (s) => s.matches });
    const devActive = stuff[0].context.devTools;
    return (
      <>
        <HeadContent />
        <ThemeProvider>
          <Outlet />
          {devActive ? <TanStackRouterDevtools /> : ""}
          {devActive ? <ReactQueryDevtools initialIsOpen={false} /> : ""}
        </ThemeProvider>
      </>
    );
  },
});
