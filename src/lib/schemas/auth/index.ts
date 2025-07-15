import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  email: z.string(),
  createdAt: z.number(),
  token: z.string(),
});

export const authSearchSchema = z.object({
  redirect: z.string().optional().default("/dashboard"),
});
