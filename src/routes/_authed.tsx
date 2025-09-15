import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { apiRefresh } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthed) {
      if (!context.auth.user) {
        throw redirect({
          to: "/auth/login",
          search: {
            redirect: location.href,
          },
          replace: true,
        });
      }
      try {
        const res = await apiRefresh(context.auth.user.token);
        await context.auth.login({ ...context.auth.user, token: res.token });
      } catch (err) {
        if (err instanceof ApiError && err.code === "InvalidToken") {
          await context.auth.logout();
          throw redirect({
            to: "/auth/login",
            search: {
              redirect: location.href,
            },
            replace: true,
          });
        }
        throw err;
      }
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
