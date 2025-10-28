export function searchResultsTemplate(data?: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trademark Search Results</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
    }
    .status.available {
      background: #d4edda;
      color: #155724;
    }
    .status.unavailable {
      background: #f8d7da;
      color: #721c24;
    }
    .price {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
      margin: 16px 0;
    }
    .cta {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Trademark Search Results</h1>
    ${
      data
        ? `
      <p><strong>Trademark:</strong> ${data.trademark || "N/A"}</p>
      <p><strong>Country:</strong> ${data.country || "N/A"}</p>
      <p class="status ${data.available ? "available" : "unavailable"}">
        ${data.available ? "Available" : "Not Available"}
      </p>
      ${data.price ? `<div class="price">$${data.price} USD</div>` : ""}
      <p>Detailed results have been sent to your email.</p>
      <a href="https://justprotected.com/verification" class="cta">Start Registration</a>
    `
        : "<p>Loading search results...</p>"
    }
  </div>
</body>
</html>
  `.trim()
}

export function filingStatusTemplate(data?: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filing Status</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      margin: 8px 0;
    }
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    .status-paid {
      background: #d4edda;
      color: #155724;
    }
    .status-processing {
      background: #d1ecf1;
      color: #0c5460;
    }
    .cta {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Trademark Filing Status</h1>
    ${
      data
        ? `
      <p><strong>Filing ID:</strong> ${data.id || "N/A"}</p>
      <p><strong>Trademark:</strong> ${data.trademark || "N/A"}</p>
      <p><strong>Status:</strong> <span class="status-badge status-${data.status || "pending"}">${data.status || "Pending"}</span></p>
      ${data.countries ? `<p><strong>Countries:</strong> ${data.countries.join(", ")}</p>` : ""}
      ${data.totalPrice ? `<p><strong>Total Price:</strong> $${data.totalPrice} USD</p>` : ""}
      <p><strong>Next Steps:</strong> ${data.nextSteps || "We will contact you via email with updates."}</p>
      <a href="https://justprotected.com/verification" class="cta">View Full Details</a>
    `
        : "<p>Loading filing status...</p>"
    }
  </div>
</body>
</html>
  `.trim()
}
