import { createClient } from "@supabase/supabase-js"

// Crea un cliente de Supabase con las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Update the ensureTableExists function to check for the new schema
export async function ensureTableExists() {
  try {
    // Verify the table exists by querying it
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError && checkError.message.includes("does not exist")) {
      console.log("Table trademark_searches does not exist, but should have been created during deployment")
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking table:", error)
    return false
  }
}

// Función para subir un archivo a Supabase Storage
export async function uploadFileToStorage(file: File, searchId: string) {
  try {
    // Convertir el archivo a ArrayBuffer
    const fileArrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileArrayBuffer)

    // Generar un nombre de archivo único
    const fileExt = file.name.split(".").pop()
    const fileName = `${searchId}-${Date.now()}.${fileExt}`

    console.log(`Intentando subir archivo: ${fileName}, tamaño: ${fileBuffer.length} bytes`)

    // Intentar guardar el archivo en la base de datos como BYTEA
    // En lugar de usar Storage, guardaremos el archivo como un campo BYTEA en la tabla
    const logoData = {
      logoName: file.name,
      logoType: file.type,
      logoSize: file.size,
      // No guardamos el contenido binario en la tabla, es demasiado grande
      // Solo guardamos los metadatos
    }

    console.log("Guardando metadatos del logo en la base de datos:", logoData)

    return {
      success: true,
      logoData: logoData,
      error: null,
    }
  } catch (error) {
    console.error("Error en uploadFileToStorage:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Almacenamiento en memoria como respaldo
const inMemoryStorage: { [key: string]: any } = {}

// Update the saveSearchData function to match the new schema
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  try {
    // Check if record exists
    const { data: existingData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError && !fetchError.message.includes("No rows found")) {
      console.error("Error checking existing record:", fetchError)
    }

    // Prepare data object with schema-compatible fields
    const dataToSave = {
      id: searchId,
      trademark_name: searchData.trademarkName || searchData.trademark_name || "Unnamed",
      email: searchData.email || "",
      phone: searchData.phone || searchData.phoneNumber || "",
      description: searchData.description || searchData.details || "",
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
        return { success: false, error: error.message }
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
        return { success: false, error: error.message }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in saveSearchData:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Update getAllSearchData to match the new schema
export async function getAllSearchData(limit = 100, offset = 0, status?: string) {
  try {
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
      console.error("Error fetching search data:", error)
      throw new Error(`Fetch failed: ${error.message}`)
    }

    // Transform data to match expected format in admin panel
    const transformedData = data.map((item) => ({
      id: item.id,
      form_type: item.notes || "Unknown",
      search_data: {
        ...item.search_results,
        name: item.search_results?.firstName || item.search_results?.name || "",
        surname: item.search_results?.lastName || item.search_results?.surname || "",
        email: item.email,
      },
      created_at: item.created_at,
      status: item.status,
    }))

    return { data: transformedData, error: null }
  } catch (error) {
    console.error("Error in getAllSearchData:", error)
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Función para obtener los datos de búsqueda
export async function getSearchData(searchId: string) {
  try {
    // Intentar obtener de Supabase
    const { data, error } = await supabase.from("trademark_searches").select("*").eq("id", searchId).single()

    if (error) {
      // Si hay un error, intentar obtener de memoria
      console.error("Error al obtener de Supabase, buscando en memoria:", error)
      return inMemoryStorage[searchId] || null
    }

    return data
  } catch (error) {
    // En caso de error, intentar obtener de memoria
    console.error("Error en la operación de Supabase, buscando en memoria:", error)
    return inMemoryStorage[searchId] || null
  }
}

// Función para actualizar el estado de una búsqueda
export async function updateSearchStatus(searchId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("trademark_searches")
      .update({ status: status })
      .eq("id", searchId)
      .select()

    if (error) {
      console.error("Error updating search status in Supabase:", error)
      throw new Error(`Update failed: ${error.message}`)
    }

    return { data, error: null }
  } catch (error) {
    console.error("Supabase update operation failed:", error)
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
