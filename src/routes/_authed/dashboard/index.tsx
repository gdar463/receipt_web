import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard - Receipt Tracker",
      },
    ],
  }),
});

function RouteComponent() {
  return <div></div>;
}
