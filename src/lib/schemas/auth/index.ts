import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  token: z.string(),
});

export const authSearchSchema = z.object({
  redirect: z.string().optional().default("/dashboard"),
});
