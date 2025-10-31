export const CheckSchema = {
  type: "object",
  properties: {
    mark: { type: "string", description: "The trademark to check" },
    jurisdiction: {
      type: "string",
      description: "Country/jurisdiction code (e.g., US, UK, EU)",
    },
    classes: {
      type: "array",
      items: { type: "number" },
      description: "Nice classification numbers",
    },
    email: { type: "string", description: "Contact email" },
  },
  required: ["mark", "jurisdiction", "classes", "email"],
} as const

export const CreateFilingSchema = {
  type: "object",
  properties: {
    mark: { type: "string", description: "The trademark to file" },
    jurisdiction: {
      type: "string",
      description: "Country/jurisdiction code",
    },
    owner: { type: "string", description: "Owner name/entity" },
    email: { type: "string", description: "Contact email" },
  },
  required: ["mark", "jurisdiction", "owner", "email"],
} as const

export const GetFilingSchema = {
  type: "object",
  properties: {
    filingId: { type: "string", description: "Filing ID to check" },
  },
  required: ["filingId"],
} as const

// Export all schemas for external use
export const ToolSchemas = {
  check: CheckSchema,
  createFiling: CreateFilingSchema,
  getFiling: GetFilingSchema,
}
