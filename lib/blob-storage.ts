import { put } from "@vercel/blob"

export async function uploadToBlob(file: File): Promise<string> {
  try {
    console.log(`🔄 Starting blob upload for: ${file.name} (${file.size} bytes)`)

    // Generate a unique filename to avoid conflicts
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop() || "bin"
    const uniqueFilename = `verification-files/${timestamp}-${randomString}.${fileExtension}`

    console.log(`📝 Generated unique filename: ${uniqueFilename}`)

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    })

    console.log(`✅ Blob upload successful: ${blob.url}`)
    return blob.url
  } catch (error) {
    console.error(`❌ Blob upload failed for ${file.name}:`, error)
    throw new Error(`Failed to upload file ${file.name}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Helper function to get file extension
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "bin"
}

// Helper function to validate file type
export function isValidFileType(filename: string): boolean {
  const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx", "txt"]
  const extension = getFileExtension(filename)
  return allowedExtensions.includes(extension)
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
