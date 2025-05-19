"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, RefreshCw, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Component for rendering a bar chart
const BarChart = ({ data, keys }: { data: any[]; keys: string[] }) => {
  const maxValue = Math.max(...data.flatMap((d) => keys.map((key) => d[key]))) * 1.2 || 10

  return (
    <div className="w-full h-64 mt-4">
      <div className="flex h-full">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
          {[0, 1, 2, 3, 4, 5].map((val, i) => (
            <div key={i} className="h-0">
              {Math.round((maxValue * val) / 5)}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1">
          <div className="flex h-full">
            {data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                {keys.map((key, j) => {
                  const height = `${(d[key] / maxValue) * 100}%`
                  const colors = [
                    "bg-blue-500 hover:bg-blue-600",
                    "bg-green-500 hover:bg-green-600",
                    "bg-orange-500 hover:bg-orange-600",
                  ]

                  return (
                    <div
                      key={`${i}-${j}`}
                      className={`w-4/5 ${colors[j]} rounded-t transition-all duration-300 mb-1 group relative`}
                      style={{ height }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {key}: {d[key]}
                      </div>
                    </div>
                  )
                })}
                <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left h-6 overflow-hidden">
                  {d.formattedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for rendering a line chart
const LineChart = ({ data, keys }: { data: any[]; keys: string[] }) => {
  const maxValue = Math.max(...data.flatMap((d) => keys.map((key) => d[key]))) * 1.2 || 10
  const chartHeight = 200

  // Generate SVG path for each key
  const generatePath = (key: string) => {
    return data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * 100
        const y = 100 - (d[key] / maxValue) * 100
        return `${i === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  const colors = {
    remindersSent: "#3b82f6", // blue
    resultsViewed: "#22c55e", // green
    conversionRate: "#f97316", // orange
  }

  return (
    <div className="w-full h-64 mt-4">
      <div className="flex h-full">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
          {[0, 1, 2, 3, 4, 5].map((val, i) => (
            <div key={i} className="h-0">
              {Math.round((maxValue * val) / 5)}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((val, i) => (
              <div key={i} className="absolute border-t border-gray-200 w-full" style={{ top: `${(i / 5) * 100}%` }} />
            ))}
          </div>

          {/* SVG for lines */}
          <svg
            viewBox={`0 0 100 100`}
            className="absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {keys.map((key) => (
              <g key={key}>
                <path
                  d={generatePath(key)}
                  fill="none"
                  stroke={colors[key as keyof typeof colors]}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {data.map((d, i) => {
                  const x = (i / (data.length - 1)) * 100
                  const y = 100 - (d[key] / maxValue) * 100
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill={colors[key as keyof typeof colors]}
                      className="hover:r-4 transition-all duration-300"
                    />
                  )
                })}
              </g>
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {data.map((d, i) => (
              <div key={i} className="text-xs text-gray-500 transform -rotate-45 origin-top-left">
                {d.formattedDate}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-4">
        {keys.map((key) => (
          <div key={key} className="flex items-center">
            <div
              className="w-3 h-3 mr-1 rounded-full"
              style={{ backgroundColor: colors[key as keyof typeof colors] }}
            />
            <span className="text-xs text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Stats card component
const StatsCard = ({
  title,
  value,
  description,
  trend,
}: { title: string; value: string; description: string; trend?: number }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{title}</p>
        {trend !== undefined && (
          <div className={`text-xs mt-2 ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% {trend >= 0 ? "increase" : "decrease"}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

// Insight component
const Insight = ({ type, title, description }: { type: string; title: string; description: string }) => {
  const icons = {
    success: <CheckCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
  }

  const colors = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
  }

  return (
    <li className="flex items-start">
      <div className={`${colors[type as keyof typeof colors]} p-1 rounded mr-2 mt-0.5`}>
        {icons[type as keyof typeof icons]}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  )
}

export function ReminderStatistics() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])
  const [summaryStats, setSummaryStats] = useState({
    totalReminders: 0,
    totalViews: 0,
    viewRate: 0,
    avgResponseTime: 0,
    effectivenessScore: 0,
    trends: {
      reminders: 0,
      viewRate: 0,
      responseTime: 0,
      effectivenessScore: 0,
    },
  })
  const [insights, setInsights] = useState<any[]>([])

  // Function to load data based on time range
  const loadData = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/reminder-statistics?timeRange=${timeRange}`)

      if (response.ok) {
        const data = await response.json()

        if (data.success) {
          setChartData(data.data.chartData)
          setSummaryStats(data.data.summaryStats)
          setInsights(data.data.insights)
        } else {
          console.error("Failed to load statistics:", data.error)
        }
      } else {
        console.error("Failed to load statistics")
      }
    } catch (error) {
      console.error("Error loading statistics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount and when time range changes
  useEffect(() => {
    loadData()
  }, [timeRange])

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Reminder Effectiveness</h2>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reminders Sent"
          value={summaryStats.totalReminders.toString()}
          description="Total number of reminders sent in the selected period"
          trend={summaryStats.trends.reminders}
        />
        <StatsCard
          title="View Rate"
          value={`${summaryStats.viewRate}%`}
          description="Percentage of clients who viewed results after receiving a reminder"
          trend={summaryStats.trends.viewRate}
        />
        <StatsCard
          title="Avg. Response Time"
          value={`${summaryStats.avgResponseTime} hrs`}
          description="Average time between reminder and viewing results"
          trend={summaryStats.trends.responseTime}
        />
        <StatsCard
          title="Effectiveness Score"
          value={`${summaryStats.effectivenessScore}/100`}
          description="Overall effectiveness score based on multiple factors"
          trend={summaryStats.trends.effectivenessScore}
        />
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Reminder Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
              <TabsTrigger value="combined">Combined View</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <BarChart data={chartData} keys={["remindersSent", "resultsViewed"]} />
              )}
            </TabsContent>

            <TabsContent value="conversion" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <LineChart data={chartData} keys={["conversionRate"]} />
              )}
            </TabsContent>

            <TabsContent value="combined" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : (
                <LineChart data={chartData} keys={["remindersSent", "resultsViewed", "conversionRate"]} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <Insight key={index} type={insight.type} title={insight.title} description={insight.description} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
