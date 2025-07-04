import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";

import { Skeleton } from "@/components/ui/skeleton";
import { apiMe } from "@/lib/api/auth";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [cookies] = useCookies(["session"]);

  const query = useQuery({
    queryKey: ["apiMe", cookies.session],
    queryFn: () => apiMe(cookies.session),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {query.isSuccess ? (
        <div>{query.data.displayName}</div>
      ) : (
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      )}
    </div>
  );
}
