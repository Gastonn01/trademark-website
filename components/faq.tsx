"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cuánto tiempo toma solicitar una marca?",
      answer:
        "El proceso completo de solicitud de marca en Argentina típicamente toma entre 12 a 18 meses. Esto incluye el período de examen por parte del INPI, la publicación en el Boletín de Marcas y el período de oposición. Nuestros agentes te mantendrán informado durante todo el proceso.",
    },
    {
      question: "¿Qué incluye el servicio de solicitud completa?",
      answer:
        "Nuestro servicio incluye búsqueda exhaustiva de antecedentes, preparación y presentación de la solicitud, seguimiento durante todo el proceso, respuesta a observaciones del INPI si las hubiera, y entrega del certificado oficial de registro. También incluye asesoría legal especializada durante todo el proceso.",
    },
    {
      question: "¿Cómo seleccionan a los agentes de su red?",
      answer:
        "Todos nuestros agentes deben tener matrícula vigente como agentes de la propiedad industrial, mínimo 2 años de experiencia comprobable, referencias profesionales verificables y adherir a nuestros estándares de calidad y tiempos de respuesta. Realizamos un proceso de verificación riguroso antes de incorporarlos a la red.",
    },
    {
      question: "¿Qué pasa si mi solicitud de marca es rechazada?",
      answer:
        "Si tu solicitud es rechazada, nuestros agentes analizarán las razones del rechazo y te asesorarán sobre las opciones disponibles, que pueden incluir presentar argumentos de respuesta, modificar la solicitud o explorar alternativas. El costo de estos servicios adicionales se discutirá previamente contigo.",
    },
    {
      question: "¿Puedo solicitar mi marca en otros países?",
      answer:
        "Sí, muchos de nuestros agentes tienen experiencia en solicitud internacional de marcas. Pueden asesorarte sobre el Protocolo de Madrid para solicitud internacional o sobre solicitud directa en países específicos según tus necesidades comerciales.",
    },
    {
      question: "¿Qué es el servicio de monitoreo de marcas?",
      answer:
        "Nuestro servicio de monitoreo vigila continuamente nuevas solicitudes de marca que puedan ser similares a la tuya. Te alertamos sobre posibles conflictos para que puedas tomar acción temprana si es necesario, protegiendo así tu inversión en la marca solicitada.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Preguntas Frecuentes</h2>
            <p className="text-xl text-slate-600">Respuestas a las dudas más comunes sobre la solicitud de marcas</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-blue-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-8 pb-6 bg-blue-50">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">¿No encuentras la respuesta que buscas?</p>
            <a
              href="/contact"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Contacta con nuestro equipo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
