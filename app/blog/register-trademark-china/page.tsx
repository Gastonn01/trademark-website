import Image from "next/image"
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
  Lightbulb,
  Target,
  Calendar,
  BookOpen,
  Search,
} from "lucide-react"

export const metadata = {
  title: "How to Register a Trademark in China (2025) | Complete Guide",
  description:
    "Comprehensive guide to China trademark registration in 2025. Learn the step-by-step process, timelines, and requirements to protect your brand in the world's largest consumer market.",
  keywords:
    "China trademark registration 2025, CNIPA, Chinese trademark, China brand protection, intellectual property China, trademark application China, trademark process China",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-china/",
    languages: {
      en: "https://justprotected.com/blog/register-trademark-china/",
    },
  },
}

export default function RegisterTrademarkChina() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />

      {/* Hero Section with Enhanced Visual Appeal */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=1600&h=800&fit=crop"
          alt="Shanghai skyline representing trademark registration in China"
          width={1600}
          height={800}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              How to Register a Trademark in China (2025)
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A Complete Guide to Protecting Your Brand in the World's Largest Consumer Market
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Author and Publication Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 text-gray-600 border-b pb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
              <span className="font-bold">JP</span>
            </div>
            <div>
              <p className="font-medium">By JustProtected Team</p>
              <p className="text-sm">Trademark Specialists</p>
            </div>
          </div>
          <div className="text-sm">
            <p>Published: March 15, 2025</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-blue max-w-none mb-10">
          <p className="text-xl leading-relaxed">
            Registering a trademark in China is a crucial step for protecting your brand in the world's largest consumer
            market. Whether you're a foreign business entering the Chinese market or a local company seeking protection,
            securing trademark rights through the China National Intellectual Property Administration (CNIPA) provides
            valuable legal protection against infringement and counterfeiting.
          </p>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 my-6">
            <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <p className="italic text-blue-800 m-0">
              <strong>Did you know?</strong> China received over 9.5 million trademark applications in 2024, making it
              the world's busiest trademark office. With trademark squatting and counterfeiting concerns, early
              registration is more important than ever for businesses operating in or exporting to China.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-10 p-6 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            What We'll Cover in This Guide:
          </h2>
          <div className="grid gap-4">
            {[
              {
                section: "Why China Trademark Registration Matters",
                desc: "The legal benefits and business advantages of trademark protection in China",
              },
              {
                section: "The Complete Registration Process",
                desc: "A step-by-step breakdown of how to register with CNIPA",
              },
              {
                section: "2025 Application Requirements",
                desc: "Current CNIPA filing requirements and what you need to prepare",
              },
              {
                section: "Common Pitfalls and How to Avoid Them",
                desc: "China-specific challenges and strategies for success",
              },
              {
                section: "Timeline and What to Expect",
                desc: "Realistic timeframes and milestones in the Chinese registration process",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start bg-white p-3 rounded-lg border border-blue-100">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-blue-900 m-0">{item.section}</p>
                  <p className="text-sm text-gray-600 m-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Jump Links */}
          <div className="mt-6 pt-4 border-t border-blue-200">
            <p className="font-medium text-blue-800 mb-2">Jump to a section:</p>
            <div className="flex flex-wrap gap-2">
              {[
                ["Why It Matters", "#why-it-matters"],
                ["Registration Process", "#registration-process"],
                ["Application Requirements", "#application-requirements"],
                ["Common Pitfalls", "#common-pitfalls"],
                ["Timeline", "#timeline"],
                ["FAQs", "#faqs"],
              ].map(([label, link], index) => (
                <a
                  key={index}
                  href={link}
                  className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm border border-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-blue max-w-none">
          <h2 id="why-it-matters" className="flex items-center text-2xl font-bold text-blue-900 mb-4 scroll-mt-20">
            <Target className="mr-3 h-6 w-6 text-blue-700" />
            Why China Trademark Registration Matters in 2025
          </h2>

          <p>
            China's massive consumer market presents enormous opportunities for businesses, but also significant risks
            for unprotected brands. A registered trademark in China provides essential legal protection and offers
            several important benefits:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              ["Exclusive rights to use your mark throughout China", "bg-green-50 border-green-200"],
              ["Legal protection against trademark squatting", "bg-blue-50 border-blue-200"],
              ["Ability to take action against counterfeiters", "bg-purple-50 border-purple-200"],
              ["Legal presumption of ownership in Chinese courts", "bg-amber-50 border-amber-200"],
              ["Required for e-commerce platforms like Tmall and JD.com", "bg-red-50 border-red-200"],
              ["Protection in the world's largest consumer market", "bg-teal-50 border-teal-200"],
              ["Asset that can be licensed to Chinese partners", "bg-indigo-50 border-indigo-200"],
              ["Ability to record with Chinese Customs to block infringing exports", "bg-orange-50 border-orange-200"],
            ].map(([benefit, classes], index) => (
              <div key={index} className={`p-4 rounded-lg ${classes} border`}>
                <p className="font-medium flex items-center m-0">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-white p-4 border-l-4 border-blue-500 my-6">
            <p className="text-blue-900 font-medium m-0">
              "China's 'first-to-file' system means that the first person to file a trademark application will generally
              be granted the rights to that mark, regardless of who used it first. This makes early registration
              absolutely essential for foreign brands." — China IP Protection Report, 2025
            </p>
          </div>

          <p>
            Without registration in China, your brand is vulnerable to trademark squatting, where third parties register
            your mark and then demand payment for its use or block your products from entering the Chinese market. This
            practice remains common despite recent legal reforms, making proactive registration the most effective
            protection strategy.
          </p>

          <h2
            id="registration-process"
            className="flex items-center text-2xl font-bold text-blue-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-blue-700" />
            The Complete China Trademark Registration Process
          </h2>

          <p>
            Registering a trademark with the China National Intellectual Property Administration (CNIPA) involves
            several key steps. Understanding this process helps ensure a smoother application experience and improves
            your chances of successful registration.
          </p>

          <div className="space-y-8 my-6">
            {/* Step 1 */}
            <div className="relative pl-8 border-l-2 border-blue-200">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Conduct a Comprehensive Trademark Search</h3>
              <p className="mb-3">
                Before filing, it's essential to determine if your desired mark is available in China. A thorough search
                helps identify potential conflicts with existing trademarks that could lead to rejection.
              </p>
              <p className="mb-3">A comprehensive search in China should include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The CNIPA trademark database</li>
                <li>Chinese character equivalents of your mark</li>
                <li>Phonetic equivalents in Mandarin</li>
                <li>Similar marks in relevant subclasses</li>
                <li>Well-known unregistered marks in China</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
                <div className="flex">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-amber-800 m-0">
                    <strong>Warning:</strong> China uses a unique subclass system within the international
                    classification system. A mark registered in the same class but different subclass may not prevent
                    registration of a similar mark. However, a comprehensive search across all relevant subclasses is
                    essential to avoid potential conflicts.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 border-l-2 border-blue-200">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Consider Chinese Character Versions</h3>
              <p className="mb-3">
                Foreign brands should consider registering both the original version of their mark and a Chinese
                character version. This is crucial because:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chinese consumers often create their own Chinese names for foreign brands</li>
                <li>Without registration, others may register the Chinese version of your mark</li>
                <li>Chinese character marks are essential for effective marketing in China</li>
              </ul>

              <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                <Search className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="italic text-blue-800 m-0">
                  <strong>Pro tip:</strong> When creating a Chinese version of your mark, consider working with local
                  branding experts who understand cultural nuances. The Chinese version can be a transliteration
                  (similar sound), a translation (similar meaning), or a combination of both.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 border-l-2 border-blue-200">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Prepare Your Application Materials</h3>
              <p className="mb-3">
                Gathering the right information and materials before starting your application will streamline the
                process. For a Chinese trademark application, you'll need:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A clear representation of your mark (JPG format, specific size requirements)</li>
                <li>A list of goods and services classified according to China's subclass system</li>
                <li>Applicant information, including Chinese translation of company name</li>
                <li>A copy of the applicant's business license or certificate of incorporation</li>
                <li>A power of attorney if filing through an agent (required for foreign applicants)</li>
                <li>Priority documents if claiming convention priority</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 border-l-2 border-blue-200">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">File Your Application</h3>
              <p className="mb-3">
                Applications are filed with the CNIPA. Foreign applicants must file through a licensed Chinese trademark
                agent. The filing process includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submitting the application form with all required information</li>
                <li>Paying the official filing fees (per class and subclass)</li>
                <li>Receiving an application receipt with filing number</li>
              </ul>
              <p className="mt-3">
                As of 2025, CNIPA accepts electronic filings, which typically process faster than paper applications.
                Your Chinese trademark agent will handle the submission and provide you with confirmation of filing.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative pl-8 border-l-2 border-blue-200">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Examination Process</h3>
              <p className="mb-3">The CNIPA examination process has several phases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Formal examination:</strong> Checking that the application meets all formal requirements
                </li>
                <li>
                  <strong>Substantive examination:</strong> Reviewing the mark for absolute and relative grounds for
                  refusal
                </li>
                <li>
                  <strong>Publication:</strong> If approved, the mark is published in the Trademark Gazette
                </li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-800 mb-2">Common reasons for rejection in China:</p>
                <ul className="list-disc pl-5 space-y-1 text-blue-900 m-0">
                  <li>Similarity to existing marks in the same or similar classes</li>
                  <li>Lack of distinctiveness</li>
                  <li>Containing prohibited elements (e.g., national flags, geographic names)</li>
                  <li>Marks considered contrary to socialist morality or having other unhealthy influences</li>
                  <li>Improper documentation for foreign applicants</li>
                </ul>
              </div>
              <p className="mt-3">
                If your application faces rejection, you'll receive a notification with reasons. You'll have 15 days to
                respond or file an appeal. Working with experienced counsel is particularly important at this stage.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative pl-8">
              <div className="absolute left-[-10px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Registration and Certificate</h3>
              <p className="mb-3">
                If no opposition is filed during the three-month opposition period after publication, the CNIPA will
                issue a trademark registration certificate. Once registered:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your trademark is protected for 10 years from the registration date</li>
                <li>You can use the ® symbol with your mark in China</li>
                <li>You can take legal action against infringers</li>
                <li>You can record your trademark with Chinese Customs</li>
                <li>You must use the mark in commerce to maintain protection</li>
              </ul>
            </div>
          </div>

          <h2
            id="application-requirements"
            className="flex items-center text-2xl font-bold text-blue-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-blue-700" />
            2025 China Trademark Application Requirements
          </h2>

          <p>
            Understanding the specific requirements for trademark applications in China will help ensure a smoother
            registration process. Here are the key requirements and considerations for 2025:
          </p>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Documentation Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Application form in Chinese (prepared by your trademark agent)</li>
              <li>Clear representation of the mark (JPG format, 5cm x 5cm, 300 dpi)</li>
              <li>Certified copy of business registration certificate with Chinese translation</li>
              <li>Notarized and legalized power of attorney (for foreign applicants)</li>
              <li>Priority documents (if claiming convention priority)</li>
              <li>Chinese translations of all foreign language documents</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Classification System</h3>
            <p className="mb-3">
              China uses the Nice Classification system (45 classes) but has developed its own unique subclass system
              within each class. This means:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Each class is divided into multiple subclasses</li>
              <li>Similar marks may coexist if they're in different subclasses, even within the same class</li>
              <li>Strategic selection of subclasses is crucial for comprehensive protection</li>
              <li>Consider filing in multiple subclasses for important marks</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">2025 Updates to China's Trademark System</h3>
            <p className="mb-3">Recent changes to China's trademark system that applicants should be aware of:</p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>Increased penalties for bad-faith applications and trademark squatting</li>
              <li>Streamlined electronic filing system with faster processing times</li>
              <li>Enhanced examination of marks that might be filed in bad faith</li>
              <li>Stricter requirements for proof of use in non-use cancellation actions</li>
              <li>New guidelines for determining similarity between marks</li>
            </ul>
            <p className="mt-3 italic">
              These changes reflect China's ongoing efforts to improve its intellectual property protection system and
              address concerns about bad-faith registrations.
            </p>
          </div>

          <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-100 my-6">
            <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 m-0">Important Note for Foreign Applicants:</p>
              <p className="text-amber-700 m-0">
                Foreign applicants without a business presence in China must file through a licensed Chinese trademark
                agent. Direct filing by foreign entities is not permitted. Additionally, all documents must be in
                Chinese or accompanied by certified Chinese translations. Working with experienced counsel familiar with
                both international and Chinese trademark law is highly recommended.
              </p>
            </div>
          </div>

          <h2
            id="common-pitfalls"
            className="flex items-center text-2xl font-bold text-blue-900 mb-4 mt-12 scroll-mt-20"
          >
            <AlertTriangle className="mr-3 h-6 w-6 text-blue-700" />
            Common Pitfalls and How to Avoid Them
          </h2>

          <p>
            Trademark registration in China presents unique challenges. Here are the most common pitfalls and strategies
            to overcome them:
          </p>

          <div className="space-y-6 my-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Trademark Squatting</h3>
              <p className="mb-3">
                China's first-to-file system has historically led to trademark squatting, where third parties register
                well-known foreign brands before the legitimate owner enters the Chinese market.
              </p>
              <p className="font-medium text-blue-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>File in China as early as possible, even before entering the market</li>
                <li>Register both Latin character and Chinese character versions of your mark</li>
                <li>Consider defensive registrations in related classes</li>
                <li>Monitor the Chinese trademark register for potentially conflicting applications</li>
                <li>For well-known marks, consider filing for well-known mark status protection</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Inadequate Coverage in Subclasses</h3>
              <p className="mb-3">
                Many applicants fail to understand China's subclass system, resulting in incomplete protection.
              </p>
              <p className="font-medium text-blue-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Work with experts familiar with China's subclass system</li>
                <li>File in all relevant subclasses, not just the main class</li>
                <li>Consider the specific goods and services you offer or plan to offer</li>
                <li>For important marks, consider broader coverage across multiple subclasses</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Neglecting Chinese Character Marks</h3>
              <p className="mb-3">
                Foreign companies often register only their original mark, overlooking the importance of Chinese
                character versions.
              </p>
              <p className="font-medium text-blue-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Develop a Chinese character version of your mark with local branding experts</li>
                <li>Register both transliteration (similar sound) and translation (similar meaning) versions</li>
                <li>Register the Chinese version before entering the market to prevent others from claiming it</li>
                <li>Consider how Chinese consumers might naturally refer to your brand</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Improper Documentation</h3>
              <p className="mb-3">
                Applications are often rejected due to incomplete or improperly prepared documentation.
              </p>
              <p className="font-medium text-blue-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Work with a licensed Chinese trademark agent familiar with CNIPA requirements</li>
                <li>Ensure all documents are properly notarized and legalized as required</li>
                <li>Provide accurate and complete translations of all foreign language documents</li>
                <li>Follow specific format requirements for mark representations</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Non-Use Vulnerability</h3>
              <p className="mb-3">
                Trademarks unused for three consecutive years are vulnerable to cancellation for non-use.
              </p>
              <p className="font-medium text-blue-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Maintain evidence of genuine commercial use in China</li>
                <li>Document use through dated invoices, advertisements, product photos, etc.</li>
                <li>If not yet using the mark, develop a clear timeline for market entry</li>
                <li>Consider licensing the mark to Chinese partners if direct use isn't feasible</li>
              </ul>
            </div>
          </div>

          <h2 id="timeline" className="flex items-center text-2xl font-bold text-blue-900 mb-4 mt-12 scroll-mt-20">
            <Calendar className="mr-3 h-6 w-6 text-blue-700" />
            Timeline and What to Expect
          </h2>

          <p>
            Understanding the typical timeline for trademark registration in China helps set realistic expectations and
            plan your business activities accordingly.
          </p>

          <div className="relative my-8">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

            {/* Filing */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-blue-800">Application Filing</h3>
                <p className="text-sm text-gray-500 mb-2">Day 1</p>
                <p className="m-0">
                  Your application is submitted to the CNIPA and assigned a filing number. This marks the official
                  filing date, which is important for establishing priority rights in China's first-to-file system.
                </p>
              </div>
            </div>

            {/* Initial Processing */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-blue-800">Formal Examination</h3>
                <p className="text-sm text-gray-500 mb-2">1-2 months</p>
                <p className="m-0">
                  The CNIPA reviews your application for compliance with formal requirements, including proper
                  documentation, classification, and payment of fees. Applications with formal deficiencies may receive
                  office actions.
                </p>
              </div>
            </div>

            {/* Substantive Examination */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Search className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-blue-800">Substantive Examination</h3>
                <p className="text-sm text-gray-500 mb-2">9-12 months</p>
                <p className="m-0">
                  Examiners review your mark for absolute and relative grounds for refusal, including similarity to
                  existing marks, distinctiveness, and compliance with Chinese trademark law. This is the longest phase
                  of the process.
                </p>
              </div>
            </div>

            {/* Publication */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-blue-800">Publication</h3>
                <p className="text-sm text-gray-500 mb-2">After examination approval</p>
                <p className="m-0">
                  If approved, your mark is published in the CNIPA Trademark Gazette for a three-month opposition
                  period. Third parties who believe they might be damaged by registration of your mark can file an
                  opposition.
                </p>
              </div>
            </div>

            {/* Registration */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-blue-800">Registration Certificate</h3>
                <p className="text-sm text-gray-500 mb-2">2-3 months after opposition period</p>
                <p className="m-0">
                  If no opposition is filed or if oppositions are resolved in your favor, the CNIPA issues your
                  registration certificate. Your trademark is now protected for 10 years from the registration date,
                  renewable indefinitely.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Total Timeline</h3>
            <p className="mb-3">The entire process typically takes:</p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>
                <strong>Standard applications:</strong> 12-18 months from filing to registration if there are no major
                issues
              </li>
              <li>
                <strong>Applications with office actions:</strong> Add 3-6 months for each office action response and
                review
              </li>
              <li>
                <strong>Opposed applications:</strong> Add 12-24 months if your application faces opposition
              </li>
            </ul>
            <p className="mt-3 italic text-blue-700">
              Note: These timelines are estimates based on current CNIPA processing times. Actual timelines may vary
              based on application complexity and CNIPA workload. The process has become more efficient in recent years,
              but China still has one of the highest trademark filing volumes in the world.
            </p>
          </div>

          <h2 id="faqs" className="flex items-center text-2xl font-bold text-blue-900 mb-4 mt-12 scroll-mt-20">
            <HelpCircle className="mr-3 h-6 w-6 text-blue-700" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 my-6">
            {[
              {
                q: "Can foreign companies file trademark applications directly with the CNIPA?",
                a: "No, foreign companies without a business presence in China must file through a licensed Chinese trademark agent. This is a legal requirement, and direct filing by foreign entities is not permitted. Your agent will prepare and submit all necessary documentation and serve as the official contact for communications from the CNIPA.",
              },
              {
                q: "Why should I register a Chinese character version of my trademark?",
                a: "Chinese consumers often create Chinese names for foreign brands based on sound (transliteration), meaning (translation), or a combination of both. By proactively creating and registering your own Chinese character mark, you maintain control over your brand identity in China and prevent others from registering Chinese versions of your mark. Chinese character marks are also essential for effective marketing to Chinese consumers.",
              },
              {
                q: "How long does trademark protection last in China?",
                a: "Trademark registrations in China are valid for 10 years from the date of registration. They can be renewed indefinitely for additional 10-year periods. Renewal applications can be filed up to 12 months before the expiration date. There is also a 6-month grace period after expiration, though late renewal incurs additional fees.",
              },
              {
                q: "What is China's subclass system and why is it important?",
                a: "While China uses the international Nice Classification system with 45 classes, it further divides each class into multiple subclasses. Similar marks may coexist if they're in different subclasses, even within the same class. This means that registering in the correct class alone may not provide comprehensive protection. Strategic selection of relevant subclasses is crucial for effective trademark protection in China.",
              },
              {
                q: "How can I protect my trademark against counterfeiting in China?",
                a: "After registration, you should: 1) Record your trademark with Chinese Customs to enable them to seize counterfeit goods at the border; 2) Monitor the market for infringing products; 3) Work with local investigators and legal counsel to gather evidence of infringement; 4) Take enforcement action through administrative complaints, civil litigation, or criminal prosecution depending on the severity of the infringement; 5) Consider joining industry anti-counterfeiting coalitions.",
              },
              {
                q: "What if someone has already registered my trademark in China?",
                a: "If someone has registered your trademark in China before you, you have several options: 1) Negotiate to purchase the mark from the current owner; 2) File a non-use cancellation action if the mark has not been used for three consecutive years; 3) File an invalidation action if the registration was obtained in bad faith or violates other provisions of Chinese trademark law; 4) Develop and register an alternative mark for the Chinese market. The best approach depends on specific circumstances and should be determined with expert legal advice.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-blue-800">{faq.q}</h3>
                <p className="text-gray-700 m-0">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-center text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Protect Your Brand in China?</h2>
            <p className="mb-6 text-lg max-w-2xl mx-auto">
              Securing trademark protection in China is a crucial step for any business with interests in the world's
              largest consumer market. Whether you're already operating in China or planning to enter the market, taking
              action now can save you from costly disputes and protect your valuable brand assets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/free-search">Get a Free Trademark Search</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/verification">Learn About Our Services</Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              This article was last updated on March 25, 2025, to reflect the latest CNIPA procedures and requirements.
              While we strive to provide accurate and up-to-date information, Chinese trademark law is complex and
              subject to change. For advice specific to your situation, we recommend consulting with a trademark
              professional experienced in Chinese intellectual property matters.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
