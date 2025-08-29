import type z from "zod";

import type { CreateReceiptRes, createReceiptSchema } from "@s/receipt/create";
import type { ListReceipt } from "@s/receipt/list";

import type { Receipt } from "../schemas/receipt";

import { httpDelete, httpGet, httpPost } from "./wrapper";

export async function apiList(token: string): Promise<ListReceipt[]> {
  const res = await httpGet("/receipt", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function apiCreateReceipt(data: {
  formData: z.infer<typeof createReceiptSchema>;
  token: string;
}): Promise<CreateReceiptRes> {
  const res = await httpPost("/receipt", {
    json: data.formData,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return res.json();
}

export async function apiGetReceipt(data: {
  id: string;
  token: string;
}): Promise<Receipt> {
  const res = await httpGet(`/receipt/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return res.json();
}

export async function apiDeleteReceipt(data: {
  id: string;
  token: string;
}): Promise<void> {
  await httpDelete(`/receipt/${data.id}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
}
