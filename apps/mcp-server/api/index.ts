import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import { CheckSchema, CreateFilingSchema, GetFilingSchema } from "./schemas.js"

const BACKEND_URL = process.env.BACKEND_URL
const NODE_ENV = process.env.NODE_ENV || "development"

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL environment variable is required. Please set it in your Vercel project settings.")
}

console.log(`[MCP Server] Starting in ${NODE_ENV} mode`)
console.log(`[MCP Server] Backend URL: ${BACKEND_URL}`)

async function callBackend(endpoint: string, data: any) {
  const url = `${BACKEND_URL}${endpoint}`
  console.log(`[MCP Server] Calling backend: ${url}`)

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Create MCP server instance
const server = new Server(
  {
    name: "just-protected-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "check",
        description: "Check trademark availability with free lawyer review",
        inputSchema: CheckSchema,
      },
      {
        name: "createFiling",
        description: "Create a trademark filing application",
        inputSchema: CreateFilingSchema,
      },
      {
        name: "getFiling",
        description: "Get status of a trademark filing",
        inputSchema: GetFilingSchema,
      },
    ],
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    let data
    switch (name) {
      case "check":
        data = await callBackend("/api/submit-free-search", args)
        break
      case "createFiling":
        data = await callBackend("/api/create-filing", args)
        break
      case "getFiling":
        data = await callBackend("/api/filing-status", args)
        break
      default:
        throw new Error(`Unknown tool: ${name}`)
    }

    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ],
      isError: true,
    }
  }
})

// Vercel serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[MCP Server] ${req.method} ${req.url}`)

  if (req.url === "/health") {
    return res.status(200).json({ ok: true, backend: BACKEND_URL, env: NODE_ENV })
  }

  if (req.url?.startsWith("/tools/")) {
    const toolName = req.url.split("/tools/")[1]

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    try {
      let data
      switch (toolName) {
        case "check":
          data = await callBackend("/api/submit-free-search", req.body)
          break
        case "create-filing":
          data = await callBackend("/api/create-filing", req.body)
          break
        case "get-filing":
          data = await callBackend("/api/filing-status", req.body)
          break
        default:
          return res.status(404).json({ error: "Tool not found" })
      }
      return res.status(200).json(data)
    } catch (error) {
      console.error(`[MCP Server] Tool error:`, error)
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  if (req.url === "/mcp" || req.url?.startsWith("/mcp")) {
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    try {
      // Create SSE transport for this request
      const transport = new SSEServerTransport("/mcp", res)

      // Connect server to transport
      await server.connect(transport)

      // Handle the request
      if (req.method === "GET") {
        // SSE endpoint - keep connection open
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
      } else {
        // POST endpoint - handle message
        await transport.handlePostMessage(req.body, res)
      }
    } catch (error) {
      console.error(`[MCP Server] MCP protocol error:`, error)
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  } else {
    return res.status(404).json({
      error: "Not found",
      availableEndpoints: ["/mcp", "/health", "/tools/check", "/tools/create-filing", "/tools/get-filing"],
    })
  }
}
