import z from "zod";

export const authSearchSchema = z.object({
  redirect: z.string().optional().default("/dashboard"),
});
