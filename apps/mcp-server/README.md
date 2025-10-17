# Just Protected MCP Server

Model Context Protocol server for Just Protected trademark services. Exposes trademark search and filing tools to ChatGPT.

## Features

- **check** - Search trademark availability in 50+ countries
- **createFiling** - Initiate trademark registration process
- **getFiling** - Check status of existing filings

## Setup

### 1. Install Dependencies

\`\`\`bash
cd apps/mcp-server
npm install
\`\`\`

### 2. Configure Environment

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env`:
\`\`\`env
PORT=3001
BACKEND_URL=https://justprotected.com
NODE_ENV=development
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Server runs on `http://localhost:3001`

## Deployment Options

### Option 1: Vercel Serverless (Recommended)

\`\`\`bash
cd apps/mcp-server
vercel
\`\`\`

Your connector URL will be: `https://your-project.vercel.app/mcp`

### Option 2: Local Testing with ngrok

\`\`\`bash
# Terminal 1: Run server
npm run dev

# Terminal 2: Expose with ngrok
ngrok http 3001
\`\`\`

Use the ngrok URL in ChatGPT: `https://abc123.ngrok.app/mcp`

### Option 3: Railway

\`\`\`bash
railway login
railway init
railway up
\`\`\`

### Option 4: Render

1. Connect your GitHub repo
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Add environment variables

## ChatGPT Integration

1. Go to ChatGPT Settings → Connectors → Create
2. Fill in:
   - **Name**: Just Protected Trademark Search
   - **Description**: Search and register trademarks worldwide. Check availability, get pricing for 50+ countries, and initiate registration.
   - **URL**: `https://your-domain.com/mcp`
3. Click Create

## API Endpoints

- `GET /health` - Health check
- `POST /mcp` - MCP protocol endpoint

## Tools

### check
Search trademark availability
\`\`\`json
{
  "trademark": "MyBrand",
  "country": "US",
  "email": "user@example.com"
}
\`\`\`

### createFiling
Create trademark registration
\`\`\`json
{
  "trademark": "MyBrand",
  "countries": ["US", "EU"],
  "classes": [9, 42],
  "email": "user@example.com",
  "fullName": "John Doe"
}
\`\`\`

### getFiling
Get filing status
\`\`\`json
{
  "email": "user@example.com",
  "searchId": "optional-id"
}
\`\`\`

## Development

\`\`\`bash
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm start          # Run production build
npm run typecheck  # Type checking
\`\`\`

## License

Proprietary - Just Protected
