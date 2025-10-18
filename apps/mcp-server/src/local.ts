import { createApp } from "./index"
import { config } from "./config"

const start = async () => {
  try {
    const app = await createApp()
    const port = Number(process.env.PORT || config.port)
    await app.listen({ port, host: "0.0.0.0" })
    console.log(`🚀 MCP Server running on http://localhost:${port}`)
    console.log(`📡 MCP endpoint: http://localhost:${port}/mcp`)
    console.log(`💚 Health check: http://localhost:${port}/health`)
    console.log(`🔗 Backend URL: ${config.backendUrl}`)
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

start()
