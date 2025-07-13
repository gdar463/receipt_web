import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthed) {
      console.log("failed check");
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
        replace: true,
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
