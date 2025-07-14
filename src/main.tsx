import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource/parkinsans/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";

import "./index.css";
import { AuthProvider, useAuth } from "./lib/auth";
import { SettingsProvider, useSettings } from "./lib/settings";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
});

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    settings: undefined!,
    devTools: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  const settings = useSettings();
  const devActive = localStorage.getItem("receipts.dev");

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{ auth, settings, devTools: !!devActive }}
      />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <InnerApp />
      </SettingsProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>,
);
