import { Outlet, createRootRoute } from "@tanstack/react-router";

import { ThemeProvider } from "../components/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
