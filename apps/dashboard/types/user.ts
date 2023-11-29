import { z } from "zod"

export const userSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  isCaptain: z.boolean(),
})

export const userWithoutIdSchema = userSchema.omit({ _id: true })

export type User = z.infer<typeof userSchema>
export type NewUser = z.infer<typeof userWithoutIdSchema>
