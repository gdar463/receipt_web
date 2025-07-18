import { createFileRoute } from "@tanstack/react-router";
import { CalendarFold, Hash, History, Image, TextCursor } from "lucide-react";
import { DateTime } from "luxon";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { apiGetReceipt } from "@/lib/api/receipts";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/_authed/dashboard/receipt/$id")({
  component: RouteComponent,
  loader: async ({ params, context: { auth } }) => {
    return apiGetReceipt({ id: params.id, token: auth.user?.token! });
  },
  staleTime: 600_000,
});

function RouteComponent() {
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

  return (
    <div className="flex flex-col m-6 px-[5px] gap-2">
      <span className="text-2xl font-bold">Receipt Details</span>
      <div className="min-h-full flex flex-row">
        <div className="flex items-center mr-8">
          {scan == undefined ? (
            <div className="h-[48rem] w-[32rem] flex items-center justify-center border-2 rounded-md border-accent border-dashed">
              <Image className="size-16" />
            </div>
          ) : (
            <Skeleton className="h-[48rem] w-[32rem]" />
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
