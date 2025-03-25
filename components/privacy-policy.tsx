import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          At Protectly, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or use our services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us, such as when you create an account, request a
          trademark search, or contact our customer support. This may include your name, email address, phone number,
          and information about your trademark.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, to communicate with you, and
          to comply with legal obligations.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing and Disclosure</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We may share your information with service
          providers who assist us in operating our website and conducting our business.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal information. However, no
          method of transmission over the Internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. You may also have additional
          rights depending on your jurisdiction.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page.
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

