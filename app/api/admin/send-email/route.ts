import { NextResponse } from "next/server"
import { getSearchData } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId, recipientEmail, customMessage, searchData } = body

    if (!searchId || !recipientEmail) {
      return NextResponse.json({ error: "Search ID and recipient email are required" }, { status: 400 })
    }

    console.log("=== EMAIL SEND DEBUG ===")
    console.log("Search ID:", searchId)
    console.log("Recipient:", recipientEmail)
    console.log("Provided searchData:", JSON.stringify(searchData, null, 2))

    // Get fresh data from database
    let finalSearchData = searchData
    if (!finalSearchData) {
      finalSearchData = await getSearchData(searchId)
    }

    if (!finalSearchData) {
      return NextResponse.json({ error: "Search data not found" }, { status: 404 })
    }

    console.log("Final search data for email:", JSON.stringify(finalSearchData, null, 2))

    // Generate the verification URL
    const baseUrl = "https://justprotected.com"
    const verificationUrl = `${baseUrl}/verification?search_id=${searchId}`

    // Create comprehensive email with ALL analysis data
    const emailContent = generateComprehensiveAnalysisEmail(finalSearchData, customMessage, verificationUrl, searchId)

    // Send the email
    try {
      const { data, error } = await resend.emails.send({
        from: "Just Protected <noreply@justprotected.com>",
        to: [recipientEmail],
        subject: "Your Complete Trademark Analysis Results",
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
        message: "Email sent successfully",
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

function generateComprehensiveAnalysisEmail(
  searchData: any,
  customMessage: string | undefined,
  verificationUrl: string,
  searchId: string,
): string {
  console.log("=== EMAIL GENERATION WITH COMPLETE ANALYSIS ===")
  console.log("searchData structure:", JSON.stringify(searchData, null, 2))

  // Extract data from multiple possible sources
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

  // Extract ALL analysis data
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

  console.log("Extracted analysis data:", {
    trademarkName,
    exactMatch,
    similarCount,
    trademarkStrength,
    riskLevel,
    hasDetailedSummary: !!detailedSummary,
    hasRecommendations: !!recommendations,
    hasConflictingMarks: !!conflictingMarks,
  })

  // Calculate registration recommendation percentage
  let registrationPercentage = 50 // Default
  if (riskLevel === "low") registrationPercentage = 85
  else if (riskLevel === "moderate") registrationPercentage = 65
  else if (riskLevel === "high") registrationPercentage = 35
  else if (riskLevel === "very-high") registrationPercentage = 15

  // Generate analysis content with REAL data
  let analysisContent = ""

  // Executive Summary (if available)
  if (detailedSummary) {
    analysisContent += `
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 700; margin-bottom: 12px;">📋 Executive Summary</h3>
        <div style="color: #0369a1; line-height: 1.6; margin: 0; white-space: pre-line;">${detailedSummary}</div>
      </div>
    `
  }

  // Registration Recommendation Percentage
  const percentageColor =
    registrationPercentage >= 70 ? "#16a34a" : registrationPercentage >= 50 ? "#f59e0b" : "#dc2626"
  const percentageBg = registrationPercentage >= 70 ? "#dcfce7" : registrationPercentage >= 50 ? "#fef3c7" : "#fee2e2"

  analysisContent += `
    <div style="background: linear-gradient(135deg, ${percentageBg} 0%, ${percentageBg}dd 100%); border-left: 4px solid ${percentageColor}; padding: 20px; margin: 20px 0; border-radius: 8px;">
      <h3 style="color: ${percentageColor}; font-size: 18px; font-weight: 700; margin-bottom: 12px;">🎯 Registration Recommendation</h3>
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <div style="font-size: 32px; font-weight: 800; color: ${percentageColor}; margin-right: 12px;">${registrationPercentage}%</div>
        <div style="color: ${percentageColor}; font-weight: 600;">
          ${registrationPercentage >= 70 ? "RECOMMENDED TO PROCEED" : registrationPercentage >= 50 ? "PROCEED WITH CAUTION" : "NOT RECOMMENDED"}
        </div>
      </div>
      <p style="color: ${percentageColor}; line-height: 1.6; margin: 0;">
        Based on our comprehensive analysis, we assess a ${registrationPercentage}% likelihood of successful trademark registration for "${trademarkName}".
      </p>
    </div>
  `

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

  // Similar Trademarks Found
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
  } else {
    analysisContent += `
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: #166534; font-size: 18px; font-weight: 700; margin-bottom: 12px;">✅ No Similar Trademarks Found</h3>
        <p style="color: #166534; line-height: 1.6; margin: 0;">
          <strong>CLEAR PATH:</strong> Our search did not identify any significantly similar trademarks that would likely conflict with "${trademarkName}".
        </p>
      </div>
    `
  }

  // Trademark Strength Assessment
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
          ${config.icon} Trademark Strength: ${config.label}
        </h3>
        <p style="color: ${config.color}; line-height: 1.6; margin: 0;">
          Your trademark "${trademarkName}" has been assessed as having <strong>${config.label.toLowerCase()} distinctiveness</strong> based on our comprehensive analysis of its uniqueness and registrability.
        </p>
      </div>
    `
  }

  // Risk Level Assessment
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
          ${config.icon} Registration Risk: ${config.label}
        </h3>
        <p style="color: ${config.color}; line-height: 1.6; margin: 0;">
          Based on our analysis, your trademark application has been classified as <strong>${config.label.toLowerCase()}</strong> for registration success.
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

  // If no detailed analysis, show basic search results
  if (!detailedSummary && !trademarkStrength && !riskLevel && !conflictingMarks) {
    analysisContent = `
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3 style="color: #0c4a6e; font-size: 18px; font-weight: 700; margin-bottom: 12px;">📋 Professional Trademark Search Results</h3>
        <p style="color: #0369a1; line-height: 1.6; margin: 0;">
          We have completed a comprehensive trademark search for "${trademarkName}". Our analysis includes searches across multiple trademark databases to identify potential conflicts and assess registration prospects.
        </p>
        <div style="margin-top: 12px; padding: 12px; background-color: rgba(255, 255, 255, 0.7); border-radius: 6px;">
          <p style="color: #0369a1; margin: 0;"><strong>Search Scope:</strong> Our search covered registered trademarks, pending applications, and common law marks that could potentially conflict with your proposed trademark.</p>
        </div>
      </div>
    `
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Complete Trademark Analysis</title>
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
        .cta-button { display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.2s; }
        .cta-button:hover { transform: translateY(-1px); box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1); text-decoration: none; color: white; }
        .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { font-size: 14px; color: #6b7280; margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛡️ Complete Trademark Analysis Results</h1>
          <p>Professional trademark search results and strategic recommendations</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear ${clientName},
          </div>
          
          <p style="margin-bottom: 24px; font-size: 16px; color: #4b5563;">
            Thank you for choosing Just Protected for your trademark analysis. We have completed our comprehensive search and professional assessment of your trademark "<strong>${trademarkName}</strong>". Below you'll find our detailed findings, similarity analysis, and strategic recommendations.
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
              <span class="info-label">Analysis Date:</span>
              <span class="info-value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Search ID:</span>
              <span class="info-value" style="font-family: monospace; font-size: 12px;">${searchId}</span>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">📊 Complete Trademark Analysis</h2>
            ${analysisContent}
          </div>

          ${
            detailedSummary || recommendations || conflictingMarks
              ? `
<div class="section">
  <h2 class="section-title">📝 Detailed Professional Opinion</h2>
  <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
    ${
      detailedSummary
        ? `
      <div style="margin-bottom: 20px;">
        <h4 style="color: #1f2937; font-weight: 600; margin-bottom: 12px;">Executive Summary:</h4>
        <div style="color: #4b5563; line-height: 1.6; white-space: pre-line;">${detailedSummary}</div>
      </div>
    `
        : ""
    }
    
    ${
      conflictingMarks
        ? `
      <div style="margin-bottom: 20px;">
        <h4 style="color: #1f2937; font-weight: 600; margin-bottom: 12px;">Conflicting Trademarks Identified:</h4>
        <div style="color: #4b5563; line-height: 1.6; white-space: pre-line; background-color: #fef3c7; padding: 12px; border-radius: 4px;">${conflictingMarks}</div>
      </div>
    `
        : ""
    }
    
    ${
      recommendations
        ? `
      <div style="margin-bottom: 20px;">
        <h4 style="color: #1f2937; font-weight: 600; margin-bottom: 12px;">Professional Recommendations:</h4>
        <div style="color: #4b5563; line-height: 1.6; white-space: pre-line;">${recommendations}</div>
      </div>
    `
        : ""
    }
    
    ${
      nextSteps
        ? `
      <div>
        <h4 style="color: #1f2937; font-weight: 600; margin-bottom: 12px;">Recommended Next Steps:</h4>
        <div style="color: #4b5563; line-height: 1.6; white-space: pre-line;">${nextSteps}</div>
      </div>
    `
        : ""
    }
  </div>
</div>
`
              : ""
          }

          <div class="section">
  <h2 class="section-title">📋 Complete Analysis Summary</h2>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
    <h4 style="color: #1f2937; font-weight: 600; margin-bottom: 16px;">Key Findings:</h4>
    <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
      <li><strong>Exact Match:</strong> ${exactMatch === "yes" ? "❌ Found - High Risk" : "✅ None Found - Good Sign"}</li>
      <li><strong>Similar Marks:</strong> ${similarCount} potentially conflicting trademark${similarCount !== 1 ? "s" : ""} identified</li>
      <li><strong>Trademark Strength:</strong> ${trademarkStrength ? trademarkStrength.charAt(0).toUpperCase() + trademarkStrength.slice(1).replace("-", " ") : "Under Review"}</li>
      <li><strong>Registration Risk:</strong> ${riskLevel ? riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1).replace("-", " ") : "Under Assessment"}</li>
      <li><strong>Registration Likelihood:</strong> ${registrationPercentage}% chance of success</li>
    </ul>
    
    <div style="margin-top: 20px; padding: 16px; background-color: #f0f9ff; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <h4 style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Professional Assessment:</h4>
      <p style="color: #1e40af; margin: 0; line-height: 1.6;">
        ${
          registrationPercentage >= 70
            ? `Your trademark "${trademarkName}" shows strong potential for successful registration. We recommend proceeding with the application process.`
            : registrationPercentage >= 50
              ? `Your trademark "${trademarkName}" has moderate registration prospects. Some challenges may need to be addressed, but registration is achievable.`
              : `Your trademark "${trademarkName}" faces significant challenges for registration. We recommend consultation to explore alternative strategies.`
        }
      </p>
    </div>
  </div>
</div>

          <div class="cta-container">
            <div class="cta-title">🚀 Ready to Register Your Trademark?</div>
            <div class="cta-description">
              Based on your analysis results, start your official trademark registration process now
            </div>
            <a href="${verificationUrl}" class="cta-button">
              Start Trademark Registration
            </a>
            <p style="margin-top: 16px; font-size: 14px; color: #6b7280;">
              Click above to begin your trademark application with pre-filled information from this analysis
            </p>
          </div>

          <div style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <div style="font-size: 16px; font-weight: 600; color: #334155; margin-bottom: 8px;">🔗 Direct Registration Link</div>
            <p style="margin: 8px 0; color: #64748b; font-size: 14px;">
              Bookmark this link to return to your registration anytime:
            </p>
            <a href="${verificationUrl}" style="word-break: break-all; color: #3b82f6; text-decoration: none; font-family: monospace; font-size: 14px;">${verificationUrl}</a>
          </div>

<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #1f2937; font-weight: 700; margin-bottom: 16px;">📞 Contact Information</h3>
  <p style="color: #4b5563; line-height: 1.6; margin: 0;">
    This complete analysis was prepared by our trademark specialists. If you have questions about these results or need assistance with next steps, our team is ready to help:
  </p>
  <ul style="color: #4b5563; line-height: 1.8; margin: 12px 0 0 20px;">
    <li>Email: support@justprotected.com</li>
    <li>Phone: Available upon request</li>
    <li>Reference ID: ${searchId}</li>
  </ul>
</div>

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
