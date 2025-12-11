import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "How to Register a Trademark in India (2025) | Complete Guide",
  description:
    "Comprehensive guide to trademark registration in India. Learn about requirements, procedures, and why expert guidance matters in India's complex trademark system.",
  keywords:
    "India trademark registration, Indian IP law, Indian trademark office, brand protection India, intellectual property India, trademark filing India",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-india/",
  },
}

export default function RegisterTrademarkIndia() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=800&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-blue-200 mb-4">Trademark Guide</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              How to Register a Trademark in India: Complete Guide for 2025
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Protect your brand in one of the world's fastest-growing economies. Understand India's unique trademark
              system, first-to-file rules, and why professional guidance is essential for success.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <span>9 min read</span>
              <span>•</span>
              <span>Updated Jan 2025</span>
              <span>•</span>
              <span>By trademark specialists</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-700 mb-1">450,000+</div>
              <p className="text-sm text-gray-600">Annual trademark applications</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-700 mb-1">18-24 mo</div>
              <p className="text-sm text-gray-600">Average processing time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-700 mb-1">58%</div>
              <p className="text-sm text-gray-600">Face examination objections</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-700 mb-1">10 years</div>
              <p className="text-sm text-gray-600">Protection period</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=400&fit=crop"
                alt="Modern business district in India"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                India represents one of the world's most dynamic and challenging trademark landscapes. With over 450,000
                applications filed annually and a first-to-file system that rewards speed, securing your trademark in
                India demands strategic expertise and deep understanding of local procedures.
              </p>

              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Quick Facts: Trademark Registration in India</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Governing Body:</strong> Office of the Controller General of Patents, Designs and Trade
                    Marks
                  </li>
                  <li>
                    <strong>Average Processing Time:</strong> 18-24 months
                  </li>
                  <li>
                    <strong>Protection Period:</strong> 10 years (renewable indefinitely)
                  </li>
                  <li>
                    <strong>Filing System:</strong> Strict first-to-file
                  </li>
                  <li>
                    <strong>Objection Rate:</strong> Approximately 58% receive examination reports
                  </li>
                  <li>
                    <strong>Madrid Protocol Member:</strong> Yes (since 2013)
                  </li>
                  <li>
                    <strong>Use Requirement:</strong> Required within 5 years to maintain registration
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-4">Why India's First-to-File System is Unforgiving</h2>
              <p className="mb-6">
                India's first-to-file principle means whoever files their application first typically wins rights to the
                mark—regardless of who used it first. This creates a race where timing and strategy are everything.
                Businesses that delay protection often discover competitors or trademark squatters have already claimed
                their brand name.
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
                <h3 className="font-semibold mb-2">Real Risk: Trademark Squatting</h3>
                <p>
                  India faces significant challenges with trademark squatting—where third parties preemptively register
                  popular foreign brands before the legitimate owners enter the market. Recovering these marks through
                  opposition or cancellation proceedings is costly, time-consuming, and often unsuccessful. Prevention
                  through early filing is your best defense.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4">The High Stakes of DIY Applications</h2>
              <p className="mb-4">
                With a 58% objection rate, more than half of all trademark applications in India face examination
                reports requiring legal responses. Common issues include:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Similarity to existing Indian trademarks or well-known foreign marks</li>
                <li className="mb-2">Descriptiveness issues specific to Indian languages and culture</li>
                <li className="mb-2">Improper classification under the Nice system</li>
                <li className="mb-2">Technical deficiencies in mark representation or specimen submission</li>
                <li className="mb-2">Documentation requirements for foreign applicants</li>
              </ul>

              <p className="mb-6">
                Responding effectively to examination reports requires understanding Indian trademark jurisprudence,
                precedent cases, and the specific concerns of Indian examiners. Without this expertise, applicants often
                see their marks abandoned or registered with inadequate protection scope.
              </p>

              <h2 className="text-2xl font-bold mb-4">India's Multi-Regional Complexity</h2>
              <p className="mb-6">
                Unlike many countries, India operates through five regional trademark offices (Delhi, Mumbai, Kolkata,
                Chennai, and Ahmedabad). Each office has its own examination practices, timelines, and regional
                trademark considerations. Strategic office selection based on your business location and industry can
                impact success rates and processing speed.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 mb-8">
                <p className="font-semibold mb-2">Language Considerations</p>
                <p>
                  India recognizes trademarks in multiple languages, including Hindi, Bengali, Tamil, and others. If
                  your brand will use non-English marks in the Indian market, understanding transliteration rules,
                  devanagari script requirements, and multilingual protection strategies becomes essential.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4">Timeline Realities and Strategic Planning</h2>
              <p className="mb-6">
                The 18-24 month average timeline reflects the best-case scenario. Applications facing opposition
                proceedings, which are common in India, can extend significantly longer—sometimes 3-5 years for complex
                cases. This extended timeline makes early filing even more critical for businesses planning to enter the
                Indian market.
              </p>

              <h2 className="text-2xl font-bold mb-4">Use Requirements and Portfolio Management</h2>
              <p className="mb-6">
                India requires genuine use of your trademark within five years of registration. For international
                businesses, this creates strategic challenges around timing market entry, establishing use evidence, and
                managing non-use cancellation risks. Professional guidance helps structure protection to align with your
                actual business expansion timeline.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-2">Madrid Protocol Advantages</h3>
                <p>
                  India's membership in the Madrid Protocol since 2013 enables streamlined international trademark
                  protection. However, Madrid-based Indian designations face the same substantive examination standards
                  and require local representation for responding to office actions. Understanding when to file directly
                  versus through Madrid requires strategic analysis.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4">Opposition and Enforcement Landscape</h2>
              <p className="mb-6">
                India has an active opposition practice, with competitors and brand owners closely monitoring the
                trademark journal. Published applications in competitive industries almost certainly face opposition
                challenges. Successfully navigating opposition proceedings requires understanding Indian evidence rules,
                hearing practices, and negotiation strategies.
              </p>

              <h2 className="text-2xl font-bold mb-4">Why Professional Representation Matters in India</h2>
              <p className="mb-4">
                The complexity of India's trademark system, combined with the high stakes of the first-to-file race,
                makes professional representation essential for:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Conducting comprehensive searches across Indian and regional databases</li>
                <li className="mb-2">Strategic office and class selection for optimal protection</li>
                <li className="mb-2">Responding effectively to examination reports and objections</li>
                <li className="mb-2">Navigating opposition proceedings and settlement negotiations</li>
                <li className="mb-2">Managing use requirements and renewal obligations</li>
                <li className="mb-2">Coordinating with local agents and handling procedural requirements</li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Ready to Protect Your Brand in India?</h3>
                <p className="mb-4">
                  Our trademark specialists have extensive experience with Indian trademark law and local office
                  procedures. We can guide you through the entire process and develop a protection strategy tailored to
                  your India market entry plans.
                </p>
                <Link
                  href="/detailed-pricelist"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Our Services & Pricing
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">In This Guide</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#first-to-file" className="text-indigo-600 hover:underline">
                      India's First-to-File System
                    </a>
                  </li>
                  <li>
                    <a href="#diy-risks" className="text-indigo-600 hover:underline">
                      DIY Application Risks
                    </a>
                  </li>
                  <li>
                    <a href="#regional" className="text-indigo-600 hover:underline">
                      Multi-Regional Complexity
                    </a>
                  </li>
                  <li>
                    <a href="#timeline" className="text-indigo-600 hover:underline">
                      Timeline Realities
                    </a>
                  </li>
                  <li>
                    <a href="#use-requirements" className="text-indigo-600 hover:underline">
                      Use Requirements
                    </a>
                  </li>
                  <li>
                    <a href="#professional-help" className="text-indigo-600 hover:underline">
                      Why Professional Help Matters
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm mb-4">
                  Our specialists are ready to answer your questions about Indian trademark registration.
                </p>
                <Link
                  href="/contact"
                  className="block text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTA
        title="Ready to Protect Your Brand in India?"
        description="Our trademark experts can help you navigate India's complex trademark system and secure protection for your brand."
        buttonText="Get Started"
        buttonLink="/detailed-pricelist"
      />

      <Footer />
    </main>
  )
}
