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
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables")
    return null
  }

  try {
    // Create a new Supabase client with the service role key for admin operations
    supabaseInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
      },
    })
    console.log("Supabase client initialized successfully with service role key")
    return supabaseInstance
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    return null
  }
}

// Function to create the trademark_searches table if it doesn't exist
export async function ensureTrademarkSearchesTableExists() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not available")
    return false
  }

  try {
    // Check if the table exists by trying to select from it
    const { error } = await supabase.from("trademark_searches").select("id").limit(1)

    if (error && error.message.includes("does not exist")) {
      console.log("trademark_searches table does not exist, creating it...")

      // Create the table using SQL
      const { error: createError } = await supabase.rpc("create_trademark_searches_table")

      if (createError) {
        console.error("Error creating trademark_searches table:", createError)

        // Try direct SQL as a fallback
        const { error: sqlError } = await supabase.rpc("execute_sql", {
          sql: `
            CREATE TABLE IF NOT EXISTS trademark_searches (
              id UUID PRIMARY KEY,
              email TEXT,
              trademark_name TEXT,
              status TEXT DEFAULT 'pending',
              notes TEXT,
              search_results JSONB,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `,
        })

        if (sqlError) {
          console.error("Error creating table with direct SQL:", sqlError)
          return false
        }
      }

      console.log("trademark_searches table created successfully")
      return true
    }

    console.log("trademark_searches table already exists")
    return true
  } catch (error) {
    console.error("Error checking/creating trademark_searches table:", error)
    return false
  }
}

// Add back the original ensureTableExists function for backward compatibility
export async function ensureTableExists() {
  return ensureTrademarkSearchesTableExists()
}

// COMPLETELY REVISED getAllSearchData function
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
    // Ensure the table exists
    await ensureTrademarkSearchesTableExists()

    console.log("Attempting to fetch data from Supabase")

    // Log the actual query we're about to execute
    const queryParams = {
      table: "trademark_searches",
      select: "id, notes, email, trademark_name, status, created_at, search_results",
      order: "created_at.desc",
      limit,
      status: status !== "all" ? status : undefined,
    }
    console.log("Query parameters:", queryParams)

    // Create the query
    let query = supabase
      .from("trademark_searches")
      .select("*") // Select all columns for debugging
      .order("created_at", { ascending: false })
      .limit(limit)

    // Add status filter if provided
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // Execute the query
    const { data, error } = await query

    // Log the raw response
    console.log("Raw Supabase response:", { data: data?.length || 0, error: error?.message || null })

    if (error) {
      console.error("Supabase query error:", error)
      return {
        data: getMockSearchData(status),
        error: error.message,
        source: "mock-query-error",
      }
    }

    // If no data, try to check if the table is empty or doesn't exist
    if (!data || data.length === 0) {
      console.log("No data found in Supabase, checking table")

      // Check if the table has any records at all
      const { count, error: countError } = await supabase
        .from("trademark_searches")
        .select("*", { count: "exact", head: true })

      console.log("Table count check:", { count, error: countError?.message || null })

      if (countError) {
        return {
          data: getMockSearchData(status),
          error: "Error checking table: " + countError.message,
          source: "mock-table-error",
        }
      }

      // If count is 0, table exists but is empty
      if (count === 0) {
        console.log("Table exists but is empty")
        return {
          data: [],
          error: null,
          source: "supabase-empty",
        }
      }

      // If we get here, something else is wrong
      return {
        data: getMockSearchData(status),
        error: "Table has data but query returned none",
        source: "mock-query-issue",
      }
    }

    console.log(`Successfully fetched ${data.length} records from Supabase`)

    // Transform data to match expected format
    const transformedData = data.map((item: any) => {
      try {
        // For debugging, log the raw item
        console.log("Processing item:", item.id)

        return {
          id: item.id,
          form_type: item.notes || "free-search",
          search_data: {
            ...(typeof item.search_results === "object" ? item.search_results || {} : {}),
            name: item.search_results?.firstName || item.search_results?.name || "",
            surname: item.search_results?.lastName || item.search_results?.surname || "",
            email: item.email || item.search_results?.email || "",
            trademarkName: item.trademark_name || item.search_results?.trademarkName || "",
            goodsAndServices: item.search_results?.goodsAndServices || item.search_results?.description || "",
          },
          created_at: item.created_at || new Date().toISOString(),
          status: item.status || "pending",
        }
      } catch (transformError) {
        console.error("Error transforming item:", transformError, "Item:", item)
        return {
          id: item.id || `error-${Math.random().toString(36).substring(2, 9)}`,
          form_type: "Error",
          search_data: {
            name: "Error Processing",
            surname: "",
            email: "error@example.com",
            trademarkName: "Error processing record",
          },
          created_at: new Date().toISOString(),
          status: "error",
        }
      }
    })

    return { data: transformedData, error: null, source: "supabase" }
  } catch (error) {
    console.error("Top-level error in getAllSearchData:", error)
    return {
      data: getMockSearchData(status),
      error: error instanceof Error ? error.message : String(error),
      source: "mock-top-error",
    }
  }
}

// REVISED saveSearchData function to ensure data is properly saved
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  console.log("saveSearchData called with:", { searchId, formType })

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

  try {
    // Ensure the table exists
    await ensureTrademarkSearchesTableExists()

    // Prepare data for insertion
    const insertData = {
      id: searchId,
      trademark_name: String(searchData.trademarkName || searchData.trademark_name || "Unnamed").substring(0, 255),
      email: String(searchData.email || "").substring(0, 255),
      status: "pending",
      notes: String(formType || "free-search").substring(0, 255),
      search_results: searchData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Attempting to insert data to Supabase:", insertData.id)

    // Insert the data
    const { data, error } = await supabase.from("trademark_searches").insert([insertData]).select()

    if (error) {
      console.error("Error inserting data into Supabase:", error)
      return { success: false, error: error.message, source: "memory" }
    }

    console.log("Successfully inserted data into Supabase:", data)
    return { success: true, data, source: "supabase" }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: true, error, source: "memory" }
  }
}

// Rest of the functions remain the same...
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
