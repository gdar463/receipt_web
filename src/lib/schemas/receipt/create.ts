import z from "zod";

export const createReceiptSchema = z.object({
  name: z.string(),
});

export type CreateReceiptRes = {
  id: string;
};
