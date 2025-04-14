"use client"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AdminPanel } from "@/components/admin-panel"

export default function AdminPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Panel de Administración</h1>
        <AdminPanel />
      </div>
      <Footer />
    </main>
  )
}
