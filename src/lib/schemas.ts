import * as z from "zod";

export const todoSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
  status: z.enum(['Pending', 'Done'])
});