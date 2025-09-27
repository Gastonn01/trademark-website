"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, EyeOff } from "lucide-react"

interface ApiStatus {
  status: string
  timestamp: string
  endpoint?: string
  methods?: string[]
  configuration?: any
  ready?: boolean
  issues?: string[]
  environment?: string
  [key: string]: any
}

interface ApiData {
  webhook: ApiStatus | null
  contact: ApiStatus | null
  payment: ApiStatus | null
}

export default function WebhookStatus() {
  const [data, setData] = useState<ApiData>({
    webhook: null,
    contact: null,
    payment: null,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRawData, setShowRawData] = useState(false)

  const fetchApiStatus = async () => {
    setLoading(true)
    setError(null)

    try {
      const endpoints = [
        { name: "webhook", url: "/api/webhook" },
        { name: "contact", url: "/api/contact" },
        { name: "payment", url: "/api/create-payment-intent" },
      ]

      const results = await Promise.allSettled(
        endpoints.map(async (endpoint) => {
          const response = await fetch(endpoint.url)
          if (!response.ok) {
            throw new Error(`${endpoint.name}: ${response.status} ${response.statusText}`)
          }
          const data = await response.json()
          return { name: endpoint.name, data }
        }),
      )

      const newData: ApiData = {
        webhook: null,
        contact: null,
        payment: null,
      }

      results.forEach((result, index) => {
        const endpointName = endpoints[index].name as keyof ApiData
        if (result.status === "fulfilled") {
          newData[endpointName] = result.value.data
        } else {
          console.error(`Failed to fetch ${endpointName}:`, result.reason)
        }
      })

      setData(newData)
    } catch (err: any) {
      console.error("Error fetching API status:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApiStatus()
  }, [])

  const getStatusIcon = (status: ApiStatus | null) => {
    if (!status) return <XCircle className="h-5 w-5 text-red-500" />
    if (status.ready === true) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status.ready === false) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    if (status.status?.includes("✅")) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status.status?.includes("⚠️")) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  const getStatusBadge = (status: ApiStatus | null) => {
    if (!status) return <Badge variant="destructive">Offline</Badge>
    if (status.ready === true)
      return (
        <Badge variant="default" className="bg-green-500">
          Ready
        </Badge>
      )
    if (status.ready === false) return <Badge variant="secondary">Issues</Badge>
    if (status.status?.includes("✅"))
      return (
        <Badge variant="default" className="bg-green-500">
          Ready
        </Badge>
      )
    if (status.status?.includes("⚠️")) return <Badge variant="secondary">Issues</Badge>
    return <Badge variant="destructive">Error</Badge>
  }

  const renderApiCard = (title: string, description: string, status: ApiStatus | null, endpoint: string) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status)}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {getStatusBadge(status)}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <p>
            <strong>Endpoint:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{endpoint}</code>
          </p>
          {status?.timestamp && (
            <p>
              <strong>Last Check:</strong> {new Date(status.timestamp).toLocaleString()}
            </p>
          )}
          {status?.methods && (
            <p>
              <strong>Methods:</strong> {status.methods.join(", ")}
            </p>
          )}
          {status?.environment && (
            <p>
              <strong>Environment:</strong> {status.environment}
            </p>
          )}
        </div>

        {status?.configuration && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Configuration:</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(status.configuration).map(([service, config]: [string, any]) => (
                <div key={service} className="ml-2">
                  <strong className="capitalize">{service}:</strong>
                  {typeof config === "object" ? (
                    <div className="ml-4 space-y-1">
                      {Object.entries(config).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</span>
                          <span className={value?.toString().includes("✅") ? "text-green-600" : "text-red-600"}>
                            {value?.toString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className={config?.toString().includes("✅") ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                      {config?.toString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {status?.issues && status.issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-red-600">Issues:</h4>
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {status.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {status?.notes && status.notes.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-blue-600">Notes:</h4>
            <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
              {status.notes.map((note: string, index: number) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Status Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor the health and configuration of your API endpoints</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowRawData(!showRawData)} variant="outline" size="sm">
            {showRawData ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showRawData ? "Hide" : "Show"} Raw Data
          </Button>
          <Button onClick={fetchApiStatus} disabled={loading} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {renderApiCard(
          "Webhook API",
          "Handles Stripe webhook events and payment confirmations",
          data.webhook,
          "/api/webhook",
        )}
        {renderApiCard(
          "Contact API",
          "Processes contact form submissions and sends emails",
          data.contact,
          "/api/contact",
        )}
        {renderApiCard(
          "Payment API",
          "Creates Stripe payment intents for trademark registrations",
          data.payment,
          "/api/create-payment-intent",
        )}
      </div>

      {showRawData && (
        <Card>
          <CardHeader>
            <CardTitle>Raw API Response Data</CardTitle>
            <CardDescription>Complete JSON responses from all API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading API status...</span>
        </div>
      )}
    </div>
  )
}
