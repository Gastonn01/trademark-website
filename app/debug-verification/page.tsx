"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function DebugVerificationPage() {
  const [token, setToken] = useState("")
  const [searchId, setSearchId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testVerificationByToken = async () => {
    if (!token) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Try to fetch data using the token
      const response = await fetch(`/api/debug/verify-token?token=${encodeURIComponent(token)}`)
      const data = await response.json()

      setResult(data)
      if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const testVerificationBySearchId = async () => {
    if (!searchId) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Try to fetch data using the search ID
      const response = await fetch(`/api/debug/verify-search?search_id=${encodeURIComponent(searchId)}`)
      const data = await response.json()

      setResult(data)
      if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Verification Debug Tool</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Verification by Token</CardTitle>
            <CardDescription>Enter a verification token to test if it can be found in the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="token">Verification Token</Label>
                <Input
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter token (e.g., token123abc)"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={testVerificationByToken} disabled={!token || loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Test Token
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Verification by Search ID</CardTitle>
            <CardDescription>Enter a search ID to test if it can be found in the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="searchId">Search ID</Label>
                <Input
                  id="searchId"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter search ID (e.g., 123e4567-e89b-12d3-a456-426614174000)"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={testVerificationBySearchId} disabled={!searchId || loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Test Search ID
            </Button>
          </CardFooter>
        </Card>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-lg font-semibold text-red-800">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <pre className="p-4 bg-gray-100 rounded-md overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-lg font-semibold text-blue-800">Debugging Tips</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2 mt-2">
          <li>Check that the token in the email matches exactly what's stored in the database</li>
          <li>Verify that the verification URL in the email is correctly formatted</li>
          <li>Make sure your database has the correct token stored in the results field</li>
          <li>Check for any spaces or special characters that might be causing issues</li>
        </ul>
      </div>
    </div>
  )
}
