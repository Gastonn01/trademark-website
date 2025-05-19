import { ReminderDashboard } from "@/components/reminder-dashboard"

export const metadata = {
  title: "Reminder Dashboard | Just Protected Admin",
  description: "Manage and send reminders to clients who haven't viewed their search results",
}

export default function RemindersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Reminder Dashboard</h1>
      <ReminderDashboard />
    </div>
  )
}
