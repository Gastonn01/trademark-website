import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Argentina's New Trademark Law Changes 2025: What Businesses Need to Know | JustProtected",
  description:
    "Major changes to Argentina's trademark system starting 2025. Learn how Resolution INPI P-583/25 affects trademark registration, oppositions, and brand protection strategies.",
  keywords:
    "Argentina trademark law, INPI Argentina, trademark changes 2025, Argentina intellectual property, trademark opposition Argentina, INPI P-583/25",
  alternates: {
    canonical: "https://justprotected.com/blog/argentina-trademark-law-changes-2025/",
  },
}

export default function ArgentinaTrademarkLawChanges2025() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />

      <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1600&h=800&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-blue-200 mb-4">Legal Update • Argentina</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Argentina's Trademark System Just Changed: What Resolution INPI P-583/25 Means for Your Business
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              The Argentine Patent and Trademark Office (INPI) has introduced significant reforms that fundamentally
              change how trademark registration works. Here's what every brand owner needs to know.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-blue-100">
              <span>8 min read</span>
              <span>•</span>
              <span>Updated January 2025</span>
              <span>•</span>
              <span>Legal Analysis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">Immediate</div>
              <p className="text-sm text-gray-600">Some changes effective now</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">Mar 2026</div>
              <p className="text-sm text-gray-600">Full procedure reorganization</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">30 Days</div>
              <p className="text-sm text-gray-600">Opposition window after publication</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700 mb-1">Critical</div>
              <p className="text-sm text-gray-600">Monitoring now essential</p>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-8">
            Resolution INPI P-583/25 represents the most significant shift in Argentina's trademark registration system
            in decades. Understanding these changes is critical for any business operating in or planning to enter the
            Argentine market.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">
              Key Takeaway: The burden of protecting your trademark rights has shifted from the government to you.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Change 1: Limited Ex Officio Examination (Effective Immediately)
          </h2>

          <p className="text-gray-700 mb-6">
            This is the most significant change and it's already in effect. Here's what happened:
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">What Changed:</h3>
            <p className="text-gray-700 mb-4">
              Previously, INPI examiners would automatically check your trademark application against existing marks and
              reject it if they found conflicts.
            </p>
            <p className="text-gray-700">
              Now, INPI will ONLY examine "absolute grounds" for refusal—things like lack of distinctiveness,
              functionality issues, or public order concerns.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Are "Relative Grounds"?</h3>

          <p className="text-gray-700 mb-4">These include:</p>

          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li>Conflicts with prior trademark rights</li>
            <li>Similarity to existing registered marks</li>
            <li>Use of personal names without consent</li>
            <li>Other private-law interests and conflicts</li>
          </ul>

          <p className="text-gray-700 mb-6">
            <strong>INPI will no longer check these automatically.</strong>
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">What This Means for You:</p>
            <p className="text-gray-700">
              If someone files a trademark that conflicts with yours, INPI won't stop it unless YOU file an opposition
              within 30 days of publication.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Change 2: Reorganized Registration Procedure (Effective March 1, 2026)
          </h2>

          <p className="text-gray-700 mb-6">
            Starting March 1, 2026, the entire trademark registration process will be reorganized:
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">New Timeline:</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Immediate Examination:</strong> Formal and substantive examination happens right after filing
                (not months later)
              </li>
              <li>
                <strong>Quick Publication:</strong> Applications are published once absolute grounds objections are
                cleared
              </li>
              <li>
                <strong>30-Day Opposition Window:</strong> Others have 30 days to oppose your application
              </li>
              <li>
                <strong>Fast Registration:</strong> If no oppositions are filed, your trademark proceeds to registration
                automatically
              </li>
            </ol>
          </div>

          <p className="text-gray-700 mb-6">
            This sounds faster, but there's a catch: <strong>you need to be watching</strong> for conflicting
            applications during that critical 30-day window.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Change 3: Pending Applications Are Also Affected
          </h2>

          <p className="text-gray-700 mb-6">
            If you already have a trademark application in process with INPI, these changes apply to you too.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">Important:</p>
            <p className="text-gray-700">
              INPI will no longer examine relative grounds for pending applications. If there's a conflicting mark filed
              after yours, INPI won't automatically reject it—you'll need to oppose it yourself.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why These Changes Were Made</h2>

          <p className="text-gray-700 mb-6">The Argentine government implemented these reforms to:</p>

          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li>Speed up the registration process (reduce the massive backlog)</li>
            <li>Reduce government burden of examining every potential conflict</li>
            <li>Align with international trademark practices</li>
            <li>Put the responsibility on brand owners to protect their own rights</li>
          </ul>

          <p className="text-gray-700 mb-8">
            While these goals make sense, they fundamentally shift the burden of trademark protection from INPI to
            trademark owners.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            What This Means for Your Business: Action Required
          </h2>

          <p className="text-gray-700 mb-6">
            If you own trademarks in Argentina—or plan to expand there—you need to take these steps immediately:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">1. Implement Trademark Watching</h3>
              <p className="text-gray-700">
                You MUST monitor INPI's trademark gazette for new filings that could conflict with your marks. Missing a
                conflicting application means losing your ability to oppose it.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">2. Strengthen Your Opposition Strategy</h3>
              <p className="text-gray-700">
                Prepare to file oppositions quickly. The 30-day window is non-negotiable. You'll need legal counsel
                ready to act on short notice.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">3. Review Pending Applications</h3>
              <p className="text-gray-700">
                If you have applications currently pending with INPI, review them to ensure no conflicting marks have
                been filed since your submission.
              </p>
            </div>

            <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">4. Consider Preventive Registrations</h3>
              <p className="text-gray-700">
                With the new streamlined process, now might be the time to file additional trademark classes or
                variations to create a stronger protective barrier.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Risks of Not Adapting</h2>

          <p className="text-gray-700 mb-6">Without proper monitoring and quick opposition strategies, you risk:</p>

          <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
            <li>
              <strong>Competitors registering confusingly similar marks</strong> that erode your brand value
            </li>
            <li>
              <strong>Trademark squatters</strong> filing your brand name in adjacent classes to force buyouts
            </li>
            <li>
              <strong>Loss of market exclusivity</strong> as similar brands emerge
            </li>
            <li>
              <strong>Costly nullity actions</strong> to remove marks after they're registered (much more expensive than
              opposing during the 30-day window)
            </li>
            <li>
              <strong>Blocked expansion</strong> into new product categories
            </li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">Critical Warning:</p>
            <p className="text-gray-700">
              Once a conflicting trademark is registered, removing it requires a nullity action—a lengthy, expensive
              legal process. Prevention through opposition is always cheaper and faster.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How Professional Monitoring Protects You</h2>

          <p className="text-gray-700 mb-6">
            Given the complexity of monitoring INPI publications and the short 30-day response window, most businesses
            work with trademark professionals who:
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li>Monitor weekly INPI gazette publications automatically</li>
            <li>Identify potentially conflicting applications</li>
            <li>Analyze the legal strength of potential oppositions</li>
            <li>File oppositions quickly when needed</li>
            <li>Handle the legal proceedings if disputes arise</li>
          </ul>

          <p className="text-gray-700 mb-8">
            This proactive approach is now essential—not optional—under the new Argentine system.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Looking Ahead: March 2026 and Beyond</h2>

          <p className="text-gray-700 mb-6">
            As the full procedural reorganization takes effect in March 2026, expect:
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li>Faster processing times for new applications</li>
            <li>Increased filing activity as the backlog clears</li>
            <li>More opposition proceedings as brand owners defend their rights</li>
            <li>Greater importance of strategic trademark portfolio management</li>
          </ul>

          <p className="text-gray-700 mb-8">
            The Argentine trademark landscape is becoming more competitive and dynamic. Brands that adapt quickly will
            maintain their protection; those that don't risk losing ground.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold mb-4">Need Help Navigating These Changes?</h3>
            <p className="text-blue-100 mb-6">
              At Just Protected, we help businesses worldwide adapt to changing trademark laws. Whether you need ongoing
              monitoring, opposition services, or strategic portfolio management in Argentina, we're here to protect
              your brand.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-semibold">
                Get Expert Guidance
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Summary: Your Action Checklist</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3">✓</span>
                <span>Set up trademark monitoring for INPI gazette publications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3">✓</span>
                <span>Establish a rapid-response opposition strategy</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3">✓</span>
                <span>Review all pending trademark applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3">✓</span>
                <span>Consider filing additional protective registrations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3">✓</span>
                <span>Consult with trademark professionals about your portfolio</span>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <div className="bg-gray-50 py-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/register-trademark-argentina"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-blue-700 mb-2">Trademark Registration in Argentina</h3>
              <p className="text-gray-600 text-sm">Complete guide to protecting your brand in the Argentine market</p>
            </Link>
            <Link
              href="/blog/register-trademark-brazil"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-blue-700 mb-2">Trademark Protection in Brazil</h3>
              <p className="text-gray-600 text-sm">
                Navigate Brazil's trademark system and protect your brand across Latin America
              </p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
