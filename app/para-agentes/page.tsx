import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AgentContactForm } from "@/components/agent-contact-form"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"
import { Shield, TrendingUp, Users, Award, CheckCircle, Star } from "lucide-react"

export default function ParaAgentesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTopOnMount />
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.15)_1px,transparent_0)] [background-size:24px_24px] opacity-20"></div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-medium mb-8">
                <Shield className="w-4 h-4 mr-2" />
                Red verificada de agentes profesionales
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Únete a la red de
                <span className="block text-slate-700">agentes líder</span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Conecta con emprendedores que buscan servicios profesionales de registro de marcas. Expande tu práctica
                sin invertir en marketing.
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-slate-200">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">Red</div>
                    <div className="text-slate-600 font-medium">Verificada</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
                    <div className="text-slate-600 font-medium">Tasa de conversión</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">24h</div>
                    <div className="text-slate-600 font-medium">Tiempo de respuesta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">¿Por qué elegir Trakmar?</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Beneficios exclusivos para agentes de marcas profesionales
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Clientes Verificados</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Accede a leads de calidad que han pasado por nuestro proceso de verificación y están listos para
                    contratar servicios profesionales.
                  </p>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Crecimiento Garantizado</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Expande tu cartera de clientes sin invertir en marketing. Solo pagas una comisión cuando se concreta
                    exitosamente un caso.
                  </p>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                    <Award className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Perfil Verificado</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Tu perfil profesional será verificado y destacado, generando mayor confianza entre los potenciales
                    clientes.
                  </p>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                    <Shield className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Independencia Total</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Mantén tu autonomía profesional. Estableces tus tarifas, condiciones y decides qué casos tomar según
                    tu especialidad.
                  </p>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors">
                    <CheckCircle className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Soporte Completo</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Recibe soporte técnico y administrativo completo, además de herramientas para optimizar tu trabajo.
                  </p>
                </div>

                <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                    <TrendingUp className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Sin Costos Fijos</h3>
                  <p className="text-slate-600 leading-relaxed">
                    No hay membresías ni costos fijos. Solo cobramos una comisión justa cuando se concreta exitosamente
                    un caso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Requisitos para Agentes</h2>
                <p className="text-xl text-slate-600">Mantenemos los más altos estándares de calidad profesional</p>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Matrícula Profesional Vigente</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Matrícula de agente de la propiedad industrial vigente en Argentina o el país donde ejerces tu
                        práctica profesional.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Experiencia Comprobable</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Mínimo 2 años de experiencia demostrable en registro de marcas y servicios de propiedad
                        intelectual.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Referencias Profesionales</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Proporcionar referencias verificables de clientes anteriores y casos exitosos en tu práctica
                        profesional.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Compromiso de Excelencia</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Adherir a nuestros estándares de servicio, tiempos de respuesta y código de ética profesional
                        establecidos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Testimonios de Agentes</h2>
                <p className="text-xl text-slate-600">Lo que dicen los profesionales que forman parte de nuestra red</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                    "Trakmar me ha permitido conectar con clientes de alta calidad que realmente valoran el servicio
                    profesional. La plataforma es intuitiva y el soporte excepcional."
                  </p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 text-lg">
                      MR
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg">María Rodríguez</h4>
                      <p className="text-slate-500">Agente de Marcas • Buenos Aires</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                    "Desde que me uní a la red de Trakmar, he incrementado mis clientes en un 40%. La verificación
                    profesional genera mucha confianza en el mercado."
                  </p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 text-lg">
                      CL
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg">Carlos López</h4>
                      <p className="text-slate-500">Agente de Marcas • Córdoba</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Únete a Nuestra Red</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo para iniciar el proceso de verificación y
                  onboarding.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <AgentContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
