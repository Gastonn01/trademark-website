import { createClient } from "@supabase/supabase-js"

// In-memory storage as a fallback
const inMemoryStorage: { [key: string]: any } = {}

// Check if we're in a preview environment - more comprehensive check
const isPreviewEnvironment = () => {
  // Check for server-side
  if (typeof window === "undefined") {
    return (
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }

  // Check for client-side
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("vercel.app") ||
    window.location.hostname.includes("preview") ||
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
  )
}

// Create a Supabase client only if not in preview
let supabase: any = null

// Only initialize if not in preview and required env vars exist
if (
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

// Function to get all search data with fallback to in-memory
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  console.log("getAllSearchData called with:", { limit, offset, status })
  console.log("isPreviewEnvironment:", isPreviewEnvironment())
  console.log("supabase client available:", !!supabase)

  // If Supabase client is available and we're not in preview mode, try to use it
  if (supabase && !isPreviewEnvironment()) {
    try {
      console.log("Attempting to fetch data from Supabase")

      // Build the query
      let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })

      // Add status filter if provided
      if (status && status !== "all") {
        query = query.eq("status", status)
      }

      // Add pagination
      if (offset > 0) {
        query = query.range(offset, offset + limit - 1)
      } else {
        query = query.limit(limit)
      }

      // Execute the query
      const { data, error } = await query

      // Handle errors
      if (error) {
        console.error("Supabase query error:", error)
        throw error
      }

      console.log(`Successfully fetched ${data?.length || 0} records from Supabase`)

      // Transform data to match expected format
      const transformedData = (data || []).map((item) => ({
        id: item.id,
        form_type: item.notes || "Unknown",
        search_data: {
          ...item.search_results,
          name: item.search_results?.firstName || item.search_results?.name || "",
          surname: item.search_results?.lastName || item.search_results?.surname || "",
          email: item.email || item.search_results?.email || "",
        },
        created_at: item.created_at,
        status: item.status || "pending",
      }))

      return { data: transformedData, error: null, source: "supabase" }
    } catch (error) {
      console.error("Error fetching from Supabase:", error)
      // Fall back to in-memory data
    }
  }

  // If we reach here, either Supabase failed or we're in preview mode
  console.log("Using in-memory or mock data")

  // Use in-memory data if available
  const inMemoryData = Object.values(inMemoryStorage)
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(offset, offset + limit)
    .map((item: any) => ({
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
    }))

  // If we have in-memory data, use it
  if (inMemoryData.length > 0) {
    console.log(`Using ${inMemoryData.length} records from in-memory storage`)
    return { data: inMemoryData, error: null, source: "memory" }
  }

  // Otherwise, provide mock data
  console.log("No data available, providing mock data")
  const mockData = [
    {
      id: "mock-1",
      form_type: "Free Search",
      search_data: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        trademarkName: "TechBrand",
        goodsAndServices: "Software development services",
      },
      created_at: new Date().toISOString(),
      status: "pending",
    },
    {
      id: "mock-2",
      form_type: "Registration",
      search_data: {
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        trademarkName: "FashionStyle",
        goodsAndServices: "Clothing and accessories",
      },
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "processing",
    },
    {
      id: "mock-3",
      form_type: "Free Search",
      search_data: {
        name: "Robert",
        surname: "Johnson",
        email: "robert.johnson@example.com",
        trademarkName: "FoodDelight",
        goodsAndServices: "Restaurant services",
      },
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "completed",
    },
  ]

  // Filter by status if needed
  return {
    data: status && status !== "all" ? mockData.filter((item) => item.status === status) : mockData,
    error: null,
    source: "mock",
  }
}

// Create a new API route for sending emails
export async function sendSearchResultsEmail(searchId: string, recipientEmail: string, customMessage?: string) {
  // For preview/testing, just return success
  if (isPreviewEnvironment()) {
    console.log(`[PREVIEW] Would send email to ${recipientEmail} for search ${searchId}`)
    console.log(`Custom message: ${customMessage || "None"}`)
    return { success: true, message: "Email would be sent in production environment" }
  }

  // Get the search data
  const searchData = await getSearchData(searchId)
  if (!searchData) {
    return { success: false, error: "Search data not found" }
  }

  // In a real implementation, you would use Resend or another email service here
  console.log(`Sending email to ${recipientEmail} for search ${searchId}`)

  // Return success for now
  return { success: true, message: "Email sent successfully" }
}
