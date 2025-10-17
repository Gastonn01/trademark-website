import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const configSchema = z.object({
  port: z.coerce.number().default(3001),
  backendUrl: z.string().url(),
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
})

export const config = configSchema.parse({
  port: process.env.PORT,
  backendUrl: process.env.BACKEND_URL,
  nodeEnv: process.env.NODE_ENV,
})
