import { RegistroMarcaForm } from "./components/RegistroMarcaForm"
import { NavBar } from "@/components/nav-bar"

export default function RegistroMarcaPage({ searchParams }: { searchParams: { plan?: string } }) {
  const selectedPlan = searchParams.plan || undefined

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10 px-4">
        <RegistroMarcaForm selectedPlan={selectedPlan} />
      </div>
    </>
  )
}
