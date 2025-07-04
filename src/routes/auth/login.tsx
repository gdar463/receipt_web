import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
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
import { loginSchema } from "@/lib/schemas/login";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [apiError, setError] = useState(new ApiError());
  const [_cookies, setCookie] = useCookies(["session"]);

  const mutation = useMutation({
    mutationFn: apiLogin,
    onError(error) {
      if (error instanceof ApiError) {
        setError(error as ApiError);
      }
    },
    onSuccess(data) {
      setCookie("session", data.token);
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
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
                          placeholder="password"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {mutation.isPending ? (
                  <Button disabled>Signing in...</Button>
                ) : (
                  <Button type="submit">Sign in</Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
