import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          This Cookie Policy explains how Protectly ("we", "us", and "our") uses cookies and similar technologies to
          recognize you when you visit our website. It explains what these technologies are and why we use them, as well
          as your rights to control our use of them.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies?</h2>
        <p className="mb-4">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
          as well as to provide reporting information.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why do we use cookies?</h2>
        <p className="mb-4">
          We use first-party and third-party cookies for several reasons. Some cookies are required for technical
          reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on
          our website. Third parties serve cookies through our website for advertising, analytics and other purposes.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Types of cookies we use</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Essential website cookies</li>
          <li>Performance and functionality cookies</li>
          <li>Analytics and customization cookies</li>
          <li>Advertising cookies</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How can you control cookies?</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by
          clicking on the appropriate opt-out links provided in the cookie banner or by setting or amending your web
          browser controls to accept or refuse cookies.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to this Cookie Policy</h2>
        <p className="mb-4">
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we
          use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy
          regularly to stay informed about our use of cookies and related technologies.
        </p>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

