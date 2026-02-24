import { Badge } from "@/components/ui/badge"

export function TrademarkProcess() {
  return (
    <section className="bg-transparent">
      {/* Process Timeline */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Proceso de Registro Profesional</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un procedimiento estructurado y supervisado por profesionales certificados que garantiza la correcta
              tramitación de su solicitud ante el INPI.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Ficha de Cliente",
                description: "Ingresás tus datos personales, ya sea a través de nuestro sitio web o telefónicamente.",
                time: "5 minutos",
              },
              {
                step: "2",
                title: "Instrucciones",
                description:
                  "Luego de acreditado tu pago, el sistema te envía automáticamente un instructivo con la documentación que tendrás que enviarnos firmada.",
                time: "Inmediato",
              },
              {
                step: "3",
                title: "Inicio del Expediente",
                description:
                  "Luego de recibir tu documentación firmada, uno de nuestros abogados especialistas en Propiedad Intelectual iniciará la solicitud de registro de marca ante el INPI.",
                time: "2-3 días",
              },
              {
                step: "4",
                title: "Seguimiento del Trámite",
                description:
                  "El abogado a quien se asigne tu solicitud hará el debido seguimiento del trámite, publicación en el Boletín de Marcas, así como todas las acciones legales necesarias para obtener tu registro.",
                time: "12-18 meses",
              },
            ].map((item, index) => (
              <div key={index} className="text-center flex flex-col h-full">
                <div className="w-16 h-16 bg-sky-400 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm mb-4 flex-1">{item.description}</p>
                <Badge variant="outline" className="text-xs mx-auto">
                  ⏱️ {item.time}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Planes de Protección Legal</h3>
            <p className="text-gray-600">
              Seleccione el nivel de cobertura profesional que su empresa necesita para proteger su activo intangible
              más importante
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Características</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Básico</th>
                  <th className="text-center p-4 font-semibold text-gray-900 bg-blue-50">Estándar</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Plus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Precio", "$150.000", "$200.000", "$220.000"],
                  ["Presentación ante INPI", "✓", "✓", "✓"],
                  ["Tasas oficiales incluidas", "✓", "✓", "✓"],
                  ["Comprobante digital", "✓", "✓", "✓"],
                  ["Revisión de formulario", "No", "✓", "✓"],
                  ["Minimización de errores", "No", "✓", "✓"],
                  ["Vistas de admisión", "No", "No", "✓"],
                  ["Envío del título", "No", "No", "✓"],
                ].map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 font-medium text-gray-900">{row[0]}</td>
                    <td className="p-4 text-center text-gray-700">{row[1]}</td>
                    <td className="p-4 text-center text-gray-700 bg-blue-50">{row[2]}</td>
                    <td className="p-4 text-center text-gray-700">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
