import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'The "Stanley Cup" Lawsuits Explained: Are Dupes Legal or a Trademark Risk? | JustProtected',
  description:
    "Stanley is suing tumbler sellers for trade dress infringement. Learn the legal difference between dupes and counterfeits, and how to sell inspired products safely.",
  keywords:
    "Stanley Cup lawsuits, trade dress infringement, dupes vs counterfeits, tumbler trademark, Pacific Market International, Stanley Quencher, marketplace sellers, trademark risk",
  alternates: {
    canonical: "https://justprotected.com/blog/stanley-cup-lawsuits-dupes-trademark-risk/",
  },
}

export default function StanleyCupLawsuits() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('/images/stanley-cup-lawsuit-dupes-trademark.png')] opacity-30 bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-gray-300 mb-4">Trademark Law • Trade Dress • E-Commerce</div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              The "Stanley Cup" Lawsuits Explained: Are Dupes Legal or a Trademark Risk?
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Stanley is suing tumbler sellers for trade dress infringement. Learn the legal difference between dupes
              and counterfeits, and how to sell inspired products safely.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>8 min read</span>
              <span>•</span>
              <span>Updated December 2024</span>
              <span>•</span>
              <span>Trade Dress Protection</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">2024-25</div>
              <p className="text-sm text-gray-600">Aggressive enforcement period</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">Trade Dress</div>
              <p className="text-sm text-gray-600">Primary legal claim</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">No Logo</div>
              <p className="text-sm text-gray-600">Still infringement risk</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-gray-900 mb-1">Sellers</div>
              <p className="text-sm text-gray-600">Primary enforcement targets</p>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Why Stanley Is Suing Tumbler Sellers (And Why It Matters)
          </h2>

          <p className="text-gray-700 mb-6">
            In 2024 and 2025, Pacific Market International (the company behind Stanley) began taking aggressive legal
            action against online sellers offering Stanley-style tumblers.
          </p>

          <p className="text-gray-700 mb-6">What makes these lawsuits notable is what Stanley is not claiming.</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">They are not alleging:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Use of the Stanley logo</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Fake branding</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Direct counterfeiting</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 border-l-4 border-gray-900 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">
              Instead, the lawsuits focus on trade dress infringement — the idea that the overall look and feel of the
              Stanley Quencher tumbler has become so recognizable that copying it causes consumer confusion.
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            For dropshippers, private-label sellers, and marketplace brands, this marks a major shift in enforcement
            risk.
          </p>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Dupe vs Counterfeit: The Legal Difference Sellers Must Understand
          </h2>

          <p className="text-gray-700 mb-6">
            Many sellers assume that avoiding logos is enough. Legally, that is no longer true.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">What Is a Counterfeit?</h3>
              <p className="text-gray-700 mb-4">A counterfeit product:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Uses a protected brand name or logo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Is presented as the original product</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Clearly violates trademark law</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">These cases are usually straightforward.</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">What Is a "Dupe"?</h3>
              <p className="text-gray-700 mb-4">A dupe:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Does not use the original brand name</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Mimics the appearance of a popular product</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Relies on being "similar enough" to attract buyers</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                Dupes often feel safer — but that's where trade dress law comes in.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            What Is Trade Dress (And Why Stanley Is Using It)
          </h2>

          <p className="text-gray-700 mb-6">
            Trade dress protects the distinctive visual appearance of a product when that appearance identifies the
            brand to consumers.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-4">
              Stanley argues that the Quencher tumbler's characteristics have become instantly recognizable as
              "Stanley," even without a logo:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Proportions</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Handle placement</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Tapered base</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Lid and rim profile</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 border-l-4 border-gray-900 p-6 mb-8">
            <p className="text-gray-800 font-semibold">
              If a court agrees, sellers offering visually identical tumblers may be found liable — even if the product
              name is different.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Trade Dress vs Design Patents: Why This Is a Gray Area
          </h2>

          <p className="text-gray-700 mb-6">This is where the legal fight gets interesting.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-accent transition-colors">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Stanley's Argument</h3>
              <p className="text-gray-700 mb-4">The overall shape of the Quencher is:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Non-functional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Distinctive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Associated with a single source</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">If proven, it qualifies for trade dress protection.</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-accent transition-colors">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">The Seller's Defense</h3>
              <p className="text-gray-700 mb-4">Trade dress cannot protect functional features.</p>
              <p className="text-gray-700 mb-3">For example:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>A tapered base may be functional because it fits car cup holders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>A handle may be functional for carrying a heavy tumbler</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Lid mechanics may be dictated by insulation needs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-lg mb-8">
            <p className="text-xl mb-4">
              Courts must decide whether consumers see these features as brand identifiers or simply functional design
              choices.
            </p>
            <p className="text-gray-200">
              This uncertainty is exactly why sellers are being sued — and why risk assessment matters.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Why Marketplace Sellers Are Especially Exposed
          </h2>

          <p className="text-gray-700 mb-6">Online marketplaces amplify trade dress risk because:</p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">Listings rely heavily on images</span> — Visual similarity
                drives clicks and conversions
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">Buyers compare products visually</span> — Side-by-side
                comparisons emphasize appearance over branding
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">"Looks the same" often drives conversions</span> — Price
                becomes the differentiator, not brand
              </p>
            </div>
          </div>

          <div className="bg-gray-100 border-l-4 border-gray-900 p-6 mb-8">
            <p className="text-gray-800 font-semibold mb-2">
              Even if your product description avoids the Stanley name, visual similarity alone can trigger claims.
            </p>
            <p className="text-gray-800">
              And once a rights holder files complaints or lawsuits, platforms often act first and ask questions later.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            How to Sell "Inspired" Products More Safely
          </h2>

          <p className="text-gray-700 mb-6">
            There is no guaranteed way to eliminate risk, but sellers can reduce exposure.
          </p>

          <div className="space-y-8 mb-12">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-accent transition-colors">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">1. Change the Silhouette</h3>
              <p className="text-gray-700 mb-4">Small tweaks are often not enough.</p>
              <p className="text-gray-700 mb-3">Consider:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>A different handle shape or placement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>A visibly different lid mechanism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Altered proportions or base design</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">The goal is to break immediate visual association.</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-accent transition-colors">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">2. Use Strong, Distinct Branding</h3>
              <p className="text-gray-700 mb-3">Your brand should be:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Clearly visible on the product</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Prominent in listing images</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <span>Consistent across packaging</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                Weak or hidden branding increases confusion — and legal risk.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-accent transition-colors">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">3. Avoid Brand Keywords Entirely</h3>
              <div className="mb-4">
                <p className="text-gray-700 font-bold mb-2">Never:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <span>Bid on "Stanley" in ads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <span>Use "Stanley-style" or "Stanley dupe"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 font-bold mr-3">✗</span>
                    <span>Reference the brand for comparison</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-gray-700 font-bold mb-2">Use neutral, descriptive terms like:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>"40oz insulated tumbler"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>"Handled stainless steel cup"</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Why Many Sellers Still Get It Wrong
          </h2>

          <p className="text-gray-700 mb-6">Most sellers focus on counterfeiting rules, not trade dress law.</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-4">As enforcement shifts, the biggest risks now come from:</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Copying shapes too closely</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Assuming "no logo = safe"</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span>Not evaluating trade dress exposure before scaling ads</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              By the time a claim arrives, listings may already be suspended or revenue frozen.
            </p>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Assessing Your Trade Dress Risk Before You Sell
          </h2>

          <p className="text-gray-700 mb-6">
            Before launching or scaling a product inspired by a popular design, sellers should evaluate:
          </p>

          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg mb-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">1.</span>
                <span>How distinctive the original product is</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">2.</span>
                <span>Whether visual similarity could cause confusion</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">3.</span>
                <span>How courts have treated similar designs</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-6 font-semibold">This type of assessment can prevent expensive mistakes.</p>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-lg mb-12">
            <h3 className="font-serif text-2xl font-bold mb-4">Protect Your Business from Trade Dress Claims</h3>
            <p className="text-gray-200 mb-6">
              Before you launch or scale an inspired product, understand your trade dress risk. Get expert guidance on
              navigating trademark and design protection.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                Assess Your Risk Now
              </Button>
            </Link>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mt-12 mb-6">
            Final Thoughts: Dupes Are Not Automatically Legal
          </h2>

          <p className="text-gray-700 mb-6">The Stanley lawsuits highlight a critical shift in brand enforcement.</p>

          <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200 mb-12">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span className="text-lg">Avoiding logos is no longer enough.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span className="text-lg">Visual identity matters.</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 font-bold mr-3">•</span>
                <span className="text-lg">
                  And trade dress law is increasingly being used to protect iconic products.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <p className="text-xl mb-4">
              If your business depends on "inspired" designs, understanding trademark and trade dress risk is now
              essential — before enforcement finds you.
            </p>
          </div>
        </div>
      </article>

      <div className="bg-gray-50 py-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/dupe-defense-knockoff-brand-litigation"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-2">Dupe Defense: Knockoff Brand Litigation</h3>
              <p className="text-gray-600 text-sm">
                Why knockoff culture is triggering a new wave of brand enforcement and litigation
              </p>
            </Link>
            <Link
              href="/blog/tiktok-shop-counterfeit-violation-appeal"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-2">TikTok Shop Counterfeit Violation Appeal</h3>
              <p className="text-gray-600 text-sm">
                How to navigate and appeal against counterfeit violations on TikTok Shop marketplace
              </p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
