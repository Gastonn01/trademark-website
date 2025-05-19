import { NextResponse } from "next/server"
import { format, subDays } from "date-fns"

export const dynamic = "force-dynamic"
export const fetchCache = "auto"

// Function to generate mock data for demonstration purposes
function generateMockData(days: number) {
  const data = []
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i)
    const remindersSent = Math.floor(Math.random() * 10)
    const resultsViewed = Math.floor(Math.random() * Math.min(remindersSent, 8))

    data.push({
      date: format(date, "yyyy-MM-dd"),
      formattedDate: format(date, "MMM dd"),
      remindersSent,
      resultsViewed,
      conversionRate: remindersSent > 0 ? Math.round((resultsViewed / remindersSent) * 100) : 0,
    })
  }

  return data
}

// Function to calculate summary statistics
function calculateSummaryStats(data: any[]) {
  const totalReminders = data.reduce((sum, d) => sum + d.remindersSent, 0)
  const totalViews = data.reduce((sum, d) => sum + d.resultsViewed, 0)
  const viewRate = totalReminders > 0 ? Math.round((totalViews / totalReminders) * 100) : 0

  // Calculate trends (comparing first half vs second half of the period)
  const midpoint = Math.floor(data.length / 2)
  const firstHalf = data.slice(0, midpoint)
  const secondHalf = data.slice(midpoint)

  const firstHalfReminders = firstHalf.reduce((sum, d) => sum + d.remindersSent, 0)
  const secondHalfReminders = secondHalf.reduce((sum, d) => sum + d.remindersSent, 0)

  const remindersTrend =
    firstHalfReminders > 0 ? Math.round(((secondHalfReminders - firstHalfReminders) / firstHalfReminders) * 100) : 0

  const firstHalfViews = firstHalf.reduce((sum, d) => sum + d.resultsViewed, 0)
  const secondHalfViews = secondHalf.reduce((sum, d) => sum + d.resultsViewed, 0)

  const viewRateTrend =
    firstHalfViews > 0 && firstHalfReminders > 0 && secondHalfReminders > 0
      ? Math.round((secondHalfViews / secondHalfReminders - firstHalfViews / firstHalfReminders) * 100)
      : 0

  return {
    totalReminders,
    totalViews,
    viewRate,
    avgResponseTime: Math.round(Math.random() * 24 + 12), // Mock: 12-36 hours
    effectivenessScore: Math.round(Math.random() * 30 + 60), // Mock: 60-90%
    trends: {
      reminders: remindersTrend,
      viewRate: viewRateTrend,
      responseTime: Math.round(Math.random() * 20 - 10), // Mock: -10% to +10%
      effectivenessScore: Math.round(Math.random() * 10 - 3), // Mock: -3% to +7%
    },
  }
}

// Generate insights based on the data
function generateInsights(data: any[]) {
  // Find the day with highest conversion rate
  const dayWithHighestConversion = [...data].sort((a, b) => b.conversionRate - a.conversionRate)[0]
  const dayName = new Date(dayWithHighestConversion.date).toLocaleDateString("en-US", { weekday: "long" })

  return [
    {
      type: "success",
      title: `Highest conversion day: ${dayName}`,
      description: `Reminders sent on ${dayName}s have a ${dayWithHighestConversion.conversionRate}% view rate`,
    },
    {
      type: "info",
      title: "Optimal reminder time: 10:00 AM - 12:00 PM",
      description: "Reminders sent during this time window have 23% higher view rates",
    },
    {
      type: "warning",
      title: "Attention needed: Second reminders",
      description: "Second reminders have only a 15% view rate, consider revising the content",
    },
  ]
}

export async function GET(req: Request) {
  try {
    // Get the time range from query parameters
    const url = new URL(req.url)
    const timeRange = url.searchParams.get("timeRange") || "7d"

    // Determine the number of days based on the time range
    let days = 7
    switch (timeRange) {
      case "30d":
        days = 30
        break
      case "90d":
        days = 90
        break
      case "7d":
      default:
        days = 7
        break
    }

    // Generate mock data
    const chartData = generateMockData(days)

    // Calculate summary statistics
    const summaryStats = calculateSummaryStats(chartData)

    // Generate insights
    const insights = generateInsights(chartData)

    return NextResponse.json({
      success: true,
      data: {
        chartData,
        summaryStats,
        insights,
      },
    })
  } catch (error) {
    console.error("Error generating statistics:", error)
    return NextResponse.json(
      {
        error: "Error generating statistics",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
