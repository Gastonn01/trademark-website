export function getFilingStatusTemplate(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filing Status</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #1a202c;
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }
    .filing-card {
      padding: 1.5rem;
      background: #f7fafc;
      border-radius: 12px;
      margin-bottom: 1rem;
      border-left: 4px solid #48bb78;
    }
    .filing-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .filing-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
    }
    .status-badge {
      padding: 0.375rem 0.75rem;
      background: #48bb78;
      color: white;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .filing-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      font-size: 0.875rem;
    }
    .detail-item {
      color: #4a5568;
    }
    .detail-label {
      font-weight: 600;
      color: #2d3748;
    }
    .cta-button {
      display: block;
      width: 100%;
      padding: 1rem;
      background: #667eea;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📋 Your Trademark Filings</h1>
    <div id="filings-container"></div>
    <a href="https://justprotected.com/verification" class="cta-button">
      Start New Registration →
    </a>
  </div>
</body>
</html>
  `.trim()
}
