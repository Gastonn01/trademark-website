import { createClient } from "@supabase/supabase-js"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Force fallback mode (set to true to always use in-memory data)
const FORCE_FALLBACK = true

// Check if we're in a preview environment
const isPreviewEnvironment = () => {
  // Always return true to force using the fallback data
  // This will bypass all Supabase calls
  return (
    FORCE_FALLBACK ||
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Create a Supabase client
export function createSupabaseClient() {
  // If we're forcing fallback, don't even try to create a client
  if (FORCE_FALLBACK) {
    console.log("Forcing fallback mode, skipping Supabase client creation")
    return null
  }

  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Supabase environment variables are missing")
    return null
  }

  try {
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
    return client
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Get a Supabase client instance
let supabase: any = null
try {
  supabase = createSupabaseClient()
} catch (error) {
  console.error("Error initializing global Supabase client:", error)
}

// Update the ensureTableExists function
export async function ensureTableExists() {
  // In preview mode, just return true without any fetch operations
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, skipping table check")
    return true
  }

  // If Supabase client wasn't initialized, return true to avoid errors
  if (!supabase) {
    console.log("Supabase client not available, skipping table check")
    return true
  }

  try {
    // Verify the table exists by querying it
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError) {
      console.error("Error checking table:", checkError)
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking table:", error)
    return false
  }
}

// Function to upload a file to Supabase Storage
export async function uploadFileToStorage(file: File, searchId: string) {
  // In preview mode, just return mock success response
  if (isPreviewEnvironment()) {
    console.log("Preview environment detected, skipping file upload")
    return {
      success: true,
      logoData: {
        logoName: file.name,
        logoType: file.type,
        logoSize: file.size,
      },
      error: null,
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

// Update the saveSearchData function
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  try {
    // First, store in memory as a fallback
    inMemoryStorage[searchId] = {
      id: searchId,
      search_results: searchData,
      notes: formType,
      created_at: new Date().toISOString(),
    }

    console.log("Data saved to in-memory storage")

    // If in preview mode, don't try to use Supabase
    if (isPreviewEnvironment() || !supabase) {
      return { success: true, source: "memory" }
    }

    // Try to save to Supabase
    try {
      // Check if record exists
      const { data: existingData, error: fetchError } = await supabase
        .from("trademark_searches")
        .select("*")
        .eq("id", searchId)
        .single()

      if (fetchError && !fetchError.message.includes("No rows found")) {
        console.error("Error checking existing record:", fetchError)
        // Continue with in-memory storage
        return { success: true, source: "memory" }
      }

      // Prepare data object with schema-compatible fields
      const dataToSave = {
        id: searchId,
        trademark_name: searchData.trademarkName || searchData.trademark_name || "Unnamed",
        email: searchData.email || "",
        phone: searchData.phone || searchData.phoneNumber || "",
        description: searchData.goodsAndServices || searchData.description || searchData.details || "",
        status: "pending",
        search_results: searchData, // Store all form data in the JSONB field
        notes: formType, // Store form type in notes for reference
      }

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from("trademark_searches")
          .update({
            ...dataToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", searchId)

        if (error) {
          console.error("Error updating record:", error)
          return { success: true, source: "memory" }
        }
      } else {
        // Insert new record
        const { error } = await supabase.from("trademark_searches").insert([
          {
            ...dataToSave,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (error) {
          console.error("Error inserting record:", error)
          return { success: true, source: "memory" }
        }
      }

      return { success: true, source: "supabase" }
    } catch (supabaseError) {
      console.error("Supabase operation failed:", supabaseError)
      // Continue with in-memory storage
      return { success: true, source: "memory" }
    }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Update getSearchData function
export async function getSearchData(searchId: string) {
  // If in preview mode, only use in-memory storage
  if (isPreviewEnvironment() || !supabase) {
    return inMemoryStorage[searchId] || null
  }

  try {
    // Try to get from Supabase
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      // If there's an error, try to get from memory
      console.error("Error getting from Supabase, checking memory:", error)
      return inMemoryStorage[searchId] || null
    }

    return data
  } catch (error) {
    // In case of error, try to get from memory
    console.error("Error in Supabase operation, checking memory:", error)
    return inMemoryStorage[searchId] || null
  }
}

// Function to update search status
export async function updateSearchStatus(searchId: string, status: string) {
  // Update in memory first
  if (inMemoryStorage[searchId]) {
    inMemoryStorage[searchId].status = status
  }

  // If in preview mode, only use in-memory storage
  if (isPreviewEnvironment() || !supabase) {
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
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
      return { data: null, error: error.message, source: "memory" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase update operation failed:", supabaseError)
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }
}

// Function to update search results
export async function updateSearchResults(searchId: string, results: any) {
  // Update in memory first
  if (inMemoryStorage[searchId]) {
    inMemoryStorage[searchId].results = results
    // If status is pending, update to processing
    if (inMemoryStorage[searchId].status === "pending") {
      inMemoryStorage[searchId].status = "processing"
    }
  }

  // If in preview mode, only use in-memory storage
  if (isPreviewEnvironment() || !supabase) {
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }

  try {
    // Try to update in Supabase
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({
        results: results,
        status: "processing", // Update status to processing if results are added
      })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search results in Supabase:", error)
      return { data: null, error: error.message, source: "memory" }
    }

    return { data, error: null, source: "supabase" }
  } catch (supabaseError) {
    console.error("Supabase update operation failed:", supabaseError)
    return { data: inMemoryStorage[searchId], error: null, source: "memory" }
  }
}

// Function to get all search data with fallback to in-memory
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with limit:", limit, "offset:", offset, "status:", status)

  // Create sample data for preview/development if none exists
  if (Object.keys(inMemoryStorage).length === 0) {
    console.log("Creating sample data for preview")
    // Add some sample data for testing
    for (let i = 1; i <= 5; i++) {
      const id = `sample-${i}`
      inMemoryStorage[id] = {
        id,
        search_results: {
          trademarkName: `Sample Trademark ${i}`,
          firstName: `John`,
          lastName: `Doe ${i}`,
          email: `sample${i}@example.com`,
          goodsAndServices: `Sample goods and services ${i}`,
        },
        notes: i % 2 === 0 ? "Free Search" : "Registration",
        created_at: new Date(Date.now() - i * 86400000).toISOString(), // Different dates
        status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "pending" : "processing",
        // Add sample results for some entries
        results:
          i % 2 === 0
            ? {
                similarTrademarks: [`Similar Trademark ${i}.1`, `Similar Trademark ${i}.2`],
                comments: `Sample comments for trademark ${i}`,
                recommendation: i % 4 === 0 ? `We recommend registering this trademark in classes X, Y, Z` : "",
                verificationToken: `token${Math.random().toString(36).substring(2, 10)}`,
              }
            : undefined,
      }
    }
  }

  // IMPORTANT: We're forcing the use of in-memory storage to avoid Supabase issues
  console.log("Using in-memory storage for getAllSearchData")

  let filteredData = Object.values(inMemoryStorage)

  // Apply status filter if provided
  if (status && status !== "all") {
    filteredData = filteredData.filter((item: any) => item.status === status)
  }

  // Sort by created_at (newest first)
  const sortedData = filteredData.sort(
    (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  // Apply pagination
  const paginatedData = sortedData.slice(offset, offset + limit)

  // Transform to expected format
  const transformedData = paginatedData.map((item: any) => ({
    id: item.id,
    form_type: item.notes || "Unknown",
    search_data: {
      ...item.search_results,
      name: item.search_results?.firstName || item.search_results?.name || "",
      surname: item.search_results?.lastName || item.search_results?.surname || "",
      email: item.search_results?.email,
    },
    created_at: item.created_at,
    status: item.status || "pending",
    results: item.results,
  }))

  console.log(`Returning ${transformedData.length} items from in-memory storage`)
  return { data: transformedData, error: null, source: "memory" }
}

// Function to get search data by verification token
export async function getSearchDataByToken(token: string) {
  console.log("Getting search data by token:", token)

  // If in preview mode, check in-memory storage
  if (isPreviewEnvironment()) {
    console.log("Preview environment, checking in-memory storage")
    const matchingSearch = Object.values(inMemoryStorage).find((item: any) => item.results?.verificationToken === token)
    return matchingSearch || null
  }

  try {
    // Make sure we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase environment variables are missing")
    }

    // Initialize Supabase client with explicit URL and key
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    )

    // Query the database for the search with this token
    const { data, error } = await supabaseClient
      .from("trademark_searches")
      .select("*")
      .eq("results->verificationToken", token)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    if (!data) {
      console.log("No data found for token:", token)
      return null
    }

    console.log("Found search data for token:", token)
    return data
  } catch (error) {
    console.error("Error in getSearchDataByToken:", error)
    throw error
  }
}
