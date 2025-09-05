import type z from "zod";

import type { loginSchema } from "@s/auth/login";
import type { signupSchema } from "@s/auth/signup";

import type { userSchema } from "../schemas/auth";

import { httpPost } from "./wrapper";

export async function apiLogin(
  formData: z.infer<typeof loginSchema>,
): Promise<z.infer<typeof userSchema>> {
  const res = await httpPost("/auth/login", {
    json: formData,
  });
  return res.json();
}

export async function apiSignup(
  formData: z.infer<typeof signupSchema>,
): Promise<z.infer<typeof userSchema>> {
  const res = await httpPost("/auth/signup", {
    json: formData,
  });
  return res.json();
}
