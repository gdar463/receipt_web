import type z from "zod";

import type { loginSchema } from "../schemas/login";
import type { ApiMeResponse } from "../schemas/me";
import type { signupSchema } from "../schemas/signup";

import { get, post } from "./wrapper";

export async function apiLogin(
  formData: z.infer<typeof loginSchema>,
): Promise<{ token: string }> {
  const res = await post("/auth/login", {
    json: formData,
  });
  return res.json();
}

export async function apiSignup(
  formData: z.infer<typeof signupSchema>,
): Promise<{ token: string }> {
  console.log(formData);
  const res = await post("/auth/signup", {
    json: formData,
  });
  return res.json();
}

export async function apiMe(token: string): Promise<ApiMeResponse> {
  const res = await get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
