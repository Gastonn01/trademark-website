import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export function getSupabaseClient() {
  return supabase
}

// Non-fatal existence check — table creation is a one-time step run via
// supabase-setup.sql in the Supabase SQL Editor, not from application code
// (the anon key can't run DDL, and the old RPC-based auto-create approach
// referenced a function name that was never actually deployed).
export async function ensureTablesExist() {
  try {
    const { error } = await supabase.from("trademark_searches").select("id").limit(1)
    if (error) {
      console.error("[ensureTablesExist] table check failed (insert will be attempted anyway):", error.message)
    }
  } catch (error) {
    console.error("[ensureTablesExist] check failed:", error instanceof Error ? error.message : error)
  }
  return true
}

// Flattens whatever shape each call site historically used into the single
// row shape components/admin-panel.tsx actually reads (SearchData interface).
// Two call conventions are supported:
//   saveSearchData(rawFormObject)                    — legacy 1-arg (submit-verification)
//   saveSearchData(id, rawFormObject, formType)       — 3-arg (submit-free-search, submit-registration-info)
function normalizeSearchRow(id: string, formType: string, raw: Record<string, any>) {
  const parseMaybeJson = (v: unknown) => {
    if (typeof v !== "string") return v ?? null
    try {
      return JSON.parse(v)
    } catch {
      return v
    }
  }
  const table_type = formType === "registration_info" ? "verification_requests" : "trademark_searches"
  return {
    id,
    trademark_name: raw.trademarkName ?? raw.trademark_name ?? raw.brandName ?? null,
    email: raw.email ?? null,
    name: raw.name ?? null,
    surname: raw.surname ?? null,
    status: raw.status ?? "pending",
    search_results: raw,
    table_type,
    form_type: formType,
    estimated_price: raw.estimatedPrice ?? raw.estimated_price ?? null,
    files_count: Array.isArray(raw.files) ? raw.files.length : (raw.files_count ?? null),
    selected_countries: parseMaybeJson(raw.countries ?? raw.selected_countries),
    selected_classes: parseMaybeJson(raw.selectedClasses ?? raw.selected_classes),
    trademark_type: raw.trademarkType ?? raw.trademark_type ?? null,
    contact_phone: raw.phone ?? raw.contact_phone ?? null,
    marketing_consent: raw.marketing === "true" || raw.marketing === true || null,
  }
}

export async function saveSearchData(idOrData: string | Record<string, any>, maybeData?: Record<string, any>, formType?: string) {
  try {
    await ensureTablesExist()

    let id: string
    let raw: Record<string, any>
    let type: string
    if (typeof idOrData === "string") {
      id = idOrData
      raw = maybeData ?? {}
      type = formType ?? "unknown"
    } else {
      raw = idOrData
      id = raw.id ?? crypto.randomUUID()
      type = raw.formType ?? raw.form_type ?? "verification"
    }

    const row = normalizeSearchRow(id, type, raw)
    const { data, error } = await supabase.from("trademark_searches").upsert([row]).select()

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

export async function getAllSearches(tableType: "trademark_searches" | "verification_requests" | "all" = "all") {
  try {
    let query = supabase.from("trademark_searches").select("*").order("created_at", { ascending: false })
    if (tableType !== "all") {
      query = query.eq("table_type", tableType)
    }
    const { data, error } = await query

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

// Alias exports for backward compatibility
export const getSearchData = getSearchById
export const ensureTableExists = ensureTablesExist
export const getAllSearchData = getAllSearches
export const ensureTrademarkSearchesTableExists = ensureTablesExist
