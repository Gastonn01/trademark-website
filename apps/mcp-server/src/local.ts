import { createApp } from "./index.js"
import { config } from "./config.js"

const start = async () => {
  try {
    const app = await createApp()
    await app.listen({ port: config.port, host: "0.0.0.0" })
    console.log(`🚀 MCP Server running on http://localhost:${config.port}`)
    console.log(`📡 MCP endpoint: http://localhost:${config.port}/mcp`)
    console.log(`💚 Health check: http://localhost:${config.port}/health`)
    console.log(`🔗 Backend URL: ${config.backendUrl}`)
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

start()
