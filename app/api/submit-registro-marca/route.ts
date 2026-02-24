import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "Método no permitido", success: false }, { status: 405, headers })
    }

    let body
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Formato de datos inválido", success: false }, { status: 400, headers })
    }

    console.log("🏷️ Trademark registration received (payment pending):", body.nombreMarca)

    // Validate required fields
    if (!body.nombreMarca || !body.email || !body.plan) {
      return NextResponse.json({ error: "Campos requeridos faltantes", success: false }, { status: 400, headers })
    }

    // Try to save to database, but don't fail the request if it doesn't work
    const saveDatabaseInBackground = async () => {
      try {
        await sql`
          INSERT INTO trademark_registrations (
            nombre, apellido, razon_social, tipo_titular, email, telefono,
            cuit, dni, representante_legal, direccion, ciudad, provincia,
            codigo_postal, nombre_marca, tipo_marca, productos_servicios,
            logo_file_name, clases_seleccionadas, plan, payment_status
          )
          VALUES (
            ${body.nombre || null}, ${body.apellido || null}, ${body.razonSocial || null},
            ${body.tipoTitular || null}, ${body.email}, ${body.telefono || null},
            ${body.cuit || null}, ${body.dni || null}, ${body.representanteLegal || null},
            ${body.direccion || null}, ${body.ciudad || null}, ${body.provincia || null},
            ${body.codigoPostal || null}, ${body.nombreMarca}, ${body.tipoMarca || null},
            ${body.productosServicios || null}, ${body.logoFileName || null},
            ${body.clasesSeleccionadas ? JSON.stringify(body.clasesSeleccionadas) : null}::text[],
            ${body.plan}, 'pending'
          )
        `
        console.log("✅ Trademark registration saved to database (payment pending)")
      } catch (dbError: any) {
        console.log("⚠️ Database not available:", dbError?.message)
      }
    }

    saveDatabaseInBackground().catch(() => {})

    return NextResponse.json(
      {
        message: "Datos recibidos, proceda al pago",
        success: true,
      },
      { headers },
    )
  } catch (error) {
    console.error("❌ Unexpected error in trademark registration:", error)

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        success: false,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers },
    )
  }
}
