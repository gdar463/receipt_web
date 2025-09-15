import type { AuthUrlResponse, StatusResponse } from "@s/google";

import { httpGet, httpPost } from "./wrapper";

export async function apiStatus(token: string): Promise<StatusResponse> {
  const res = await httpGet("/google/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiAuthUrl(token: string): Promise<AuthUrlResponse> {
  const res = await httpGet("/google/auth-url", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiUnlink(token: string): Promise<void> {
  await httpPost("/google/unlink", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
