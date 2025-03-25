import { NextResponse } from "next/server"
import { Resend } from "resend"
import { v4 as uuidv4 } from "uuid"

const resend = new Resend(process.env.RESEND_API_KEY)

// This should be replaced with a proper database in a production environment
const searchResults: { [key: string]: any } = {}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.formData()
    const searchId = (formData.get("searchId") as string) || uuidv4()
    const formType = formData.get("formType")
    const files = formData.getAll("files") as File[]

    let emailBody = `New free search request received: ${formType}\n\n`
    const searchData: { [key: string]: any } = {}

    for (const [key, value] of formData.entries()) {
      if (key !== "files" && key !== "formType" && key !== "searchId") {
        emailBody += `${key}: ${value}\n`
        searchData[key] = value
      }
    }

    // Store search results
    searchResults[searchId] = searchData

    try {
      const attachments = await Promise.all(
        files.map(async (file) => {
          const content = await file.arrayBuffer()
          return {
            filename: file.name,
            content: Buffer.from(content),
          }
        }),
      )

      const validAttachments = attachments.filter((attachment) => attachment.content.byteLength > 0)

      const result = await resend.emails.send({
        from: "Just Protected <onboarding@resend.dev>",
        to: ["your-email@example.com"], // Replace with the actual email
        subject: `New free search request received: ${formType}`,
        text: emailBody,
        attachments: validAttachments,
      })

      // Send confirmation email to the user
      await resend.emails.send({
        from: "Just Protected <onboarding@resend.dev>",
        to: searchData.email,
        subject: "Your Free Trademark Search Results",
        html: `
         <h1>Your Free Trademark Search Results</h1>
         <p>Thank you for using our free trademark search service. Our experts are reviewing your request and will get back to you within 24 hours.</p>
         <p>To view your personalized results and continue with the registration process, please click the link below:</p>
         <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verification?search_id=${searchId}">View Your Results and Continue Registration</a>
       `,
      })

      return NextResponse.json({ message: "Form submitted successfully", searchId, result })
    } catch (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Error processing the form", details: error }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const searchId = searchParams.get("search_id")

  if (!searchId) {
    return NextResponse.json({ error: "Search ID is required" }, { status: 400 })
  }

  const searchData = searchResults[searchId]

  if (!searchData) {
    return NextResponse.json({ error: "Search results not found" }, { status: 404 })
  }

  return NextResponse.json(searchData)
}

