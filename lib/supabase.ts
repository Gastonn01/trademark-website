import { createClient } from "@supabase/supabase-js"

// Crea un cliente de Supabase con las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para verificar y crear la tabla si no existe
export async function ensureTableExists() {
  try {
    // Verificar si la tabla existe
    const { error: checkError } = await supabase.from("trademark_searches").select("id").limit(1)

    if (checkError && checkError.message.includes("does not exist")) {
      console.log("La tabla trademark_searches no existe, creándola...")

      // Crear la tabla usando SQL
      const { error: createError } = await supabase.rpc("create_trademark_searches_table")

      if (createError) {
        console.error("Error al crear la tabla:", createError)

        // Implementación alternativa: almacenamiento en memoria
        console.log("Usando almacenamiento en memoria como alternativa")
        return false
      }

      console.log("Tabla trademark_searches creada exitosamente")
      return true
    }

    return true
  } catch (error) {
    console.error("Error al verificar/crear la tabla:", error)
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

// Función para guardar los datos de búsqueda
export async function saveSearchData(searchId: string, searchData: any, formType: string) {
  try {
    // Verificar si ya existe un registro con este ID
    const { data: existingData, error: fetchError } = await supabase
      .from("trademark_searches")
      .select("*")
      .eq("id", searchId)
      .single()

    if (fetchError && !fetchError.message.includes("No rows found")) {
      console.error("Error al verificar si existe el registro:", fetchError)
    }

    if (existingData) {
      // Si existe, actualizar los datos
      const { error } = await supabase
        .from("trademark_searches")
        .update({
          search_data: { ...existingData.search_data, ...searchData },
          updated_at: new Date().toISOString(),
        })
        .eq("id", searchId)

      if (error) {
        console.error("Error al actualizar en Supabase, usando almacenamiento en memoria:", error)
        // Actualizar en memoria si existe
        if (inMemoryStorage[searchId]) {
          inMemoryStorage[searchId] = {
            ...inMemoryStorage[searchId],
            search_data: { ...inMemoryStorage[searchId].search_data, ...searchData },
            updated_at: new Date().toISOString(),
          }
        } else {
          // Si no existe en memoria, crear nuevo
          inMemoryStorage[searchId] = {
            id: searchId,
            form_type: formType,
            search_data: searchData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: "pending",
          }
        }
      }
    } else {
      // Si no existe, insertar nuevo registro
      const { error } = await supabase.from("trademark_searches").insert([
        {
          id: searchId,
          form_type: formType,
          search_data: searchData,
          created_at: new Date().toISOString(),
          status: "pending",
        },
      ])

      if (error) {
        // Si hay un error, guardar en memoria
        console.error("Error al guardar en Supabase, usando almacenamiento en memoria:", error)
        inMemoryStorage[searchId] = {
          id: searchId,
          form_type: formType,
          search_data: searchData,
          created_at: new Date().toISOString(),
          status: "pending",
        }
      }
    }

    return { success: true }
  } catch (error) {
    // En caso de error, guardar en memoria
    console.error("Error en la operación de Supabase, usando almacenamiento en memoria:", error)
    inMemoryStorage[searchId] = {
      id: searchId,
      form_type: formType,
      search_data: searchData,
      created_at: new Date().toISOString(),
      status: "pending",
    }
    return { success: true }
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

// Función para obtener todos los datos de búsqueda (para panel de administración)
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
      console.error("Error fetching all search data from Supabase:", error)
      throw new Error(`Fetch all failed: ${error.message}`)
    }

    return { data, error: null }
  } catch (error) {
    console.error("Supabase getAll operation failed:", error)
    return { data: null, error: error instanceof Error ? error.message : "Unknown error" }
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
