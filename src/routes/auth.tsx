import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { authSearchSchema } from "@/lib/schemas/auth";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  validateSearch: zodValidator(authSearchSchema),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthed) {
      if (search.redirect) {
        throw redirect({
          to: search.redirect,
          replace: true,
        });
      } else {
        throw redirect({
          to: "/dashboard",
          replace: true,
        });
      }
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
