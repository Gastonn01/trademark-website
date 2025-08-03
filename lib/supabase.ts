import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export function getSupabaseClient() {
  return supabase
}

export async function ensureTablesExist() {
  try {
    const { error } = await supabase.rpc("create_trademark_searches_table_if_not_exists")
    if (error) {
      console.error("Error creating table:", error)
      throw error
    }
    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    throw error
  }
}

export async function ensureTrademarkSearchesTableExists() {
  return ensureTablesExist()
}

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

export async function updateSearchStatus(searchId: string, status: string) {
  try {
    const { data, error } = await supabase.from("trademark_searches").update({ status }).eq("id", searchId).select()

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

export async function getSearchData(searchId: string) {
  return getSearchById(searchId)
}

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

export async function getAllSearchData() {
  return getAllSearches()
}

export function ensureTableExists() {
  return ensureTablesExist()
}
