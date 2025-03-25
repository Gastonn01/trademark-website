import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Trademark Registration in India: Complete Guide | 2024",
  description:
    "Learn how to register your trademark in India with our step-by-step guide. Understand the process, costs, and timeline for protecting your brand in the Indian market.",
  keywords: "India trademark registration, trademark India, protect brand India, Indian trademark, first-to-file India",
  alternates: {
    canonical: "https://justprotected.com/blog/trademark-registration-india/",
  },
}

export default function TrademarkRegistrationIndiaPage() {
  return (
    <main className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <NavBar />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=600&fit=crop"
          alt="Indian business district with modern buildings representing trademark registration in India"
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg shadow-md mb-8"
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-orange-900">Trademark Registration in India</h1>
          <p className="text-gray-600">
            Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        <div className="prose prose-orange max-w-none">
          <p className="lead">
            Expanding your business to India? It's a dynamic market full of opportunities, but securing your trademark
            is a critical first step. India follows a "first-to-file" system, so whoever registers the name first gets
            the rights. Don't let someone else claim your brand—here's how to protect it.
          </p>

          <p>
            Imagine launching your product in India, only to discover someone else has trademarked your name. You could
            lose your brand identity and face legal hurdles. That's why registering your trademark early is essential.
          </p>

          <ul>
            <li>
              <strong>Stops Copycats:</strong> Prevents others from using your name or logo.
            </li>
            <li>
              <strong>Builds Trust:</strong> Boosts your brand's credibility with customers and partners.
            </li>
            <li>
              <strong>Legal Protection:</strong> Gives you power to act against misuse.
            </li>
            <li>
              <strong>Growth Potential:</strong> Protects your name as your business expands.
            </li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 my-6">
            <p className="text-yellow-800">
              <strong>Quick Tip:</strong> If your brand has a unique logo or tagline, register them too for full
              protection.
            </p>
          </div>

          <h2>Here's How You Do It</h2>

          <ol>
            <li>
              <strong>Search for Similar Trademarks:</strong> Make sure your name or logo isn't already registered. A
              public search tool is available on the Indian trademark registry website.
            </li>
            <li>
              <strong>Choose the Right Class:</strong> Every product or service falls under one of 45 categories. Select
              the class that best fits your business.
            </li>
            <li>
              <strong>File Your Application:</strong> Submit the application online or through an agent. Include your
              logo, business details, and the class of goods or services.
            </li>
            <li>
              <strong>Examination and Publication:</strong> The trademark office reviews your application for errors and
              publishes it in the journal. This allows others to raise objections.
            </li>
            <li>
              <strong>Objection Period:</strong> If no objections are raised within 4 months, your trademark moves
              forward.
            </li>
            <li>
              <strong>Get Your Certificate:</strong> Once approved, you'll own the exclusive rights for 10 years, with
              the option to renew.
            </li>
          </ol>

          <h2>Costs and Timeline</h2>

          <ul>
            <li>
              <strong>Cost:</strong> Filing fees start at ₹4,500 for individuals and small businesses, ₹9,000 for larger
              companies.
            </li>
            <li>
              <strong>Timeline:</strong> Typically 12-18 months if there are no objections.
            </li>
          </ul>

          <h2>Tips to Avoid Problems</h2>

          <ul>
            <li>
              <strong>Register Early:</strong> The first-to-file rule makes timing everything.
            </li>
            <li>
              <strong>Use a Professional:</strong> Experts simplify the process and avoid delays.
            </li>
            <li>
              <strong>Monitor Your Trademark:</strong> Regularly check for misuse or infringement.
            </li>
          </ul>

          <p>
            India's vast market offers great potential, but protecting your brand is essential. Secure your trademark
            today and unlock your business's future!
          </p>

          <div className="my-8 p-6 bg-orange-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-900">Ready to Protect Your Brand in India?</h2>
            <p className="mb-6 text-lg">
              Our experts can help you navigate the Indian trademark registration process and secure your brand.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/verification">Start Registration</Link>
              </Button>
              <Button asChild variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
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

