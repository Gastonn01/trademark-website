import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, AlertTriangle, TrendingUp, Clock } from "lucide-react"

export const metadata = {
  title: "Register a Trademark in Brazil: What You Need to Know (2024)",
  description:
    "Brazil's trademark landscape is complex and competitive. Learn why professional guidance is essential for protecting your brand in South America's largest market.",
  keywords:
    "Brazil trademark registration, Brazilian IP law, INPI, brand protection Brazil, intellectual property Brazil, trademark filing Brazil",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-brazil/",
  },
}

export default function RegisterTrademarkBrazil() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Registering a Trademark in Brazil: Navigate the Complexity
            </h1>
            <p className="text-xl text-blue-100 mb-8 text-pretty">
              Brazil's trademark system is notoriously complex. Here's what you need to know to protect your brand in
              South America's largest economy.
            </p>
            <p className="text-sm text-blue-200">
              Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Key Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-700 mb-2">24-36 months</div>
            <div className="text-gray-600">Average processing time</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-700 mb-2">68%</div>
            <div className="text-gray-600">Applications face objections</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-700 mb-2">220M+</div>
            <div className="text-gray-600">Consumers in Brazilian market</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          {/* Why Brazil Matters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="text-blue-600" />
              Why Brazil Demands Serious Trademark Protection
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Brazil represents one of the world's most dynamic emerging markets, with over 220 million consumers and a
              rapidly growing e-commerce sector. However, the trademark landscape is uniquely challenging.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
              <p className="text-gray-800 font-medium mb-2">Brazil operates on a strict first-to-file system:</p>
              <p className="text-gray-700">
                Unlike the US where use matters, in Brazil whoever files first owns the trademark—regardless of who used
                it first. This creates a highly competitive filing environment where trademark squatting is common.
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Instituto Nacional da Propriedade Industrial (INPI) receives over 180,000 trademark applications
              annually, making it one of the busiest trademark offices in Latin America. The backlog and complexity mean
              strategic filing is essential.
            </p>
          </section>

          {/* Complexity Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="text-blue-600" />
              Why Brazilian Trademark Registration Is Uniquely Complex
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Lengthy Examination Process</h3>
                <p className="text-gray-700">
                  INPI's examination process typically takes 24-36 months, one of the longest in the region. During this
                  time, your application goes through multiple review stages, publications, and potential opposition
                  periods.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. High Objection Rate</h3>
                <p className="text-gray-700">
                  Approximately 68% of applications receive objections from INPI. These can range from technical
                  formalities to substantive refusals based on prior rights, descriptiveness, or public policy concerns
                  unique to Brazilian law.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Mandatory Local Representation</h3>
                <p className="text-gray-700">
                  Foreign applicants must work through a Brazilian attorney or agent with a local address. All official
                  communications happen in Portuguese, and responses require knowledge of Brazilian trademark
                  jurisprudence.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Use Requirements and Cancellation Risk</h3>
                <p className="text-gray-700">
                  While Brazil is first-to-file, registered trademarks must be used within 5 years or face cancellation.
                  Proving use requires specific documentation and strategic planning for market entry timing.
                </p>
              </div>
            </div>
          </section>

          {/* Common Pitfalls */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Pitfalls That Cost Businesses</h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Expensive Mistakes to Avoid:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    <strong>Inadequate search:</strong> Missing phonetic or visual conflicts specific to Portuguese
                    language variations can lead to costly refusals or oppositions years into the process.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    <strong>Wrong class selection:</strong> Brazil's interpretation of the Nice Classification differs
                    in key areas. Incorrect classification means starting over with a new application.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    <strong>Missing deadlines:</strong> INPI has strict deadlines for responding to office actions
                    (typically 60 days). Missing these means abandonment with no appeal.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    <strong>Trademark squatting:</strong> Competitors and squatters actively monitor foreign brands
                    entering Brazil. Delayed filing can mean someone else registers your mark first.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Professional Value */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="text-blue-600" />
              Why Professional Guidance Matters in Brazil
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Brazilian trademark system requires specialized knowledge that goes far beyond filling out forms.
              Here's what professional representation provides:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Strategic Search & Analysis</h4>
                <p className="text-gray-700 text-sm">
                  Comprehensive searching across phonetic Portuguese variations, visual similarities, and translation
                  conflicts that automated tools miss.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Local Expertise</h4>
                <p className="text-gray-700 text-sm">
                  Understanding INPI's examination guidelines, examiner tendencies, and the nuances of Brazilian
                  trademark jurisprudence.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Response Strategy</h4>
                <p className="text-gray-700 text-sm">
                  Crafting persuasive responses to office actions in Portuguese, citing relevant Brazilian case law and
                  precedents.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Portfolio Management</h4>
                <p className="text-gray-700 text-sm">
                  Monitoring use requirements, renewal deadlines, and market surveillance for infringements in Brazil's
                  complex legal environment.
                </p>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="text-blue-600" />
              What to Expect: The Registration Journey
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Search & Strategy (2-3 weeks)</h4>
                    <p className="text-gray-700 text-sm">
                      Comprehensive search and strategic assessment of registrability in Brazil.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Filing & Publication (12-18 months)</h4>
                    <p className="text-gray-700 text-sm">
                      Application filed with INPI, formal examination, and publication for opposition.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Substantive Examination (12-18 months)</h4>
                    <p className="text-gray-700 text-sm">
                      Detailed review by INPI examiners, potential office actions requiring expert responses.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Registration & Protection (10 years)</h4>
                    <p className="text-gray-700 text-sm">
                      Certificate issued, with ongoing monitoring and use requirements to maintain rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Can I file a trademark in Brazil without using it?
                </h3>
                <p className="text-gray-700">
                  Yes, Brazil is a first-to-file country, so you can file before using the mark. However, you must begin
                  use within 5 years of registration or face cancellation for non-use.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  How long does the trademark registration process take in Brazil?
                </h3>
                <p className="text-gray-700">
                  The typical timeline is 24-36 months from filing to registration, though it can take longer if there
                  are objections, oppositions, or appeals. INPI's backlog means patience is essential.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  What happens if someone opposes my trademark application?
                </h3>
                <p className="text-gray-700">
                  If an opposition is filed during the 60-day period after publication, you must respond with arguments
                  and evidence. These proceedings require legal expertise and can add 12+ months to the process.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Do I need a Brazilian attorney to file a trademark?
                </h3>
                <p className="text-gray-700">
                  Foreign applicants are required by law to have a local representative in Brazil. This ensures proper
                  communication with INPI and compliance with local procedures.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="my-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Brand in Brazil?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Don't navigate Brazil's complex trademark system alone. Get expert guidance from filing to registration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/verification">Start Your Application</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700 bg-transparent"
              >
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
