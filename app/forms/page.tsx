import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { RegistrationInfoForm } from "./components/RegistrationInfoForm"

export default function FormsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get token from URL if available
  const token = typeof searchParams.token === "string" ? searchParams.token : undefined

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Trademark Registration Information</h1>
            <p className="text-gray-600 mb-8">
              Please provide the required information and documents for your trademark registration.
            </p>

            <RegistrationInfoForm token={token} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
