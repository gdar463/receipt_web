import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginAlert } from "@/lib/alerts/login";
import { apiLogin } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { authSearchSchema } from "@s/auth";
import { loginSchema } from "@s/auth/login";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  validateSearch: zodValidator(authSearchSchema),
  head: () => ({
    meta: [
      {
        title: "Login - Receipt Tracker",
      },
    ],
  }),
});

function RouteComponent() {
  const [apiError, setError] = useState(new ApiError());
  const auth = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate({ from: "/auth/login" });

  const mutation = useMutation({
    mutationFn: apiLogin,
    onError(error) {
      if (error instanceof ApiError) {
        setError(error as ApiError);
      }
    },
    onSuccess(data) {
      auth.login({
        ...data,
        createdAt: new Date(data.createdAt),
        googleEmail: null,
      });
      navigate({ to: redirect });
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {apiError.code !== "INVALID" ? <LoginAlert error={apiError} /> : ""}
        <Card className="gap-5">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Login</CardTitle>
            <CardAction>
              <Button size="sm" variant="secondary" asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. gdar463"
                          type="text"
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. ••••••••"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending ? true : false}
                >
                  {mutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
