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
import { SignupAlert } from "@/lib/alerts/signup";
import { apiSignup } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth";
import { authSearchSchema } from "@s/auth";
import { signupSchema } from "@s/auth/signup";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
  validateSearch: zodValidator(authSearchSchema),
  head: () => ({
    meta: [
      {
        title: "Signup - Receipt Tracker",
      },
    ],
  }),
});

function RouteComponent() {
  const [apiError, setError] = useState(new ApiError());
  const auth = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate({ from: "/auth/signup" });

  const mutation = useMutation({
    mutationFn: apiSignup,
    onError(error) {
      if (error instanceof ApiError) {
        setError(error as ApiError);
      }
    },
    onSuccess(data) {
      auth.login({ ...data, createdAt: new Date(data.createdAt) });
      navigate({ to: redirect });
    },
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {mutation.error ? JSON.stringify(mutation.error) : ""}
        {apiError.code !== "INVALID" ? <SignupAlert error={apiError} /> : ""}
        <Card className="gap-5">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Register</CardTitle>
            <CardAction>
              <Button size="sm" variant="secondary" asChild>
                <Link to="/auth/login">Sign In</Link>
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
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Dario"
                          type="text"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. gdar463@gmail.com"
                          type="email"
                          autoComplete="email"
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
                          autoComplete="new-password"
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
                  {mutation.isPending ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
