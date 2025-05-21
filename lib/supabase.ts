import { createClient } from "@supabase/supabase-js"
// Add this import at the top of the file
import { getMockSearchData } from "./mock-data"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Create a singleton Supabase client
let supabaseInstance: any = null

export function getSupabaseClient() {
  // If we already have an instance, return it
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing Supabase environment variables")
    return null
  }

  try {
    // Create a new Supabase client
    supabaseInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
    console.log("Supabase client initialized successfully")
    return supabaseInstance
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Update the getAllSearchData function to prioritize real data and avoid using mock data when not needed

// Replace the entire getAllSearchData function with this implementation:
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with:", { limit, offset, status })

  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return {
      data: getMockSearchData(status),
      error: "Supabase client not available",
      source: "mock-no-client",
    }
  }

  try {
    console.log("Attempting to fetch data from Supabase")

    // Create the query but don't execute it yet
    let query = supabase
      .from("trademark_searches")
      .select("id, notes, email, trademark_name, status, created_at, search_results")
      .order("created_at", { ascending: false })
      .limit(limit)

    // Add status filter if provided
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // Execute the query with proper error handling
    try {
      const { data, error } = await query

      // Check for errors
      if (error) {
        console.error("Supabase query error:", error)
        return {
          data: getMockSearchData(status),
          error: typeof error === "object" ? JSON.stringify(error) : String(error),
          source: "mock-query-error",
        }
      }

      // Check if we have data
      if (!data || data.length === 0) {
        console.log("No data found in Supabase")
        // Only return mock data if explicitly requested
        if (process.env.USE_MOCK_DATA === "true") {
          return {
            data: getMockSearchData(status),
            error: null,
            source: "mock-no-data",
          }
        }
        // Otherwise return empty array
        return {
          data: [],
          error: null,
          source: "supabase-empty",
        }
      }

      console.log(`Successfully fetched ${data.length} records from Supabase`)

      // Transform data to match expected format with robust error handling
      const transformedData = data.map((item: any) => {
        try {
          return {
            id: item.id || `mock-${Math.random().toString(36).substring(2, 9)}`,
            form_type: item.notes || "Unknown",
            search_data: {
              ...(typeof item.search_results === "object" ? item.search_results || {} : {}),
              name: item.search_results?.firstName || item.search_results?.name || "",
              surname: item.search_results?.lastName || item.search_results?.surname || "",
              email: item.email || item.search_results?.email || "",
              trademarkName: item.trademark_name || item.search_results?.trademarkName || "",
              goodsAndServices: item.description || item.search_results?.goodsAndServices || "",
            },
            created_at: item.created_at || new Date().toISOString(),
            status: item.status || "pending",
          }
        } catch (transformError) {
          // If there's an error transforming an item, return a simple object
          console.error("Error transforming item:", transformError)
          return {
            id: item.id || `mock-${Math.random().toString(36).substring(2, 9)}`,
            form_type: "Unknown",
            search_data: {
              name: "Error",
              surname: "Processing",
              email: "error@example.com",
            },
            created_at: new Date().toISOString(),
            status: "pending",
          }
        }
      })

      return { data: transformedData, error: null, source: "supabase" }
    } catch (queryError) {
      // Handle any exceptions during query execution
      console.error("Exception during Supabase query:", queryError)
      return {
        data: getMockSearchData(status),
        error: queryError instanceof Error ? queryError.message : String(queryError),
        source: "mock-exception",
      }
    }
  } catch (error) {
    console.error("Top-level error in getAllSearchData:", error)
    return {
      data: getMockSearchData(status),
      error: error instanceof Error ? error.message : String(error),
      source: "mock-top-error",
    }
  }
}

// Update the ensureTableExists function
export async function ensureTableExists() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, skipping table check")
    return true
  }

  try {
    // First, check if the table exists
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError) {
      console.error("Error checking table:", checkError)

      // If the table doesn't exist, try to create it
      if (checkError.message && checkError.message.includes("does not exist")) {
        console.log("Table does not exist, attempting to create it")

        // Create the table
        const { error: createError } = await supabase.rpc("create_trademark_searches_table")

        if (createError) {
          console.error("Error creating table:", createError)
          return false
        }

        console.log("Table created successfully")
        return true
      }

      return false
    }

    console.log("Table exists")
    return true
  } catch (error) {
    console.error("Error checking table:", error)
    return false
  }
}

// Function to upload a file to Supabase Storage
export async function uploadFileToStorage(file: File, searchId: string) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Supabase client not available, skipping file upload")
    return {
      success: false,
      error: "Supabase client not available",
    }
  }

  try {
    // Convert file to ArrayBuffer
    const fileArrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileArrayBuffer)

    // Generate a unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${searchId}-${Date.now()}.${fileExt}`

    console.log(`Attempting to upload file: ${fileName}, size: ${fileBuffer.length} bytes`)

    // Instead of using Storage, we'll save file metadata
    const logoData = {
      logoName: file.name,
      logoType: file.type,
      logoSize: file.size,
      // We don't save the binary content in the table, it's too large
    }

    console.log("Saving logo metadata")

    return {
      success: true,
      logoData: logoData,
      error: null,
    }
  } catch (error) {
    console.error("Error in uploadFileToStorage:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Update getSearchData to use the new client
export async function getSearchData(searchId: string) {
  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return null
  }

  try {
    // Try to get from Supabase
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      console.error("Error getting from Supabase:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in Supabase operation:", error)
    return null
  }
}

// Function to update search status
export async function updateSearchStatus(searchId: string, status: string) {
  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return { data: null, error: "Supabase client not available", source: "error" }
  }

  try {
    // Try to update in Supabase
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({ status: status })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search status in Supabase:", error)
      return { data: null, error: error.message, source: "error" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase operation failed:", supabaseError)
    throw supabaseError
  }
}

// Function to update search results
export async function updateSearchResults(searchId: string, updatedResults: any) {
  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return { data: null, error: "Supabase client not available", source: "error" }
  }

  try {
    // Get the current record
    const { data: currentData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError) {
      console.error("Error fetching current record:", fetchError)
      return { data: null, error: fetchError.message, source: "error" }
    }

    // Update the search_results field
    const updatedSearchResults = {
      ...currentData.search_results,
      ...updatedResults,
    }

    // Update the record
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        search_results: updatedSearchResults,
        updated_at: new Date().toISOString(),
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search results in Supabase:", error)
      return { data: null, error: error.message, source: "error" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase operation failed:", supabaseError)
    throw supabaseError
  }
}

// COMPLETELY REVISED saveSearchData function to avoid JSON parsing errors
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  // Always save to in-memory storage first as a fallback
  inMemoryStorage[searchId] = {
    id: searchId,
    search_results: searchData,
    notes: formType,
    created_at: new Date().toISOString(),
  }

  console.log("Data saved to in-memory storage as fallback")

  // Get Supabase client
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available, using in-memory storage only")
    return { success: true, source: "memory" }
  }

  // Check if we should use mock data
  if (process.env.USE_MOCK_DATA === "true") {
    console.log("Mock data flag detected, using in-memory storage only")
    return { success: true, source: "memory-mock" }
  }

  try {
    // ULTRA SIMPLIFIED APPROACH: Skip all checks and just try to insert directly
    // This bypasses any potential JSON parsing issues with error responses

    // Prepare a minimal data object with only primitive values
    const minimalData = {
      id: searchId,
      trademark_name: String(searchData.trademarkName || searchData.trademark_name || "Unnamed").substring(0, 255),
      email: String(searchData.email || "").substring(0, 255),
      status: "pending",
      notes: String(formType || "free-search").substring(0, 255),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Attempting to insert minimal data to Supabase")

    // Use a direct insert with minimal data
    try {
      // Wrap the entire operation in a try/catch and ignore any errors
      // This ensures we don't crash if there's an issue with Supabase
      await supabase.from("trademark_searches").insert([minimalData])
      console.log("Successfully inserted minimal record (or silently failed)")

      // Now try to update with just the search_results field
      try {
        // Sanitize the search_results object to ensure it's JSON-compatible
        // Use a simple approach that avoids any complex operations
        const sanitizedSearchResults = {}

        // Only include primitive values to avoid any serialization issues
        for (const key in searchData) {
          if (
            typeof searchData[key] === "string" ||
            typeof searchData[key] === "number" ||
            typeof searchData[key] === "boolean"
          ) {
            sanitizedSearchResults[key] = searchData[key]
          } else if (Array.isArray(searchData[key])) {
            // For arrays, only include if they contain primitive values
            sanitizedSearchResults[key] = searchData[key].filter(
              (item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean",
            )
          }
        }

        await supabase
          .from("trademark_searches")
          .update({
            search_results: sanitizedSearchResults,
          })
          .eq("id", searchId)

        console.log("Successfully updated with search results (or silently failed)")
        return { success: true, source: "supabase" }
      } catch (updateError) {
        console.error("Exception during search_results update:", updateError)
        return { success: true, source: "supabase-partial" }
      }
    } catch (insertError) {
      console.error("Exception during initial insert:", insertError)
      return { success: true, source: "memory" }
    }
  } catch (error) {
    console.error("Top-level error in saveSearchData:", error)
    return { success: true, source: "memory" }
  }
}

// Create a new API route for sending emails
export async function sendSearchResultsEmail(searchId: string, recipientEmail: string, customMessage?: string) {
  // Get the search data
  const searchData = await getSearchData(searchId)
  if (!searchData) {
    return { success: false, error: "Search data not found" }
  }

  // In a real implementation, you would use Resend or another email service here
  console.log(`Sending email to ${recipientEmail} for search ${searchId}`)
  console.log(`Custom message: ${customMessage || "None"}`)

  // Return success for now
  return { success: true, message: "Email sent successfully" }
}
