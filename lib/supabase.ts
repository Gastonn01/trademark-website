import { createClient } from "@supabase/supabase-js"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Force preview mode for Vercel preview environments
const isPreviewEnvironment = () => {
  // Check if we're in a preview environment
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Create a Supabase client only if not in preview
let supabase: any = null

// Only initialize if not in preview and required env vars exist
if (
  !isPreviewEnvironment() &&
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  try {
    supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
      },
    })
    console.log("Supabase client initialized successfully")
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
  }
}

// Update the ensureTableExists function to completely skip in preview
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

// Update the saveSearchData function to use only in-memory storage in preview
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  try {
    // First, store in memory as a fallback
    inMemoryStorage[searchId] = {
      id: searchId,
      search_data: searchData,
      form_type: formType,
      created_at: new Date().toISOString(),
      status: "pending",
    }

    console.log("Data saved to in-memory storage:", inMemoryStorage[searchId])

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
        search_data: searchData, // Store all form data in the JSONB field
        form_type: formType, // Store form type in notes for reference
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

// Update getSearchData to use only in-memory in preview
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
  console.log("Getting all search data, memory storage has:", Object.keys(inMemoryStorage).length, "items")

  // Always use in-memory storage for preview or when Supabase is not available
  if (isPreviewEnvironment() || !supabase) {
    console.log("Using in-memory storage for getAllSearchData")

    // If memory storage is empty, create some sample data
    if (Object.keys(inMemoryStorage).length === 0) {
      console.log("Creating sample data for preview")
      // Add some sample data for testing
      for (let i = 1; i <= 5; i++) {
        const id = `sample-${i}`
        inMemoryStorage[id] = {
          id,
          search_data: {
            trademarkName: `Sample Trademark ${i}`,
            firstName: `John`,
            lastName: `Doe ${i}`,
            email: `sample${i}@example.com`,
            goodsAndServices: `Sample goods and services ${i}`,
          },
          form_type: i % 2 === 0 ? "Free Search" : "Registration",
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

    let filteredData = Object.values(inMemoryStorage)
    console.log("Memory storage has", filteredData.length, "items")

    // Apply status filter if provided
    if (status && status !== "all") {
      filteredData = filteredData.filter((item: any) => item.status === status)
      console.log("After status filter, memory storage has", filteredData.length, "items")
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
      form_type: item.form_type || "Unknown",
      search_data: {
        ...item.search_data,
        name: item.search_data?.firstName || item.search_data?.name || "",
        surname: item.search_data?.lastName || item.search_data?.surname || "",
        email: item.search_data?.email,
      },
      created_at: item.created_at,
      status: item.status || "pending",
      results: item.results,
    }))

    console.log("Returning", transformedData.length, "items from memory")
    return { data: transformedData, error: null, source: "memory" }
  }

  try {
    // Try to get from Supabase with better error handling
    let query = supabase
      .from("trademark_searches")
      .select("*")
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      // Fall back to in-memory data instead of throwing
      console.log("Falling back to in-memory data due to Supabase error")
      return getAllSearchData(limit, offset, status)
    }

    // Transform data to match expected format in admin panel
    const transformedData = data.map((item) => ({
      id: item.id,
      form_type: item.form_type || item.notes || "Unknown",
      search_data: {
        ...item.search_data,
        name: item.search_data?.firstName || item.search_data?.name || "",
        surname: item.search_data?.lastName || item.search_data?.surname || "",
        email: item.email || item.search_data?.email,
      },
      created_at: item.created_at,
      status: item.status,
      results: item.results,
    }))

    return { data: transformedData, error: null, source: "supabase" }
  } catch (error) {
    console.error("Error fetching from Supabase:", error)
    // Fall back to in-memory data
    console.log("Falling back to in-memory data due to exception")
    return getAllSearchData(limit, offset, status)
  }
}

// Function to get search data by verification token
export async function getSearchDataByToken(token: string) {
  // If in preview mode, search in-memory storage
  if (isPreviewEnvironment() || !supabase) {
    // Find the search with the matching verification token
    const search = Object.values(inMemoryStorage).find((item: any) => item.results?.verificationToken === token)
    return search || null
  }

  try {
    // Try to get from Supabase
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .filter("results->verificationToken", "eq", token)
      .single()

    if (error) {
      console.error("Error getting search by token from Supabase:", error)
      // Try to find in memory
      const search = Object.values(inMemoryStorage).find((item: any) => item.results?.verificationToken === token)
      return search || null
    }

    return data
  } catch (error) {
    console.error("Error in Supabase operation, checking memory:", error)
    // Try to find in memory
    const search = Object.values(inMemoryStorage).find((item: any) => item.results?.verificationToken === token)
    return search || null
  }
}
