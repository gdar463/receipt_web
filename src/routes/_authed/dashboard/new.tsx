import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiCreateReceipt } from "@/lib/api/receipts";
import { useAuth } from "@/lib/auth";
import { createReceiptSchema } from "@/lib/schemas/receipt/create";

export const Route = createFileRoute("/_authed/dashboard/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate({ from: "/dashboard/new" });

  const mutation = useMutation({
    mutationFn: apiCreateReceipt,
    onSuccess(data) {
      navigate({ to: "/dashboard/receipt/" + data.id });
    },
  });

  const form = useForm<z.infer<typeof createReceiptSchema>>({
    resolver: zodResolver(createReceiptSchema),
  });

  function onSubmit(values: z.infer<typeof createReceiptSchema>) {
    mutation.mutate({ formData: values, token: auth.user?.token! });
  }

  return (
    <div className="m-5 pl-[5px] align-top">
      <span className="font-parkinsans text-2xl font-bold">New Receipt</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center flex-row gap-4">
                <div className="flex flex-col">
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormDescription>The name for the receipt</FormDescription>
                </div>
                <FormControl>
                  <Input
                    placeholder="e.g. Fantasy Books"
                    type="text"
                    className="max-w-xs"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="max-w-[8rem]"
            disabled={mutation.isPending ? true : false}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
