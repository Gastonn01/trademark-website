"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleProcesoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const procesoSection = document.getElementById("proceso")
    if (procesoSection) {
      procesoSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
  }

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Proceso", href: "/#proceso", onClick: handleProcesoClick },
    { name: "Para Agentes", href: "/para-agentes" },
    { name: "Estudio de Factibilidad", href: "/estudio-factibilidad" },
    { name: "Contacto", href: "/contact" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Trakmar</span>
              <span className="ml-1 text-xs font-medium text-slate-500 tracking-wide">®</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/registro-marca">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Solicitar Marca</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={item.onClick}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Link href="/registro-marca" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Solicitar Marca</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
