import type { FastifyInstance } from "fastify"
import { checkHandler } from "./check"
import { createFilingHandler } from "./create-filing"
import { getFilingHandler } from "./get-filing"

export async function registerTools(app: FastifyInstance) {
  app.post("/tools/check", checkHandler)
  app.post("/tools/createFiling", createFilingHandler)
  app.post("/tools/getFiling", getFilingHandler)
}

export { checkTrademark } from "./check.js"
export { createFiling } from "./create-filing.js"
export { getFiling } from "./get-filing.js"
