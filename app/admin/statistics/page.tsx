import { ReminderStatistics } from "@/components/reminder-statistics"

export const metadata = {
  title: "Reminder Statistics | Just Protected Admin",
  description: "View statistics and effectiveness metrics for the reminder system",
}

export default function StatisticsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Reminder Statistics</h1>
      <ReminderStatistics />
    </div>
  )
}
