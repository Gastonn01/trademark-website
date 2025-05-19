import { NextResponse } from "next/server"
import { getAllSearchData } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// Function to check if a reminder should be sent
// This is a simple implementation - in a real app, you'd have more sophisticated logic
function shouldSendReminder(search: any): boolean {
  // If the search doesn't have results yet, don't send a reminder
  if (!search.results) return false

  // If the search status isn't 'completed', don't send a reminder
  if (search.status !== "completed") return false

  // If the search has a 'viewed_at' timestamp, the client has viewed the results
  if (search.viewed_at) return false

  // If the search has a 'reminder_sent_at' timestamp, a reminder has already been sent
  if (search.reminder_sent_at) return false

  // Check if it's been more than 3 days since the results were sent
  const resultsUpdatedAt = new Date(search.updated_at || search.created_at)
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  return resultsUpdatedAt < threeDaysAgo
}

export async function GET(req: Request) {
  try {
    // Get all searches
    const { data: searches, error } = await getAllSearchData(100, 0)

    if (error) {
      return NextResponse.json({ error: "Failed to fetch searches" }, { status: 500 })
    }

    // Filter searches that need reminders
    const searchesNeedingReminders = searches.filter(shouldSendReminder)

    // In a real implementation, you would send reminders here
    // For now, we'll just return the list of searches that need reminders
    return NextResponse.json({
      success: true,
      searchesNeedingReminders: searchesNeedingReminders.map((search) => ({
        id: search.id,
        email: search.search_data?.email,
        trademarkName: search.search_data?.trademarkName || search.trademark_name,
        updatedAt: search.updated_at || search.created_at,
      })),
    })
  } catch (error) {
    console.error("Error checking reminders:", error)
    return NextResponse.json(
      {
        error: "Error checking reminders",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
