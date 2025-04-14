import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "How to Register a Trademark in India (2024) | Complete Guide",
  description:
    "Navigate the complexities of trademark registration in India with our comprehensive guide to procedures, requirements, and timelines.",
  keywords:
    "India trademark registration, Indian IP law, Indian trademark office, brand protection India, intellectual property India, trademark filing India",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-india/",
  },
}

export default function RegisterTrademarkIndia() {
  return (
    <main className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <NavBar />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=800&fit=crop"
          alt="Modern business district in Mumbai, India, representing trademark registration opportunities"
          width={1600}
          height={800}
          className="w-full h-auto rounded-lg shadow-md mb-8"
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-orange-900">
            How to Register a Trademark in India: Complete Guide 2024
          </h1>
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

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4 text-orange-800">Key Benefits of Registration</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>
                  <strong>Stops Copycats:</strong> Prevents others from using your name or logo
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>
                  <strong>Builds Trust:</strong> Boosts your brand's credibility with customers and partners
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>
                  <strong>Legal Protection:</strong> Gives you power to act against misuse
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>
                  <strong>Growth Potential:</strong> Protects your name as your business expands
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 my-8">
            <p className="text-yellow-800 font-semibold">
              Quick Tip: If your brand has a unique logo or tagline, register them too for full protection.
            </p>
          </div>

          <h2>Registration Process in India</h2>

          <ol className="space-y-6">
            <li>
              <h3 className="font-semibold">Search for Similar Trademarks</h3>
              <p>
                Make sure your name or logo isn't already registered. A public search tool is available on the Indian
                trademark registry website.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">Choose the Right Class</h3>
              <p>
                Every product or service falls under one of 45 categories. Select the class that best fits your
                business.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">File Your Application</h3>
              <p>
                Submit the application online or through an agent. Include your logo, business details, and the class of
                goods or services.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">Examination and Publication</h3>
              <p>
                The trademark office reviews your application for errors and publishes it in the journal. This allows
                others to raise objections.
              </p>
            </li>
            <li>
              <h3 className="font-semibold">Objection Period</h3>
              <p>If no objections are raised within 4 months, your trademark moves forward.</p>
            </li>
            <li>
              <h3 className="font-semibold">Get Your Certificate</h3>
              <p>Once approved, you'll own the exclusive rights for 10 years, with the option to renew.</p>
            </li>
          </ol>

          <h2>Costs and Timeline</h2>
          <div className="bg-white p-6 rounded-lg shadow-md my-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Costs</h3>
                <ul className="space-y-2">
                  <li>₹4,500 for individuals and small businesses</li>
                  <li>₹9,000 for larger companies</li>
                  <li>Additional fees may apply for expedited processing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Timeline</h3>
                <ul className="space-y-2">
                  <li>12-18 months for standard applications</li>
                  <li>Faster with expedited processing</li>
                  <li>May vary if objections are raised</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Tips to Avoid Problems</h2>
          <ul className="space-y-4">
            <li>
              <strong>Register Early:</strong> The first-to-file rule makes timing everything
            </li>
            <li>
              <strong>Use a Professional:</strong> Experts simplify the process and avoid delays
            </li>
            <li>
              <strong>Monitor Your Trademark:</strong> Regularly check for misuse or infringement
            </li>
          </ul>

          <p>
            India's vast market offers great potential, but protecting your brand is essential. Secure your trademark
            today and unlock your business's future!
          </p>

          <div className="my-8 p-6 bg-orange-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-900">Ready to Protect Your Brand in India?</h2>
            <p className="mb-6 text-lg">Let our experts guide you through the Indian trademark registration process.</p>
            <div className="flex justify-center gap-4">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/verification">Start Registration</Link>
              </Button>
              <Button asChild variant="outline">
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
