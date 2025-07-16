import type { HTTPError, Options } from "ky";
import ky from "ky";

import { ApiError } from "./errors";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

const hooks = {
  hooks: {
    beforeError: [
      async (error: HTTPError<unknown>) => {
        const { response } = error;
        if (response && response.body) {
          throw new ApiError(await response.json(), response.status);
        }
        return error;
      },
    ],
  },
};

export async function get(route: string, options?: Options) {
  return ky.get(API_URL + route, {
    ...hooks,
    ...options,
  });
}

export async function post(route: string, options?: Options) {
  return ky.post(API_URL + route, {
    ...hooks,
    ...options,
  });
}

export async function httpDelete(route: string, options?: Options) {
  return ky.delete(API_URL + route, {
    ...hooks,
    ...options,
  });
}
