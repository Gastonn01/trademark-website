import Fastify from "fastify"
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { checkTrademark, createFiling, getFiling } from "./tools/index.js"
import { getSearchResultsTemplate, getFilingStatusTemplate } from "./templates/index.js"

export async function createApp() {
  const fastify = Fastify({
    logger: true,
  })

  // Health check endpoint
  fastify.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() }
  })

  // MCP endpoint
  fastify.post("/mcp", async (request, reply) => {
    const server = new Server(
      {
        name: "just-protected-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      },
    )

    // Register tools
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "check",
          description:
            "Check trademark availability in a specific country. Searches existing trademarks and returns availability status with pricing information.",
          inputSchema: {
            type: "object",
            properties: {
              trademark: {
                type: "string",
                description: "The trademark name or phrase to search for",
              },
              country: {
                type: "string",
                description: 'Country code (e.g., "US", "EU", "UK", "DE", "ES")',
              },
              email: {
                type: "string",
                description: "Email address to receive detailed search results",
              },
            },
            required: ["trademark", "country", "email"],
          },
        },
        {
          name: "createFiling",
          description:
            "Create a new trademark filing/registration. Initiates the trademark registration process for the specified trademark and countries.",
          inputSchema: {
            type: "object",
            properties: {
              trademark: {
                type: "string",
                description: "The trademark name to register",
              },
              countries: {
                type: "array",
                items: { type: "string" },
                description: 'Array of country codes where to register (e.g., ["US", "EU"])',
              },
              classes: {
                type: "array",
                items: { type: "number" },
                description: "NICE classification classes (1-45)",
              },
              email: {
                type: "string",
                description: "Contact email for the filing",
              },
              fullName: {
                type: "string",
                description: "Full name of the applicant",
              },
            },
            required: ["trademark", "countries", "classes", "email", "fullName"],
          },
        },
        {
          name: "getFiling",
          description:
            "Get the status and details of an existing trademark filing. Returns current status, payment information, and next steps.",
          inputSchema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "Email address associated with the filing",
              },
              searchId: {
                type: "string",
                description: "Optional search ID to look up specific filing",
              },
            },
            required: ["email"],
          },
        },
      ],
    }))

    // Handle tool calls
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        switch (name) {
          case "check": {
            const result = await checkTrademark(args as any)
            return {
              content: [
                {
                  type: "text",
                  text: result.message,
                },
              ],
              structuredContent: result.data,
              _meta: {
                htmlResource: "search-results",
              },
            }
          }

          case "createFiling": {
            const result = await createFiling(args as any)
            return {
              content: [
                {
                  type: "text",
                  text: result.message,
                },
              ],
              structuredContent: result.data,
            }
          }

          case "getFiling": {
            const result = await getFiling(args as any)
            return {
              content: [
                {
                  type: "text",
                  text: result.message,
                },
              ],
              structuredContent: result.data,
              _meta: {
                htmlResource: "filing-status",
              },
            }
          }

          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        }
      }
    })

    // Register HTML resources
    server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: "html://search-results",
          name: "Trademark Search Results",
          mimeType: "text/html",
          description: "Interactive trademark search results display",
        },
        {
          uri: "html://filing-status",
          name: "Filing Status",
          mimeType: "text/html",
          description: "Trademark filing status and details",
        },
      ],
    }))

    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params

      switch (uri) {
        case "html://search-results":
          return {
            contents: [
              {
                uri,
                mimeType: "text/html",
                text: getSearchResultsTemplate(),
              },
            ],
          }

        case "html://filing-status":
          return {
            contents: [
              {
                uri,
                mimeType: "text/html",
                text: getFilingStatusTemplate(),
              },
            ],
          }

        default:
          throw new Error(`Unknown resource: ${uri}`)
      }
    })

    // Handle the MCP request
    const transport = new StdioServerTransport()
    await server.connect(transport)

    reply.code(200).send({ status: "connected" })
  })

  return fastify
}
