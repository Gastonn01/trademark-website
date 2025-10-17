// HTML templates for MCP UI components displayed in ChatGPT

export const searchResultsTemplate = (data: {
  trademark: string
  country: string
  status: string
  searchId: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 2px solid #4f46e5;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      color: #1f2937;
      font-size: 24px;
    }
    .status {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 12px;
    }
    .status.pending {
      background: #fef3c7;
      color: #92400e;
    }
    .info {
      margin: 20px 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .label {
      color: #6b7280;
      font-weight: 500;
    }
    .value {
      color: #1f2937;
      font-weight: 600;
    }
    .cta {
      margin-top: 24px;
      text-align: center;
    }
    .button {
      display: inline-block;
      background: #4f46e5;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }
    .button:hover {
      background: #4338ca;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Trademark Search Results</h1>
      <span class="status pending">${data.status}</span>
    </div>
    <div class="info">
      <div class="info-row">
        <span class="label">Trademark</span>
        <span class="value">${data.trademark}</span>
      </div>
      <div class="info-row">
        <span class="label">Country</span>
        <span class="value">${data.country}</span>
      </div>
      <div class="info-row">
        <span class="label">Search ID</span>
        <span class="value">${data.searchId}</span>
      </div>
    </div>
    <div class="cta">
      <a href="https://justprotected.com/verification?search=${data.searchId}" class="button" target="_blank">
        Complete Registration
      </a>
    </div>
  </div>
</body>
</html>
`

export const filingStatusTemplate = (data: {
  trademarkName: string
  country: string
  status: string
  email: string
  createdAt: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 2px solid #10b981;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      color: #1f2937;
      font-size: 24px;
    }
    .status {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      margin-top: 12px;
      background: #d1fae5;
      color: #065f46;
    }
    .info {
      margin: 20px 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .label {
      color: #6b7280;
      font-weight: 500;
    }
    .value {
      color: #1f2937;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Filing Status</h1>
      <span class="status">${data.status}</span>
    </div>
    <div class="info">
      <div class="info-row">
        <span class="label">Trademark</span>
        <span class="value">${data.trademarkName}</span>
      </div>
      <div class="info-row">
        <span class="label">Country</span>
        <span class="value">${data.country}</span>
      </div>
      <div class="info-row">
        <span class="label">Email</span>
        <span class="value">${data.email}</span>
      </div>
      <div class="info-row">
        <span class="label">Created</span>
        <span class="value">${new Date(data.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
</body>
</html>
`
