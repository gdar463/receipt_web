import ky from "ky";
import type z from "zod";

import type { loginSchema } from "../schemas/login";

import { ApiError } from "./errors";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

export async function apiLogin(
  formData: z.infer<typeof loginSchema>,
): Promise<{ token: string }> {
  const res = await ky.post(API_URL + "/auth/login", {
    json: formData,
    hooks: {
      beforeError: [
        async (error) => {
          const { response } = error;
          if (response && response.body) {
            throw new ApiError(await response.json(), response.status);
          }
          return error;
        },
      ],
    },
  });
  return res.json();
}
