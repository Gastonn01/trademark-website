"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-semibold text-white tracking-tight">Trakmar</span>
              <span className="ml-1 text-xs font-medium text-slate-400 tracking-wide">®</span>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed max-w-md">
              Plataforma líder que conecta empresas con agentes especializados en propiedad intelectual. Facilitamos la
              solicitud de marcas con transparencia y profesionalismo.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-700 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div className="font-medium">trakmar@proton.me</div>
                </div>
              </div>
              <div className="flex items-center text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-700 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Teléfono</div>
                  <div className="font-medium">+54 11 4000-0000</div>
                </div>
              </div>
              <div className="flex items-center text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-700 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Ubicación</div>
                  <div className="font-medium">Buenos Aires, Argentina</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/registro-marca"
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span>Solicitud de Marcas</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/trademark-process"
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span>Consultoría Legal</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/para-agentes"
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span>Red de Agentes</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/trademark-monitoring"
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span>Monitoreo</span>
                  <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Información</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">© 2025 Trakmar. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400 text-sm">Hecho en Argentina</span>
            <div className="w-6 h-4 bg-gradient-to-b from-sky-400 via-white to-sky-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
