import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get Supabase client
export function getSupabaseClient() {
  return supabase
}

// Ensure tables exist
export async function ensureTablesExist() {
  try {
    // Check if trademark_searches table exists
    const { data, error } = await supabase.from("trademark_searches").select("id").limit(1)

    if (error && error.code === "PGRST116") {
      // Table doesn't exist, create it
      const { error: createError } = await supabase.rpc("create_trademark_searches_table_if_not_exists")
      if (createError) {
        console.error("Error creating table:", createError)
        throw createError
      }
    }

    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    throw error
  }
}

// Save search data
export async function saveSearchData(searchData: any) {
  try {
    await ensureTablesExist()

    const { data, error } = await supabase.from("trademark_searches").insert([searchData]).select()

    if (error) {
      console.error("Error saving search data:", error)
      throw error
    }

    return data[0]
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    throw error
  }
}

// Update search status
export async function updateSearchStatus(searchId: string, status: string, results?: any) {
  try {
    const updateData: any = { status }
    if (results) {
      updateData.search_data = results
    }

    const { data, error } = await supabase.from("trademark_searches").update(updateData).eq("id", searchId).select()

    if (error) {
      console.error("Error updating search status:", error)
      throw error
    }

    return data[0]
  } catch (error) {
    console.error("Error in updateSearchStatus:", error)
    throw error
  }
}

// Get search by ID
export async function getSearchById(searchId: string) {
  try {
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      console.error("Error getting search by ID:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getSearchById:", error)
    throw error
  }
}

// Delete search
export async function deleteSearch(searchId: string) {
  try {
    const { error } = await supabase.from("trademark_searches").delete().eq("id", searchId)

    if (error) {
      console.error("Error deleting search:", error)
      throw error
    }

    return true
  } catch (error) {
    console.error("Error in deleteSearch:", error)
    throw error
  }
}

// Get all searches
export async function getAllSearches() {
  try {
    const { data, error } = await supabase
      .from("trademark_searches")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error getting all searches:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getAllSearches:", error)
    throw error
  }
}

// Alias exports for compatibility
export const getSearchData = getSearchById
export const ensureTableExists = ensureTablesExist
export const getAllSearchData = getAllSearches
export const ensureTrademarkSearchesTableExists = ensureTablesExist
