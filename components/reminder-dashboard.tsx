"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, RefreshCw, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ReminderDashboard() {
  const [reminders, setReminders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState<Record<string, boolean>>({})
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  // Function to check for searches that need reminders
  const checkReminders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/check-reminders")
      if (response.ok) {
        const data = await response.json()
        setReminders(data.searchesNeedingReminders || [])
        setLastChecked(new Date())
      } else {
        console.error("Failed to check reminders")
      }
    } catch (error) {
      console.error("Error checking reminders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to send a reminder for a specific search
  const sendReminder = async (searchId: string) => {
    setIsSending((prev) => ({ ...prev, [searchId]: true }))
    try {
      const response = await fetch("/api/admin/send-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchId }),
      })

      if (response.ok) {
        // Remove this search from the reminders list
        setReminders((prev) => prev.filter((reminder) => reminder.id !== searchId))
      } else {
        const errorData = await response.json()
        console.error("Failed to send reminder:", errorData)
        alert(`Failed to send reminder: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error sending reminder:", error)
      alert(`Error sending reminder: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsSending((prev) => ({ ...prev, [searchId]: false }))
    }
  }

  // Check reminders on component mount
  useEffect(() => {
    checkReminders()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reminder Dashboard</CardTitle>
        <div className="flex items-center gap-2">
          {lastChecked && (
            <span className="text-sm text-gray-500">
              Last checked: {formatDistanceToNow(lastChecked, { addSuffix: true })}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={checkReminders}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isLoading ? "Checking for reminders..." : "No reminders needed at this time."}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trademark</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Results Sent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell className="font-medium">{reminder.trademarkName || "Unnamed"}</TableCell>
                  <TableCell>{reminder.email}</TableCell>
                  <TableCell>
                    {reminder.updatedAt
                      ? formatDistanceToNow(new Date(reminder.updatedAt), { addSuffix: true })
                      : "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => sendReminder(reminder.id)}
                      disabled={isSending[reminder.id]}
                      className="flex items-center gap-1"
                    >
                      {isSending[reminder.id] ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
