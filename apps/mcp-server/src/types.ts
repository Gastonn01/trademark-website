import { z } from "zod"

export const FeesSchema = z.object({
  official: z.number(),
  service: z.number(),
})

export const CheckResponseSchema = z.object({
  risk: z.string(),
  fees: FeesSchema,
  timeline: z.string(),
  guideUrl: z.string().optional(),
})
export type CheckResponse = z.infer<typeof CheckResponseSchema>

export const CreateFilingResponseSchema = z.object({
  filingId: z.string(),
  paymentUrl: z.string().url(),
})
export type CreateFilingResponse = z.infer<typeof CreateFilingResponseSchema>

export const FilingHistoryItemSchema = z.object({
  date: z.string(),
  event: z.string(),
})

export const GetFilingResponseSchema = z.object({
  status: z.string(),
  nextStep: z.string().optional(),
  eta: z.string().optional(),
  history: z.array(FilingHistoryItemSchema).optional(),
})
export type GetFilingResponse = z.infer<typeof GetFilingResponseSchema>
