import type z from "zod";

import type { loginSchema } from "@s/auth/login";
import type { ApiMeRes } from "@s/auth/me";
import type { signupSchema } from "@s/auth/signup";

import type { userSchema } from "../schemas/auth";

import { get, post } from "./wrapper";

export async function apiLogin(
  formData: z.infer<typeof loginSchema>,
): Promise<z.infer<typeof userSchema>> {
  const res = await post("/auth/login", {
    json: formData,
  });
  return res.json();
}

export async function apiSignup(
  formData: z.infer<typeof signupSchema>,
): Promise<z.infer<typeof userSchema>> {
  const res = await post("/auth/signup", {
    json: formData,
  });
  return res.json();
}

export async function apiMe(token: string): Promise<ApiMeRes> {
  const res = await get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
