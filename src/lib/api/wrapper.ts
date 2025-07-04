import type { Options } from "ky";
import ky from "ky";

import { ApiError } from "./errors";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

export async function get(route: string, options?: Options) {
  return ky.get(API_URL + route, {
    ...options,
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
}

export async function post(route: string, options?: Options) {
  return ky.post(API_URL + route, {
    ...options,
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
}
