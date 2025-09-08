import { skipToken, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarFold,
  CircleAlert,
  Hash,
  History,
  Image,
  TextCursor,
} from "lucide-react";
import { DateTime } from "luxon";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type Body, apiGetScan } from "@/lib/api/components/scan";
import { ApiError } from "@/lib/api/errors";
import { apiGetReceipt } from "@/lib/api/receipts";
import { useAuth } from "@/lib/auth";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/_authed/dashboard/receipt/$id")({
  component: RouteComponent,
  loader: async ({ params, context: { auth } }) => {
    return apiGetReceipt({ id: params.id, token: auth.user?.token! });
  },
  staleTime: 600_000,
});

function RouteComponent() {
  const auth = useAuth();
  const settings = useSettings();
  const receipt = Route.useLoaderData();

  const creationTime = DateTime.fromJSDate(new Date(receipt.createdAt), {
    zone: settings.options?.dateLocale.key,
  }).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const lastUpdateTime = DateTime.fromJSDate(new Date(receipt.updatedAt), {
    zone: settings.options?.dateLocale.key,
  }).toLocaleString({
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const scan = receipt.components.find((val) => {
    if (val.type === "scan") return val;
  });

  const {
    data: res,
    isSuccess,
    isError,
    error,
  } = useQuery<Body, ApiError, Body, string[]>({
    queryKey: ["scan", receipt.id],
    queryFn:
      scan == undefined
        ? skipToken
        : async () => {
            return await apiGetScan({
              id: receipt.id,
              token: auth.user?.token!,
            });
          },
    staleTime: 600_000,
  });

  return (
    <div className="flex flex-col m-6 px-[5px] gap-2">
      <span className="text-2xl font-bold">Receipt Details</span>
      <div className="min-h-full flex flex-row">
        <div className="flex items-center mr-8">
          {scan == undefined ? (
            <div className="h-[48rem] w-[32rem] flex items-center justify-center border-2 rounded-md border-accent border-dashed">
              <Image className="size-16" />
            </div>
          ) : isError ? (
            error.code === "GoogleInvalidGrant" ? (
              <div className="h-[48rem] w-[32rem] gap-2 flex items-center justify-center flex-col border-2 rounded-md border-destructive border-dashed">
                <CircleAlert className="size-14 text-destructive" />
                <div className="text-destructive text-center max-w-[15lvw]">
                  There was a problem with contacting Google, please unlink and
                  relink your Google account.
                  <div>Contact support if problem persists.</div>
                </div>
              </div>
            ) : (
              <div>{error.code}</div>
            )
          ) : !isSuccess ? (
            <Skeleton className="h-[48rem] w-[32rem]" />
          ) : (
            <img
              className="h-[48rem] w-[32rem] rounded-md"
              src={`data:${res!.mime};base64,${btoa(res!.data)}`}
            />
          )}
        </div>
        <ScrollArea className="grow">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 grid-flow-col">
            <div className="flex flex-row items-center gap-2">
              <TextCursor />
              <div>
                <p className="text-xs text-gray-400 uppercase">Receipt Name</p>
                <p className="font-semibold">{receipt.name}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Hash />
              <div>
                <p className="text-xs text-gray-400 uppercase">Receipt ID</p>
                <p className="font-semibold">{receipt.id}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <CalendarFold />
              <div>
                <p className="text-xs text-gray-400 uppercase">Creation Time</p>
                <p className="font-semibold">{creationTime}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <History />
              <div>
                <p className="text-xs text-gray-400 uppercase">
                  Last Update Time
                </p>
                <p className="font-semibold">{lastUpdateTime}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
