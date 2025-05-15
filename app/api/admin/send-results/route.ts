import { NextResponse } from "next/server"
import { getSearchData, updateSearchStatus } from "@/lib/supabase"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { searchId } = body

    if (!searchId) {
      return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
    }

    // Get the search data
    const searchData = await getSearchData(searchId)

    if (!searchData) {
      return NextResponse.json({ error: "Search not found" }, { status: 404 })
    }

    // Extract email and other necessary data
    const email = searchData.email || searchData.search_results?.email || searchData.search_data?.email
    const name =
      searchData.search_data?.name ||
      searchData.search_results?.name ||
      searchData.search_results?.firstName ||
      "Cliente"
    const surname =
      searchData.search_data?.surname || searchData.search_results?.surname || searchData.search_results?.lastName || ""
    const trademarkName =
      searchData.search_data?.trademarkName ||
      searchData.search_data?.trademark_name ||
      searchData.trademark_name ||
      "su marca"

    // Get results data
    const results = searchData.results || {}
    const similarTrademarks = results.similarTrademarks || []
    const comments = results.comments || ""
    const recommendation = results.recommendation || ""
    const verificationToken = results.verificationToken || ""

    if (!email) {
      return NextResponse.json({ error: "No email found for this search" }, { status: 400 })
    }

    // Create verification links
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("origin") || "https://justprotected.com"

    // Direct search ID link (works without token)
    const searchResultsLink = `${baseUrl}/verification?search_id=${searchId}`

    // Token verification link (if token exists)
    const tokenVerificationLink = verificationToken ? `${baseUrl}/verification/${verificationToken}` : searchResultsLink

    // Prepare email content
    const emailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4a6cf7; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px; }
            .results { margin: 20px 0; }
            .trademark-list { margin: 10px 0; padding-left: 20px; }
            .button-container { text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Resultados de su búsqueda de marca</h1>
            </div>
            <div class="content">
              <p>Estimado/a ${name} ${surname},</p>
              
              <p>Hemos completado la búsqueda para su marca <strong>${trademarkName}</strong> y tenemos los resultados listos para usted.</p>
              
              <div class="results">
                ${
                  similarTrademarks.length > 0
                    ? `
                  <h3>Marcas similares encontradas:</h3>
                  <ul class="trademark-list">
                    ${similarTrademarks.map((tm) => `<li>${tm}</li>`).join("")}
                  </ul>
                `
                    : "<p>No se encontraron marcas similares.</p>"
                }
                
                ${
                  comments
                    ? `
                  <h3>Comentarios:</h3>
                  <p>${comments}</p>
                `
                    : ""
                }
                
                ${
                  recommendation
                    ? `
                  <h3>Recomendación:</h3>
                  <p>${recommendation}</p>
                `
                    : ""
                }
              </div>
              
              <p>Para ver los resultados completos y más detalles, utilice uno de los siguientes enlaces:</p>
              
              <div class="button-container">
                <a href="${searchResultsLink}" class="button">Ver resultados completos</a>
                
                ${
                  verificationToken
                    ? `<a href="${tokenVerificationLink}" class="button">Verificación por token</a>`
                    : ""
                }
              </div>
              
              <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en contactarnos.</p>
              
              <p>Atentamente,<br>El equipo de Just Protected</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Just Protected. Todos los derechos reservados.</p>
              <p>Este correo electrónico fue enviado a ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `

    console.log(`Sending email to ${email} for search ID ${searchId}`)
    console.log(`Search results link: ${searchResultsLink}`)
    console.log(`Token verification link: ${tokenVerificationLink}`)

    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: "Just Protected <no-reply@justprotected.com>",
        to: [email],
        subject: `Resultados de búsqueda para ${trademarkName}`,
        html: emailHtml,
      })

      if (error) {
        console.error("Error sending email with Resend:", error)
        return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 })
      }

      console.log("Email sent successfully:", data)

      // Update the search status to completed
      await updateSearchStatus(searchId, "completed")

      return NextResponse.json({
        success: true,
        message: `Results sent to ${email}`,
        emailId: data?.id,
      })
    } catch (emailError) {
      console.error("Exception sending email:", emailError)
      return NextResponse.json(
        {
          error: "Exception sending email",
          details: emailError instanceof Error ? emailError.message : String(emailError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in send-results API:", error)
    return NextResponse.json(
      {
        error: "Error sending search results",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
