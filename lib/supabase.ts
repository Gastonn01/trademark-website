import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// In-memory storage as fallback
const inMemorySearches: any[] = []

// Enhanced saveSearchData function with proper Supabase integration
export async function saveSearchData(searchData: any): Promise<boolean> {
  console.log("=== saveSearchData called ===")
  console.log("Data to save:", JSON.stringify(searchData, null, 2))

  try {
    // Prepare data for Supabase
    const supabaseData = {
      email: searchData.email || "",
      trademark_name: searchData.trademarkName || "",
      status: "pending",
      form_type: searchData.formType || "free-search",
      search_results: searchData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Prepared Supabase data:", JSON.stringify(supabaseData, null, 2))

    // Try to save to Supabase first
    const { data, error } = await supabase.from("trademark_searches").insert([supabaseData]).select()

    if (error) {
      console.error("Supabase insert error:", error)
      console.log("Falling back to in-memory storage")

      // Fallback to in-memory storage
      const fallbackData = {
        id: `mem-${Date.now()}`,
        ...supabaseData,
      }
      inMemorySearches.push(fallbackData)
      console.log("Saved to in-memory storage:", fallbackData.id)
      return true
    }

    console.log("Successfully saved to Supabase:", data)
    return true
  } catch (error) {
    console.error("Critical error in saveSearchData:", error)

    // Fallback to in-memory storage
    const fallbackData = {
      id: `mem-${Date.now()}`,
      email: searchData.email || "",
      trademark_name: searchData.trademarkName || "",
      status: "pending",
      form_type: searchData.formType || "free-search",
      search_results: searchData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    inMemorySearches.push(fallbackData)
    console.log("Saved to in-memory storage after error:", fallbackData.id)
    return true
  }
}

// Enhanced getAllSearchData function with real Supabase integration
export async function getAllSearchData(): Promise<any[]> {
  console.log("=== getAllSearchData called ===")

  try {
    // Try to get data from Supabase first
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase fetch error:", error)
      console.log("Falling back to in-memory data")
      return inMemorySearches
    }

    if (!data || data.length === 0) {
      console.log("No data in Supabase, returning in-memory data")
      return inMemorySearches
    }

    console.log(`Successfully fetched ${data.length} records from Supabase`)
    return data
  } catch (error) {
    console.error("Critical error in getAllSearchData:", error)
    console.log("Returning in-memory data")
    return inMemorySearches
  }
}

// Function to get search data by ID
export async function getSearchDataById(id: string): Promise<any | null> {
  try {
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching search by ID:", error)
      // Try in-memory fallback
      return inMemorySearches.find((search) => search.id === id) || null
    }

    return data
  } catch (error) {
    console.error("Critical error in getSearchDataById:", error)
    return inMemorySearches.find((search) => search.id === id) || null
  }
}

// Function to update search status
export async function updateSearchStatus(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("trademark_searches")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating search status:", error)
      // Try in-memory fallback
      const memoryIndex = inMemorySearches.findIndex((search) => search.id === id)
      if (memoryIndex !== -1) {
        inMemorySearches[memoryIndex].status = status
        inMemorySearches[memoryIndex].updated_at = new Date().toISOString()
        return true
      }
      return false
    }

    return true
  } catch (error) {
    console.error("Critical error in updateSearchStatus:", error)
    return false
  }
}

// Create admin client for server-side operations
export function createSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
