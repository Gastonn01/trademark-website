export function getSearchResultsTemplate(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trademark Search Results</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      color: #1a202c;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }
    .status {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #edf2f7;
      border-radius: 8px;
      font-size: 0.875rem;
      color: #4a5568;
      margin-bottom: 1.5rem;
    }
    .info-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .info-item {
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .info-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #718096;
      margin-bottom: 0.25rem;
    }
    .info-value {
      font-size: 1.125rem;
      color: #1a202c;
      font-weight: 600;
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
      transition: background 0.2s;
    }
    .cta-button:hover {
      background: #5a67d8;
    }
    .note {
      margin-top: 1rem;
      padding: 1rem;
      background: #fffaf0;
      border-radius: 8px;
      font-size: 0.875rem;
      color: #744210;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Trademark Search Submitted</h1>
    <div class="status">⏳ Search in Progress</div>
    
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Trademark</div>
        <div class="info-value" data-field="trademark"></div>
      </div>
      <div class="info-item">
        <div class="info-label">Country</div>
        <div class="info-value" data-field="country"></div>
      </div>
      <div class="info-item">
        <div class="info-label">Estimated Time</div>
        <div class="info-value" data-field="estimatedTime"></div>
      </div>
    </div>

    <a href="https://justprotected.com/verification" class="cta-button">
      Start Registration Now →
    </a>

    <div class="note">
      📧 Detailed results will be sent to your email within 24-48 hours.
    </div>
  </div>
</body>
</html>
  `.trim()
}
