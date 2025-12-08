import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle,
  FileText,
  HelpCircle,
  AlertTriangle,
  Award,
  Target,
  Calendar,
  Search,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react"

export const metadata = {
  title: "Register Your Trademark in Germany - Fast, Affordable, Fully Guided | JustProtected",
  description:
    "Secure your brand with Germany's official trademark office (DPMA). No legal confusion, no costly mistakes - our specialists handle everything for you. Fixed pricing, 24h response.",
  keywords:
    "Germany trademark registration, DPMA trademark, register trademark Germany, German IP protection, trademark filing Germany, DPMA registration cost",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-germany/",
  },
}

export default function RegisterTrademarkGermany() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />

      <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&h=800&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-blue-200 mb-4">Trademark Guide</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              How to Register a Trademark in Germany: Complete Guide for 2025
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Everything you need to know about protecting your brand with the German Patent and Trade Mark Office
              (DPMA), including costs, timelines, and common pitfalls to avoid.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <span>8 min read</span>
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
              <div className="text-3xl font-bold text-blue-700 mb-1">80,000+</div>
              <p className="text-sm text-gray-600">Trademarks filed annually in Germany</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">€290+</div>
              <p className="text-sm text-gray-600">DPMA filing fees from</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">6-12</div>
              <p className="text-sm text-gray-600">Months typical processing time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">10 years</div>
              <p className="text-sm text-gray-600">Initial protection period</p>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Register Your Trademark in Germany?</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Germany represents Europe's largest economy and one of the world's most important markets for businesses.
            With over 83 million consumers and a robust legal framework for intellectual property protection, securing
            trademark rights in Germany is essential for any business operating or planning to operate in the region.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The German Patent and Trade Mark Office (Deutsches Patent- und Markenamt or DPMA) processes more than 80,000
            trademark applications each year. Here's what trademark registration provides:
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
            {[
              {
                icon: Shield,
                title: "Exclusive Rights",
                desc: "Legal monopoly on your brand name or logo throughout Germany",
              },
              {
                icon: AlertTriangle,
                title: "Legal Protection",
                desc: "Power to stop competitors from using confusingly similar marks",
              },
              {
                icon: TrendingUp,
                title: "Business Asset",
                desc: "Registered trademarks become valuable, transferable company assets",
              },
              {
                icon: Award,
                title: "Credibility",
                desc: "The ® symbol demonstrates professionalism and commitment to your brand",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <benefit.icon className="w-10 h-10 text-blue-700 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-base">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
            <p className="text-gray-800 mb-0">
              <strong>Important:</strong> Trademark rights in Germany are territorial. Registration with the DPMA
              protects you only within German borders. For broader protection, you may need to consider an EU trademark
              (EUTM) or international registration via the Madrid System.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">The German Trademark Registration Process</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Understanding the process before you begin can help you avoid costly mistakes and delays. Here's how
            trademark registration works in Germany:
          </p>

          <div className="space-y-8 my-12 not-prose">
            {[
              {
                num: "1",
                title: "Preliminary Search",
                desc: "Before filing, it's critical to search existing trademarks to ensure yours is available. The DPMA maintains a public database (DPMAregister) where you can check for conflicts. However, a comprehensive search should also include pending applications, EU trademarks, and common law marks.",
                icon: Search,
              },
              {
                num: "2",
                title: "Prepare Your Application",
                desc: "You'll need to provide a clear representation of your mark, specify the goods and services you'll use it for (classified under the Nice Classification system), and ensure all administrative details are correct. Mistakes here are the leading cause of rejections.",
                icon: FileText,
              },
              {
                num: "3",
                title: "File With the DPMA",
                desc: "Applications can be submitted online through the DPMA portal, by mail, or in person. You'll receive an application number immediately upon filing. Official fees start at €290 for online filings covering up to 3 classes.",
                icon: Zap,
              },
              {
                num: "4",
                title: "Examination Phase",
                desc: "The DPMA examines your application for absolute grounds for refusal (descriptive marks, generic terms, etc.) but does NOT check for conflicts with existing marks. If issues are found, you'll receive an office action requiring a response.",
                icon: HelpCircle,
              },
              {
                num: "5",
                title: "Publication & Opposition",
                desc: "If accepted, your mark is published in the Trademark Gazette. Third parties have 3 months to file an opposition if they believe your mark infringes their rights.",
                icon: Calendar,
              },
              {
                num: "6",
                title: "Registration",
                desc: "If no oppositions are filed (or you successfully defend against them), your trademark is officially registered. You'll receive a certificate and can use the ® symbol. Protection lasts 10 years and can be renewed indefinitely.",
                icon: Award,
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-bold">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 my-12 not-prose border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help With Your Application?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our trademark specialists handle the entire registration process for you - from comprehensive searches to
              filing and examiner responses. Fixed price of €1,551 includes everything.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-blue-700 hover:bg-blue-800">
                <Link href="/verification">Start Your Registration</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/free-search">Free Trademark Search</Link>
              </Button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Costs of Trademark Registration in Germany</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Understanding the full cost breakdown helps you budget appropriately. Here's what you'll need to consider:
          </p>

          <div className="my-8 not-prose">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">DPMA Official Fees</h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Online filing (up to 3 classes)</span>
                  <span className="font-semibold text-gray-900">€290</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Paper filing (up to 3 classes)</span>
                  <span className="font-semibold text-gray-900">€300</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Each additional class</span>
                  <span className="font-semibold text-gray-900">€100</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            While these are the minimum official fees, most businesses also need to consider:
          </p>

          <ul className="space-y-3 my-6">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
              <span className="text-gray-700">
                <strong>Professional search fees:</strong> €200-500 for comprehensive conflict searches
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
              <span className="text-gray-700">
                <strong>Legal/specialist assistance:</strong> €800-2,000 for application preparation and filing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
              <span className="text-gray-700">
                <strong>Response to office actions:</strong> €300-800 if the examiner raises objections
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
              <span className="text-gray-700">
                <strong>Opposition defense:</strong> €1,000-5,000+ if a third party challenges your mark
              </span>
            </li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-900 mb-2">Cost of Mistakes</p>
                <p className="text-amber-800">
                  Filing an application incorrectly or without proper searching can result in rejection, requiring you
                  to pay all fees again. Many first-time applicants underestimate the complexity and end up spending
                  significantly more fixing errors than they would have spent on professional help initially.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Common Reasons for Rejection</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The DPMA rejects approximately 25% of applications. Understanding the most common reasons can help you avoid
            these pitfalls:
          </p>

          <div className="space-y-6 my-8 not-prose">
            {[
              {
                title: "Descriptive Terms",
                desc: "Marks that simply describe the goods or services (e.g., 'Fast Delivery' for a courier service) cannot be registered.",
                icon: FileText,
              },
              {
                title: "Generic Names",
                desc: "Common names for products or services (e.g., 'Bread' for a bakery) lack distinctive character.",
                icon: AlertTriangle,
              },
              {
                title: "Misleading Marks",
                desc: "Trademarks that could deceive consumers about the nature, quality, or origin of goods are refused.",
                icon: HelpCircle,
              },
              {
                title: "Incorrect Classifications",
                desc: "Failing to properly classify goods and services under the Nice Classification leads to rejections or narrow protection.",
                icon: Target,
              },
              {
                title: "Conflicts With Existing Rights",
                desc: "While the DPMA doesn't examine for conflicts, third parties can file oppositions if your mark is too similar to theirs.",
                icon: Shield,
              },
            ].map((reason, index) => (
              <div key={index} className="flex gap-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                <reason.icon className="w-8 h-8 text-blue-700 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{reason.title}</h3>
                  <p className="text-gray-700">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Timeline: How Long Does It Take?</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The entire registration process typically takes 6-12 months from filing to final registration, though this
            can vary:
          </p>

          <div className="my-8 not-prose">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Months 1-2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Initial Examination</h4>
                  <p className="text-gray-700">
                    The DPMA reviews your application for formal requirements and absolute grounds for refusal.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Months 2-4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Office Actions (if needed)</h4>
                  <p className="text-gray-700">
                    If issues are found, you'll receive an office action and have time to respond.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Months 4-5</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Publication</h4>
                  <p className="text-gray-700">Approved marks are published in the official gazette.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Months 5-8</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Opposition Period</h4>
                  <p className="text-gray-700">Third parties have 3 months to file an opposition.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-blue-700">Months 8-12</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Registration</h4>
                  <p className="text-gray-700">
                    If no oppositions are filed, your trademark is officially registered and you receive your
                    certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
            <p className="text-gray-800 mb-0">
              <strong>Good news:</strong> Your trademark rights begin from the filing date, not the registration date.
              This means you have legal priority over anyone who files after you, even if their application is processed
              faster.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6 my-8 not-prose">
            {[
              {
                q: "Can I file a trademark application myself?",
                a: "Yes, the DPMA allows individuals and businesses to file applications directly. However, trademark law is complex and errors can be costly. Most businesses benefit from professional guidance to ensure their application is done correctly the first time.",
              },
              {
                q: "Do I need a trademark attorney in Germany?",
                a: "For German nationals and EU residents, legal representation is optional. For applicants outside the EU, the DPMA requires representation by a German trademark attorney or agent.",
              },
              {
                q: "What's the difference between ™ and ®?",
                a: "™ can be used by anyone claiming trademark rights, even without registration. ® can only be used once your trademark is officially registered with the DPMA. Using ® without registration is illegal in Germany.",
              },
              {
                q: "Can I register a trademark in multiple countries?",
                a: "Yes. You can file separate national applications, apply for an EU trademark (covering all 27 EU countries), or use the Madrid System for international registration covering up to 130 countries.",
              },
              {
                q: "What happens if someone opposes my trademark?",
                a: "If a third party files an opposition, you'll need to defend your application by arguing why your mark doesn't infringe their rights. This can involve legal arguments, evidence of use, and negotiation. Professional representation is highly recommended in opposition proceedings.",
              },
              {
                q: "How long does trademark protection last?",
                a: "German trademarks are valid for 10 years from the filing date. They can be renewed indefinitely in 10-year periods as long as you continue to pay renewal fees and actually use the trademark.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-10 my-16 not-prose text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Protect Your Brand in Germany?</h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto leading-relaxed">
              Our specialists handle the entire registration process for you - from comprehensive searches to filing and
              examiner responses. Fixed pricing, no surprises, 24-hour response guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg">
                <Link href="/verification">Start Your Registration - €1,551</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg bg-transparent"
              >
                <Link href="/free-search">Free Trademark Search</Link>
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">Trusted by 10,000+ businesses worldwide</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Next Steps</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you decide to file your trademark yourself or work with specialists, the most important step is to
            start now. Trademark rights are granted on a first-to-file basis in Germany, meaning delays could cost you
            your brand name if someone else files first.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            If you're ready to move forward, here's what we recommend:
          </p>

          <ol className="space-y-4 my-6">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <span className="text-gray-700 flex-1">
                <strong>Conduct a preliminary search</strong> to ensure your desired trademark is available
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <span className="text-gray-700 flex-1">
                <strong>Determine your trademark type</strong> (word mark, logo, combined mark, etc.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <span className="text-gray-700 flex-1">
                <strong>Identify the correct classes</strong> for your goods and services
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </span>
              <span className="text-gray-700 flex-1">
                <strong>Prepare and file your application</strong> with the DPMA
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </span>
              <span className="text-gray-700 flex-1">
                <strong>Monitor and respond</strong> to any office actions or oppositions
              </span>
            </li>
          </ol>

          <p className="text-lg text-gray-700 leading-relaxed">
            Have questions about your specific situation? Feel free to reach out to our team at{" "}
            <a href="mailto:trademarks@justprotected.com" className="text-blue-700 hover:text-blue-800 font-semibold">
              trademarks@justprotected.com
            </a>{" "}
            - we're here to help.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  )
}
