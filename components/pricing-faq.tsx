import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFAQ() {
  const faqs = [
    {
      question: "¿Qué incluye el proceso de registro de marca?",
      answer:
        "Nuestro proceso de registro de marca incluye una búsqueda exhaustiva, preparación y presentación de la solicitud, respuestas a las acciones oficiales y entrega del certificado de registro. Manejamos toda la documentación y comunicación con la oficina de marcas.",
    },
    {
      question: "¿Cuánto tiempo dura el proceso de registro de marca?",
      answer:
        "El proceso de registro de marca generalmente lleva 8-12 meses. Sin embargo, esto puede variar dependiendo de la complejidad de tu solicitud y cualquier posible acción oficial o oposición.",
    },
    {
      question: "¿Ofrecen reembolsos si mi solicitud de marca es rechazada?",
      answer:
        "Ofrecemos un garantía de reembolso si tu solicitud de marca es rechazada debido a un error por nuestra parte. Sin embargo, no podemos garantizar la aprobación ya que las decisiones finales las toma la oficina de marcas.",
    },
    {
      question: "¿Puedo actualizar mi plan más tarde?",
      answer:
        "Sí, puedes actualizar tu plan en cualquier momento. Ofrecemos opciones flexibles para adaptarse a las necesidades crecientes de tu negocio. Simplemente contacta a nuestro equipo de soporte, y te guiarán a través del proceso de actualización.",
    },
    {
      question: "¿Ofrecen registro internacional de marca?",
      answer:
        "Sí, ofrecemos servicios de registro internacional de marca. Nuestra red global te permite proteger tu marca en múltiples países. Los costos y procesos pueden variar dependiendo de los países específicos en los que estés interesado.",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-indigo-900">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
