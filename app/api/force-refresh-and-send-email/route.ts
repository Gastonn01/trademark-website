import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"
import { Resend } from "resend"

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    console.log("=== FORCE REFRESH EMAIL DEBUG ===")
    console.log("Search ID:", searchId)
    console.log("Recipient:", recipientEmail)

    // First, get fresh data from the database
    const freshSearchData = await getSearchData(searchId)

    if (!freshSearchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    console.log("Fresh search data retrieved:", JSON.stringify(freshSearchData, null, 2))

    // Generate the verification URL
    const baseUrl = "https://justprotected.com"
    const verificationUrl = `${baseUrl}/verification?search_id=${searchId}`

    // Create a comprehensive email with REAL analysis data
    const emailContent = generateComprehensiveEmail(freshSearchData, customMessage, verificationUrl, searchId)

    // Send the email
    try {
      const { data, error } = await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [recipientEmail],
        subject: "Your Comprehensive Trademark Analysis Results",
        html: emailContent,
      })

      if (error) {
        console.error("Error sending email with Resend:", error)
        return NextResponse.json({
          success: false,
          error: error.message,
        })
      }

      console.log("Email sent successfully:", data)
      return NextResponse.json({
        success: true,
        message: "Email sent successfully with fresh data",
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending email:", emailError)
      return NextResponse.json({
        success: false,
        error: "Failed to send email",
      })
    }
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        error: "Error processing request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

function generateComprehensiveEmail(
  searchData: any,
  customMessage: string | undefined,
  verificationUrl: string,
  searchId: string,
): string {
  console.log("=== EMAIL GENERATION WITH FRESH DATA ===")
  console.log("searchData structure:", JSON.stringify(searchData, null, 2))

  // Extract ALL possible data sources
  const trademarkName =
    searchData.search_results?.trademarkName ||
    searchData.search_data?.trademarkName ||
    searchData.trademark_name ||
    "Your Trademark"

  const clientGoods =
    searchData.search_results?.goodsAndServices ||
    searchData.search_data?.goodsAndServices ||
    searchData.search_data?.description ||
    "Your goods and services"

  const clientName =
    searchData.search_results?.name ||
    searchData.search_data?.name ||
    searchData.search_data?.firstName ||
    "Valued Client"

  // Extract analysis data
  const exactMatch = searchData.search_results?.exactMatch || "no"
  const similarCount = Number.parseInt(searchData.search_results?.similarCount || "0")
  const trademarkStrength = searchData.search_results?.trademarkStrength || ""
  const riskLevel = searchData.search_results?.riskLevel || ""
  const conflictingMarks = searchData.search_results?.conflictingMarks || ""
  const classesAnalysis = searchData.search_results?.classesAnalysis || ""
  const geographicAnalysis = searchData.search_results?.geographicAnalysis || ""
  const detailedSummary = searchData.search_results?.detailedSummary || ""
  const recommendations = searchData.search_results?.recommendations || ""
  const nextSteps = searchData.search_results?.nextSteps || ""

  console.log("Extracted data:", {
    trademarkName,
    clientGoods,
    exactMatch,
    similarCount,
    trademarkStrength,
    riskLevel,
    hasDetailedSummary: !!detailedSummary,
    hasRecommendations: !!recommendations,
    hasConflictingMarks: !!conflictingMarks,
  })

  // Generate analysis sections
  let analysisContent = ""

  // If we have detailed analysis, use it
  if (detailedSummary || recommendations || trademarkStrength || riskLevel || conflictingMarks) {
    console.log("Using detailed analysis data")

    // Executive Summary
    if (detailedSummary) {
      analysisContent += `
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 700; margin-bottom: 12px;">📋 Executive Summary</h3>
          <div style="color: #0369a1; line-height: 1.6; margin: 0; white-space: pre-line;">${detailedSummary}</div>
        </div>
      `
    }

    // Exact Match Analysis
    analysisContent += `
      <div style="background-color: ${exactMatch === "yes" ? "#fee2e2" : "#dcfce7"}; border-left: 4px solid ${exactMatch === "yes" ? "#dc2626" : "#16a34a"}; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: ${exactMatch === "yes" ? "#991b1b" : "#166534"}; font-size: 18px; font-weight: 700; margin-bottom: 12px;">
          ${exactMatch === "yes" ? "🚨" : "✅"} Exact Match Analysis
        </h3>
        <p style="color: ${exactMatch === "yes" ? "#991b1b" : "#166534"}; line-height: 1.6; margin: 0;">
          ${
            exactMatch === "yes"
              ? `<strong>EXACT MATCH FOUND:</strong> We identified an exact or nearly identical trademark already registered for "${trademarkName}".`
              : `<strong>NO EXACT MATCH:</strong> We did not find any exact matches for "${trademarkName}" in our comprehensive database search.`
          }
        </p>
      </div>
    `

    // Similar Trademarks
    if (similarCount > 0) {
      analysisContent += `
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #92400e; font-size: 18px; font-weight: 700; margin-bottom: 12px;">⚠️ Similar Trademarks Found</h3>
          <p style="color: #92400e; line-height: 1.6; margin-bottom: 12px;">
            <strong>Number of Similar Marks:</strong> ${similarCount} potentially conflicting trademark${similarCount > 1 ? "s" : ""} identified
          </p>
          ${
            conflictingMarks
              ? `
            <div style="background-color: rgba(255, 255, 255, 0.7); padding: 15px; border-radius: 6px; margin-top: 12px;">
              <h4 style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Specific Conflicting Marks:</h4>
              <div style="color: #92400e; line-height: 1.6; margin: 0; white-space: pre-line;">${conflictingMarks}</div>
            </div>
          `
              : ""
          }
        </div>
      `
    }

    // Trademark Strength
    if (trademarkStrength) {
      const strengthConfig = {
        "very-strong": { color: "#166534", bg: "#dcfce7", icon: "🛡️", label: "Very Strong" },
        strong: { color: "#166534", bg: "#dcfce7", icon: "💪", label: "Strong" },
        moderate: { color: "#0369a1", bg: "#dbeafe", icon: "⚖️", label: "Moderate" },
        weak: { color: "#92400e", bg: "#fef3c7", icon: "⚠️", label: "Weak" },
        "very-weak": { color: "#991b1b", bg: "#fee2e2", icon: "🚨", label: "Very Weak" },
      }

      const config = strengthConfig[trademarkStrength as keyof typeof strengthConfig] || strengthConfig["moderate"]

      analysisContent += `
        <div style="background: linear-gradient(135deg, ${config.bg} 0%, ${config.bg}dd 100%); border-left: 4px solid ${config.color}; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: ${config.color}; font-size: 18px; font-weight: 700; margin-bottom: 12px;">
            ${config.icon} Trademark Strength Assessment: ${config.label}
          </h3>
          <p style="color: ${config.color}; line-height: 1.6; margin: 0;">
            Your trademark "${trademarkName}" has been assessed as having ${config.label.toLowerCase()} distinctiveness based on our comprehensive analysis.
          </p>
        </div>
      `
    }

    // Risk Level
    if (riskLevel) {
      const riskConfig = {
        low: { color: "#166534", bg: "#dcfce7", icon: "🟢", label: "Low Risk" },
        moderate: { color: "#0369a1", bg: "#dbeafe", icon: "🟡", label: "Moderate Risk" },
        high: { color: "#dc2626", bg: "#fee2e2", icon: "🟠", label: "High Risk" },
        "very-high": { color: "#991b1b", bg: "#fee2e2", icon: "🔴", label: "Very High Risk" },
      }

      const config = riskConfig[riskLevel as keyof typeof riskConfig] || riskConfig["moderate"]

      analysisContent += `
        <div style="background: linear-gradient(135deg, ${config.bg} 0%, ${config.bg}dd 100%); border-left: 4px solid ${config.color}; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: ${config.color}; font-size: 18px; font-weight: 700; margin-bottom: 12px;">
            ${config.icon} Registration Risk Assessment: ${config.label}
          </h3>
          <p style="color: ${config.color}; line-height: 1.6; margin: 0;">
            Based on our analysis, your trademark application has been classified as ${config.label.toLowerCase()} for registration success.
          </p>
        </div>
      `
    }

    // Classes Analysis
    if (classesAnalysis) {
      analysisContent += `
        <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-left: 4px solid #9333ea; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #6b21a8; font-size: 18px; font-weight: 700; margin-bottom: 12px;">📊 Goods & Services Classification Analysis</h3>
          <div style="background-color: rgba(255, 255, 255, 0.7); padding: 15px; border-radius: 6px;">
            <div style="color: #6b21a8; line-height: 1.6; margin: 0; white-space: pre-line;">${classesAnalysis}</div>
          </div>
        </div>
      `
    }

    // Geographic Analysis
    if (geographicAnalysis) {
      analysisContent += `
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #047857; font-size: 18px; font-weight: 700; margin-bottom: 12px;">🌍 Geographic Availability Analysis</h3>
          <div style="background-color: rgba(255, 255, 255, 0.7); padding: 15px; border-radius: 6px;">
            <div style="color: #047857; line-height: 1.6; margin: 0; white-space: pre-line;">${geographicAnalysis}</div>
          </div>
        </div>
      `
    }
  } else {
    // Fallback content
    console.log("Using fallback content - no detailed analysis found")
    analysisContent = `
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 700; margin-bottom: 12px;">📋 Professional Trademark Search Results</h3>
        <p style="color: #0369a1; line-height: 1.6; margin: 0;">
          We have completed a comprehensive trademark search for "${trademarkName}". Our analysis includes searches across multiple trademark databases to identify potential conflicts and assess registration prospects.
        </p>
      </div>
    `
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Comprehensive Trademark Analysis</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; }
        .container { max-width: 700px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center; }
        .header h1 { color: white; font-size: 28px; font-weight: 700; margin: 0; }
        .header p { color: #dbeafe; font-size: 16px; margin-top: 8px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1f2937; margin-bottom: 24px; }
        .info-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin: 8px 0; }
        .info-label { font-weight: 600; color: #4b5563; }
        .info-value { color: #1f2937; }
        .section { margin: 32px 0; }
        .section-title { font-size: 22px; font-weight: 700; color: #1f2937; margin-bottom: 16px; }
        .cta-container { text-align: center; margin: 40px 0; padding: 32px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; border: 1px solid #0ea5e9; }
        .cta-title { font-size: 22px; font-weight: 700; color: #0c4a6e; margin-bottom: 12px; }
        .cta-description { color: #0369a1; margin-bottom: 24px; font-size: 16px; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
        .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { font-size: 14px; color: #6b7280; margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛡️ Comprehensive Trademark Analysis</h1>
          <p>Professional trademark search results and strategic recommendations</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear ${clientName},
          </div>
          
          <p style="margin-bottom: 24px; font-size: 16px; color: #4b5563;">
            Thank you for choosing Just Protected for your trademark analysis. We have completed our comprehensive search and professional assessment of your trademark "${trademarkName}". Below you'll find our detailed findings and strategic recommendations.
          </p>
          
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Trademark Name:</span>
              <span class="info-value"><strong>${trademarkName}</strong></span>
            </div>
            <div class="info-row">
              <span class="info-label">Goods/Services:</span>
              <span class="info-value">${clientGoods}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Search ID:</span>
              <span class="info-value" style="font-family: monospace; font-size: 12px;">${searchId}</span>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Detailed Trademark Analysis</h2>
            ${analysisContent}
          </div>

          ${
            recommendations
              ? `
          <div class="section">
            <h2 class="section-title">Strategic Recommendations</h2>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
              <div style="white-space: pre-line; line-height: 1.6;">${recommendations}</div>
            </div>
          </div>
          `
              : ""
          }

          ${
            nextSteps
              ? `
          <div class="section">
            <h2 class="section-title">Next Steps</h2>
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
              <div style="white-space: pre-line; line-height: 1.6;">${nextSteps}</div>
            </div>
          </div>
          `
              : ""
          }

          ${
            customMessage
              ? `
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0; border-radius: 8px;">
            <h3 style="color: #92400e; font-size: 18px; font-weight: 600; margin-bottom: 8px;">📝 Personal Message from Your Trademark Specialist</h3>
            <p style="color: #92400e; line-height: 1.6;">${customMessage}</p>
          </div>
          `
              : ""
          }

          <div class="cta-container">
            <div class="cta-title">🚀 Ready to Proceed?</div>
            <div class="cta-description">
              Access your complete analysis and start your trademark registration process
            </div>
            <a href="${verificationUrl}" class="cta-button">
              View Complete Analysis & Register
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Just Protected</strong> - Professional Trademark Services</p>
          <p>&copy; ${new Date().getFullYear()} Just Protected. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
