import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { descripcion } = await request.json()

    if (!descripcion) {
      return NextResponse.json(
        {
          clases_recomendadas: [],
          explicacion: "Descripción requerida para generar recomendaciones.",
        },
        { status: 400 },
      )
    }

    // Verificar si Groq está configurado
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        clases_recomendadas: [],
        explicacion:
          "Servicio de IA temporalmente no disponible. Por favor, selecciona manualmente las clases apropiadas.",
      })
    }

    const prompt = `
Eres un experto en clasificación de marcas según el sistema de Niza. Analiza la siguiente descripción de negocio y recomienda las clases más apropiadas.

Descripción del negocio: "${descripcion}"

Clases disponibles (1-45):
1. Productos químicos para industria, ciencia, fotografía, agricultura
2. Pinturas, barnices, lacas, colorantes
3. Cosméticos, perfumería, productos de tocador
4. Aceites industriales, lubricantes, combustibles
5. Productos farmacéuticos, médicos, veterinarios
6. Metales comunes, materiales de construcción metálicos
7. Máquinas, herramientas mecánicas, motores
8. Herramientas manuales, cuchillería
9. Aparatos científicos, informáticos, software, electrónicos
10. Aparatos médicos, quirúrgicos, ortopédicos
11. Aparatos de iluminación, calefacción, refrigeración
12. Vehículos, transporte
13. Armas, municiones, explosivos
14. Joyería, relojería, metales preciosos
15. Instrumentos musicales
16. Papel, productos de imprenta, material de oficina
17. Caucho, plásticos, materiales aislantes
18. Cuero, equipaje, paraguas
19. Materiales de construcción no metálicos
20. Muebles, espejos, marcos
21. Utensilios domésticos, cocina, limpieza
22. Cuerdas, redes, tiendas de campaña
23. Hilos textiles
24. Tejidos, ropa de hogar
25. Ropa, calzado, sombreros
26. Encajes, botones, agujas, flores artificiales
27. Alfombras, tapices, revestimientos de suelo
28. Juegos, juguetes, artículos deportivos
29. Carne, pescado, conservas, productos lácteos
30. Café, té, cereales, panadería, confitería
31. Productos agrícolas, semillas, plantas
32. Cervezas, bebidas sin alcohol, aguas
33. Bebidas alcohólicas (excepto cervezas)
34. Tabaco, artículos para fumadores
35. Publicidad, gestión comercial, administración
36. Seguros, finanzas, inmobiliaria
37. Construcción, instalación, reparación
38. Telecomunicaciones
39. Transporte, embalaje, almacenamiento, viajes
40. Tratamiento de materiales, reciclaje
41. Educación, entretenimiento, actividades culturales
42. Servicios científicos, tecnológicos, investigación
43. Restauración, hospedaje temporal
44. Servicios médicos, veterinarios, belleza
45. Servicios jurídicos, seguridad, servicios personales

Responde SOLO con un JSON válido en este formato exacto:
{
  "clases_recomendadas": [número1, número2, número3],
  "explicacion": "Breve explicación de por qué estas clases son apropiadas para este negocio"
}

Máximo 3 clases recomendadas. Sé preciso y específico. IMPORTANTE: Responde ÚNICAMENTE con el JSON, sin texto adicional.`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      return NextResponse.json({
        clases_recomendadas: [],
        explicacion:
          "No se recibió respuesta del servicio de IA. Por favor, selecciona manualmente las clases apropiadas.",
      })
    }

    // Limpiar la respuesta para extraer solo el JSON
    let cleanResponse = response.trim()

    // Buscar el JSON en la respuesta
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanResponse = jsonMatch[0]
    }

    // Intentar parsear la respuesta JSON
    try {
      const jsonResponse = JSON.parse(cleanResponse)

      // Validar que la respuesta tenga la estructura correcta
      if (!jsonResponse.clases_recomendadas || !Array.isArray(jsonResponse.clases_recomendadas)) {
        throw new Error("Estructura de respuesta inválida")
      }

      // Validar que las clases sean números válidos entre 1 y 45
      const clasesValidas = jsonResponse.clases_recomendadas.filter(
        (clase: any) => typeof clase === "number" && clase >= 1 && clase <= 45,
      )

      return NextResponse.json({
        clases_recomendadas: clasesValidas.slice(0, 3), // Máximo 3 clases
        explicacion: jsonResponse.explicacion || "Clases recomendadas basadas en la descripción de tu negocio.",
      })
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError, "Response:", response)

      // Fallback: intentar extraer números de la respuesta
      const numeros = response.match(/\b([1-9]|[1-3][0-9]|4[0-5])\b/g)
      const clasesExtraidas = numeros ? numeros.slice(0, 3).map((n) => Number.parseInt(n)) : []

      return NextResponse.json({
        clases_recomendadas: clasesExtraidas,
        explicacion:
          "Se generaron recomendaciones basadas en tu descripción. Revisa si son apropiadas para tu negocio.",
      })
    }
  } catch (error) {
    console.error("Error en recommend-classes:", error)

    // Asegurar que siempre devolvemos JSON válido
    return NextResponse.json(
      {
        clases_recomendadas: [],
        explicacion:
          "Error al generar recomendaciones con IA. Por favor, selecciona manualmente las clases apropiadas o intenta nuevamente.",
      },
      { status: 500 },
    )
  }
}
