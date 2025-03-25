import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "5 Things You Didn't Know About Trademark Registration | 2024",
  description:
    "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
  keywords: "trademark facts, unusual trademarks, trademark protection, trademark registration tips, brand protection",
  alternates: {
    canonical: "https://justprotected.com/blog/five-things-about-trademark-registration/",
  },
}

export default function FiveThingsTrademarkPage() {
  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <NavBar />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop"
          alt="Business person reviewing trademark documents with a magnifying glass"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg shadow-md mb-8"
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-purple-900">
            5 Things You Didn't Know About Trademark Registration
          </h1>
          <p className="text-gray-600">
            Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="prose prose-purple max-w-none">
          <p className="lead">
            Trademark registration is often thought of as a dry, legal process, but it's packed with fascinating details
            that can make or break a brand's identity. Whether you're a small business owner, an entrepreneur, or
            someone curious about intellectual property, these lesser-known facts about trademark registration will
            surprise you and help you protect your brand effectively.
          </p>

          <h2>1. Trademarks Aren't Just for Logos</h2>

          <p>
            Many people think trademarks only apply to logos or brand names, but that's just the beginning. You can
            trademark:
          </p>

          <ul>
            <li>
              <strong>Sounds:</strong> The iconic MGM lion roar and the NBC chime are registered trademarks.
            </li>
            <li>
              <strong>Colors:</strong> Tiffany & Co.'s robin egg blue is trademarked.
            </li>
            <li>
              <strong>Smells:</strong> A company trademarked the scent of Play-Doh.
            </li>
            <li>
              <strong>Gestures:</strong> Think of Usain Bolt's lightning pose.
            </li>
          </ul>

          <p>If it makes your brand unique and recognizable, you can likely protect it with a trademark.</p>

          <h2>2. The "First-to-File" Rule Can Be a Game-Changer</h2>

          <p>
            In many countries, including China and Germany, trademarks operate on a "first-to-file" basis. This means
            the first person to register the mark owns it, regardless of prior use. Contrast this with the United
            States, which gives priority to the first user in commerce. This difference can lead to:
          </p>

          <ul>
            <li>
              <strong>Trademark Squatting:</strong> Opportunists registering marks for famous brands to sell them back.
            </li>
            <li>
              <strong>Lost Opportunities:</strong> Failing to register early might mean losing your name entirely.
            </li>
          </ul>

          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 my-6">
            <p className="text-purple-800">
              <strong>Tip:</strong> Register your trademark as soon as you start planning your brand.
            </p>
          </div>

          <h2>3. Trademarks Are Territorial</h2>

          <p>
            Trademarks only provide protection in the countries where they are registered. For global businesses,
            relying on a single registration isn't enough.
          </p>

          <ul>
            <li>
              <strong>Madrid Protocol:</strong> A treaty allowing international trademark applications in multiple
              countries through a single process.
            </li>
            <li>
              <strong>Local Registrations:</strong> Countries like Brazil and India require direct filings for
              additional protection.
            </li>
          </ul>

          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 my-6">
            <p className="text-purple-800">
              <strong>Tip:</strong> Consider your business's expansion plans and register in key markets early.
            </p>
          </div>

          <h2>4. You Have to Use It or Lose It</h2>

          <p>
            Most countries have "use requirements" for trademarks. If you don't use your trademark within a certain
            timeframe, it can be canceled. For example:
          </p>

          <ul>
            <li>
              <strong>United States:</strong> Trademarks must be used within 6 years of registration.
            </li>
            <li>
              <strong>India:</strong> You must use your trademark within 5 years.
            </li>
            <li>
              <strong>China:</strong> Non-use for 3 consecutive years can result in cancellation.
            </li>
          </ul>

          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 my-6">
            <p className="text-purple-800">
              <strong>Tip:</strong> Ensure your trademark is actively used in commerce and keep records to prove it.
            </p>
          </div>

          <div className="my-8 p-6 bg-purple-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-purple-900">Ready to Protect Your Brand?</h2>
            <p className="mb-6 text-lg">
              Our experts can help you navigate the complexities of trademark registration and ensure your brand is
              fully protected.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link href="/verification">Start Registration</Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <Link href="/contact">Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

