import type z from "zod";

import type { CreateReceiptRes, createReceiptSchema } from "@s/receipt/create";
import type { ListReceipt } from "@s/receipt/list";

import type { Receipt } from "../schemas/receipt";

import { get, httpDelete, post } from "./wrapper";

export async function apiList(token: string): Promise<ListReceipt[]> {
  const res = await get("/receipt", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiCreateReceipt(
  formData: z.infer<typeof createReceiptSchema>,
  token: string,
): Promise<CreateReceiptRes> {
  const res = await post("/receipt", {
    json: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiGetReceipt(
  id: string,
  token: string,
): Promise<Receipt> {
  const res = await get(`/receipt/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiDeleteReceipt(
  id: string,
  token: string,
): Promise<void> {
  await httpDelete(`/receipt/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
