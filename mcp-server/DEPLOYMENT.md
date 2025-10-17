# Deploying the MCP Server

## Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Navigate to MCP server directory**:
   \`\`\`bash
   cd mcp-server
   \`\`\`

3. **Deploy**:
   \`\`\`bash
   vercel
   \`\`\`

4. **Add environment variables** in Vercel dashboard:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `NEXT_PUBLIC_BASE_URL` - Your main site URL (https://justprotected.com)

5. **Get your production URL**:
   After deployment, Vercel will give you a URL like:
   `https://mcp-server-abc123.vercel.app`

6. **Your Connector URL will be**:
   `https://mcp-server-abc123.vercel.app/mcp`

## Configure in ChatGPT

1. Go to ChatGPT Settings → Connectors → Create
2. Fill in:
   - **Connector name**: Just Protected Trademark Search
   - **Description**: Search and register trademarks worldwide. Get pricing information for trademark registration in 50+ countries and submit trademark searches directly.
   - **Connector URL**: `https://your-mcp-server.vercel.app/mcp`
3. Click Create

## Testing

Test your connector with these prompts in ChatGPT:
- "Search for trademark 'Nike' in the United States"
- "How much does trademark registration cost in Germany?"
- "Check the status of my trademark search with email user@example.com"
