import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { put } from "@vercel/blob"
import { createClient } from "@supabase/supabase-js"
import { ensureTableExists, saveSearchData } from "@/lib/supabase"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    // Check if we're in a preview environment
    const isPreviewEnvironment =
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Generate a unique ID for this submission
    const submissionId = uuidv4()

    // Parse the form data
    const formData = await request.formData()

    // Extract owners data
    const ownersData: any[] = []
    const ownerCount = Number.parseInt(formData.get("ownerCount") as string) || 0

    for (let i = 0; i < ownerCount; i++) {
      const owner: any = {
        id: formData.get(`owners[${i}][id]`),
        type: formData.get(`owners[${i}][type]`),
        name: formData.get(`owners[${i}][name]`),
        country: formData.get(`owners[${i}][country]`),
        address: formData.get(`owners[${i}][address]`),
        email: formData.get(`owners[${i}][email]`),
        ownershipPercentage: Number.parseFloat(formData.get(`owners[${i}][ownershipPercentage]`) as string),
      }

      // Add optional fields if they exist
      if (formData.has(`owners[${i}][maritalStatus]`)) {
        owner.maritalStatus = formData.get(`owners[${i}][maritalStatus]`)
      }

      if (formData.has(`owners[${i}][translation]`)) {
        owner.translation = formData.get(`owners[${i}][translation]`)
      }

      if (formData.has(`owners[${i}][stateProvince]`)) {
        owner.stateProvince = formData.get(`owners[${i}][stateProvince]`)
      }

      if (formData.has(`owners[${i}][taxId]`)) {
        owner.taxId = formData.get(`owners[${i}][taxId]`)
      }

      // Handle documents
      const documentTypes = formData.getAll(`owners[${i}][documentTypes][]`) as string[]
      owner.documents = []

      for (const docType of documentTypes) {
        const file = formData.get(`owners[${i}][documents][${docType}]`) as File

        if (file && file.size > 0) {
          let fileUrl = ""

          // If not in preview, upload to Vercel Blob
          if (!isPreviewEnvironment) {
            try {
              const blob = await put(`registration-docs/${submissionId}/${owner.id}/${docType}-${file.name}`, file, {
                access: "private",
              })
              fileUrl = blob.url
            } catch (uploadError) {
              console.error("Error uploading file:", uploadError)
              fileUrl = "upload-failed"
            }
          } else {
            fileUrl = "preview-mode-no-upload"
          }

          owner.documents.push({
            type: docType,
            name: file.name,
            size: file.size,
            url: fileUrl,
          })
        }
      }

      ownersData.push(owner)
    }

    // Prepare data for storage
    const submissionData = {
      id: submissionId,
      owners: ownersData,
      created_at: new Date().toISOString(),
    }

    // Store in Supabase if not in preview
    if (!isPreviewEnvironment) {
      try {
        // Ensure the table exists
        await ensureTableExists()

        // Check if registration_info table exists, if not create it
        const { error: tableCheckError } = await supabase.from("registration_info").select("id").limit(1)

        if (tableCheckError) {
          // Table doesn't exist, create it
          const { error: createTableError } = await supabase.rpc("create_table_if_not_exists", {
            table_name: "registration_info",
            primary_key_column: "id",
            primary_key_type: "uuid",
          })

          if (createTableError) {
            console.error("Error creating table:", createTableError)
          }
        }

        // Insert data into the table
        const { error: insertError } = await supabase.from("registration_info").insert([
          {
            id: submissionId,
            data: submissionData,
            status: "pending",
          },
        ])

        if (insertError) {
          console.error("Error inserting data:", insertError)
          // Fall back to using the general saveSearchData function
          await saveSearchData(submissionId, submissionData, "registration_info")
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
      }
    } else {
      // In preview mode, just use the saveSearchData function
      await saveSearchData(submissionId, submissionData, "registration_info")
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Registration information submitted successfully",
      submissionId,
    })
  } catch (error) {
    console.error("Error processing registration info submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
