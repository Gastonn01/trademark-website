"use client"

import { useEffect } from "react"

interface ViewRecorderProps {
  searchId?: string
}

export function ViewRecorder({ searchId }: ViewRecorderProps) {
  useEffect(() => {
    // Only record view if searchId is provided
    if (searchId) {
      const recordView = async () => {
        try {
          await fetch("/api/record-view", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchId }),
          })
          console.log("View recorded successfully")
        } catch (error) {
          console.error("Error recording view:", error)
        }
      }

      recordView()
    }
  }, [searchId])

  // This component doesn't render anything
  return null
}
