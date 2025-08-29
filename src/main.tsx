import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource/parkinsans/index.css";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
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
      staleTime: 30_000,
      gcTime: 60_000 * 60 * 24 * 7,
      retry: false,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: localStorage,
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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider
        router={router}
        context={{ auth, settings, devTools: !!devActive }}
      />
    </PersistQueryClientProvider>
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
