import { type NextRequest, NextResponse } from "next/server"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters with defaults
    const text = searchParams.get("text") || "Placeholder Image"
    const width = Number.parseInt(searchParams.get("width") || "800", 10)
    const height = Number.parseInt(searchParams.get("height") || "450", 10)
    const bg = searchParams.get("bg") || "#f3f4f6"
    const fg = searchParams.get("fg") || "#4b5563"

    // Create the image
    const image = new ImageResponse(
      <div
        style={{
          display: "flex",
          fontSize: Math.max(20, Math.min(width, height) / 10),
          color: fg,
          background: bg,
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "40px",
        }}
      >
        <div style={{ maxWidth: "80%", wordWrap: "break-word" }}>{text}</div>
      </div>,
      {
        width,
        height,
      },
    )

    return image
  } catch (error) {
    console.error("Error generating placeholder:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
