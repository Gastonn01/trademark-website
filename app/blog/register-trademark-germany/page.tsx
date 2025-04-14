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
  title: "How to Register a Trademark in Germany (2024) | Comprehensive Guide",
  description:
    "Master the process of trademark registration in Germany. Learn about local requirements, costs, and strategies for protecting your brand in Europe's largest economy.",
  keywords:
    "Germany trademark registration, German IP law, DPMA, brand protection Germany, intellectual property Germany, trademark filing Germany",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-germany/",
  },
}

export default function RegisterTrademarkGermany() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />

      {/* Hero Section with Enhanced Visual Appeal */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&h=800&fit=crop"
          alt="Berlin skyline representing trademark registration in Germany"
          width={1600}
          height={800}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              How to Register a Trademark in Germany (2024)
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A Complete Guide to Protecting Your Brand Through DPMA Registration
            </p>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Author and Publication Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 text-gray-600 border-b pb-4">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
              <span className="font-bold">JP</span>
            </div>
            <div>
              <p className="font-medium">By JustProtected Team</p>
              <p className="text-sm">Trademark Specialists</p>
            </div>
          </div>
          <div className="text-sm">
            <p>Published: March 15, 2024</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-indigo max-w-none mb-10">
          <p className="text-xl leading-relaxed">
            Registering a trademark in Germany is a crucial step for businesses looking to protect their brand in
            Europe's largest economy. Whether you're a startup, small business, or established company, securing
            trademark protection through the German Patent and Trade Mark Office (DPMA) provides valuable legal rights
            and benefits that can safeguard your business for years to come.
          </p>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 my-6">
            <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <p className="italic text-blue-800 m-0">
              <strong>Did you know?</strong> Germany is Europe's largest economy and a key market for international
              brands. With over 80,000 trademark applications filed annually, securing your rights early is essential
              for businesses with European ambitions.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-10 p-6 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            What We'll Cover in This Guide:
          </h2>
          <div className="grid gap-4">
            {[
              {
                section: "Why German Trademark Registration Matters",
                desc: "The legal benefits and business advantages of DPMA protection",
              },
              {
                section: "The Complete Registration Process",
                desc: "A step-by-step breakdown of how to register with the DPMA",
              },
              {
                section: "2024 Application Types and Requirements",
                desc: "Current DPMA filing options and what you need for each",
              },
              {
                section: "Common Pitfalls and How to Avoid Them",
                desc: "Mistakes that lead to rejection and strategies for success",
              },
              {
                section: "Timeline and What to Expect",
                desc: "Realistic timeframes and milestones in the registration process",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start bg-white p-3 rounded-lg border border-indigo-100">
                <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-indigo-900 m-0">{item.section}</p>
                  <p className="text-sm text-gray-600 m-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Jump Links */}
          <div className="mt-6 pt-4 border-t border-indigo-200">
            <p className="font-medium text-indigo-800 mb-2">Jump to a section:</p>
            <div className="flex flex-wrap gap-2">
              {[
                ["Why It Matters", "#why-it-matters"],
                ["Registration Process", "#registration-process"],
                ["Application Types", "#application-types"],
                ["Common Pitfalls", "#common-pitfalls"],
                ["Timeline", "#timeline"],
                ["FAQs", "#faqs"],
              ].map(([label, link], index) => (
                <a
                  key={index}
                  href={link}
                  className="px-3 py-1 bg-white text-indigo-700 rounded-full text-sm border border-indigo-200 hover:bg-indigo-700 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-indigo max-w-none">
          <h2 id="why-it-matters" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 scroll-mt-20">
            <Target className="mr-3 h-6 w-6 text-indigo-700" />
            Why German Trademark Registration Matters in 2024
          </h2>

          <p>
            In today's competitive global marketplace, protecting your brand in Germany offers several important
            benefits:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              ["Exclusive rights to use your mark throughout Germany", "bg-green-50 border-green-200"],
              ["Legal protection against infringement and counterfeiting", "bg-blue-50 border-blue-200"],
              ["Foundation for EU-wide trademark protection", "bg-purple-50 border-purple-200"],
              ["Legal presumption of ownership in court proceedings", "bg-amber-50 border-amber-200"],
              ["Ability to license your trademark to third parties", "bg-red-50 border-red-200"],
              ["Protection in Germany's influential digital marketplace", "bg-teal-50 border-teal-200"],
              ["Asset that can be valued and included in company assets", "bg-indigo-50 border-indigo-200"],
              [
                "Ability to register with German Customs to prevent imports of infringing goods",
                "bg-orange-50 border-orange-200",
              ],
            ].map(([benefit, classes], index) => (
              <div key={index} className={`p-4 rounded-lg ${classes} border`}>
                <p className="font-medium flex items-center m-0">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-white p-4 border-l-4 border-indigo-500 my-6">
            <p className="text-indigo-900 font-medium m-0">
              "Germany remains the economic powerhouse of Europe, with a GDP of over €3.6 trillion. For businesses with
              European ambitions, securing trademark protection in Germany is often the first and most crucial step." —
              European Trademark Monitor, 2024
            </p>
          </div>

          <p>
            Without proper registration, your brand protection is limited, leaving you vulnerable to competitors who
            might register similar marks. As e-commerce continues to expand, nationwide protection in key markets like
            Germany has become essential for businesses of all sizes.
          </p>

          <h2
            id="registration-process"
            className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-indigo-700" />
            The Complete Trademark Registration Process
          </h2>

          <p>
            Registering a trademark with the DPMA involves several key steps. Understanding this process helps ensure a
            smoother application experience and improves your chances of successful registration.
          </p>

          <div className="space-y-8 my-6">
            {/* Step 1 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Conduct a Comprehensive Trademark Search</h3>
              <p className="mb-3">
                Before filing, it's essential to determine if your desired mark is available. A thorough search helps
                identify potential conflicts with existing trademarks that could lead to rejection.
              </p>
              <p className="mb-3">A comprehensive search should include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The DPMA's trademark database (DPMAregister)</li>
                <li>The EU Intellectual Property Office (EUIPO) database</li>
                <li>Common law (unregistered) trademarks in Germany</li>
                <li>Business name registrations</li>
                <li>Domain names and social media handles</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
                <div className="flex">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-amber-800 m-0">
                    <strong>Warning:</strong> Approximately 25% of trademark applications in Germany are rejected due to
                    conflicts with existing marks. Most of these rejections could have been avoided with proper
                    searching. This step is crucial for saving time and money.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Prepare Your Application Materials</h3>
              <p className="mb-3">
                Gathering the right information and materials before starting your application will streamline the
                process. You'll need:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A clear representation of your mark (standard character, stylized, or design)</li>
                <li>A description of the goods or services associated with your mark</li>
                <li>The appropriate international class(es) for your goods/services</li>
                <li>Your business information</li>
                <li>A German correspondence address (if you're a foreign applicant)</li>
              </ul>

              <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                <Search className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="italic text-blue-800 m-0">
                  <strong>Pro tip:</strong> The way you describe your goods and services can significantly impact both
                  your chances of approval and the scope of your protection. Be specific enough to avoid conflicts but
                  broad enough to cover your business growth.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">File Your Application</h3>
              <p className="mb-3">
                Applications are filed through the DPMA's electronic filing system (DPMAdirekt). You'll need to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create a DPMA account if you don't already have one</li>
                <li>Complete the application form with your mark and goods/services information</li>
                <li>Upload a representation of your mark</li>
                <li>Pay the filing fees (varies based on number of classes)</li>
              </ul>
              <p className="mt-3">
                After submission, you'll receive a confirmation with your application number, which you'll use to track
                your application's progress.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Respond to DPMA Examination</h3>
              <p className="mb-3">
                After filing, your application will be assigned to a DPMA examining attorney who will review it for
                compliance with trademark laws and regulations. This review typically begins 2-3 months after filing.
              </p>
              <p className="mb-3">
                If the examiner finds issues with your application, they'll issue an "Office Action" requiring your
                response. Office actions can range from simple administrative requests to substantive refusals based on
                likelihood of confusion with existing marks.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-800 mb-2">Common reasons for Office Actions in 2024:</p>
                <ul className="list-disc pl-5 space-y-1 text-blue-900 m-0">
                  <li>Likelihood of confusion with existing marks</li>
                  <li>Merely descriptive or generic marks</li>
                  <li>Overly broad descriptions of goods/services</li>
                  <li>Improper classification of goods/services</li>
                  <li>Formal deficiencies in the application</li>
                </ul>
              </div>
              <p className="mt-3">
                You must respond to Office Actions within the specified deadline (typically 1-2 months). Failure to
                respond will result in abandonment of your application.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Registration and Opposition Period</h3>
              <p className="mb-3">
                If your application passes examination, it will be registered. Unlike many other countries, Germany does
                not have a pre-registration opposition period. Instead, third parties who believe they might be damaged
                by the registration of your mark can file an opposition within three months after registration.
              </p>
              <p className="mb-3">
                If no opposition is filed (or if any opposition is resolved in your favor), your registration will be
                confirmed.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative pl-8">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Maintaining Your Trademark</h3>
              <p className="mb-3">After registration, you'll need to maintain your trademark:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use your mark in commerce to avoid non-use cancellation (after five years)</li>
                <li>Renew your registration every 10 years</li>
                <li>Monitor the market for potential infringements</li>
                <li>Consider recording your trademark with German Customs for border protection</li>
              </ul>
            </div>
          </div>

          <h2
            id="application-types"
            className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-indigo-700" />
            2024 DPMA Application Types and Requirements
          </h2>

          <p>
            The DPMA offers different application options, each with its own requirements and fee structure.
            Understanding these options helps you choose the most appropriate filing strategy for your situation.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Standard Application</h3>
              <p className="mb-2">The traditional option for registering your trademark in Germany.</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Covers one or more classes of goods/services</li>
                <li>Base fee of €300 for up to three classes</li>
                <li>Additional fee of €100 per class beyond three</li>
                <li>Electronic filing recommended for faster processing</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Collective Mark</h3>
              <p className="mb-2">For associations representing multiple businesses.</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Used by associations to protect marks used by their members</li>
                <li>Requires regulations governing use of the mark</li>
                <li>Higher filing fee than standard applications</li>
                <li>Provides protection for all authorized users</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-indigo-800">Alternative: EU Trademark (EUTM)</h3>
            <p className="mb-3">
              Instead of filing directly with the DPMA, you might consider filing an EU Trademark application, which
              provides protection across all EU member states, including Germany:
            </p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>Single application covering all 27 EU member states</li>
              <li>Base fee of €850 for one class (electronic filing)</li>
              <li>Administered by the European Union Intellectual Property Office (EUIPO)</li>
              <li>Potential cost savings compared to filing in multiple individual countries</li>
              <li>Unified protection across the entire EU market</li>
            </ul>
            <p className="mt-3 italic">
              An EU Trademark can be a cost-effective option if you plan to do business in multiple European countries.
            </p>
          </div>

          <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-100 my-6">
            <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 m-0">Important 2024 Update:</p>
              <p className="text-amber-700 m-0">
                The DPMA has implemented stricter examination standards for descriptive marks in 2024. Applications for
                marks that directly describe characteristics of the goods/services are facing higher rejection rates.
                Consider choosing more distinctive marks or providing evidence of acquired distinctiveness through use.
              </p>
            </div>
          </div>

          <h2
            id="common-pitfalls"
            className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20"
          >
            <AlertTriangle className="mr-3 h-6 w-6 text-indigo-700" />
            Common Pitfalls and How to Avoid Them
          </h2>

          <p>
            Many trademark applications in Germany encounter problems that could have been avoided with proper
            preparation. Here are the most common pitfalls and strategies to overcome them:
          </p>

          <div className="space-y-6 my-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Inadequate Trademark Search</h3>
              <p className="mb-3">
                Many applicants perform only a basic search or skip this step entirely, leading to conflicts with
                existing marks.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Conduct a comprehensive search across multiple databases</li>
                <li>Consider similar-sounding and similar-looking marks, not just exact matches</li>
                <li>Search within your specific industry and related industries</li>
                <li>Consider professional search services for important marks</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Descriptive or Generic Marks</h3>
              <p className="mb-3">
                Marks that merely describe your products or services are difficult or impossible to register in Germany.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Choose distinctive, unique marks rather than descriptive terms</li>
                <li>Consider arbitrary or fanciful marks</li>
                <li>If using a descriptive term, add distinctive elements</li>
                <li>
                  Test your mark with the "competitors test": Would competitors need to use this term to describe their
                  products?
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Incorrect Classification</h3>
              <p className="mb-3">
                Selecting the wrong Nice Classification classes for your goods/services can lead to inadequate
                protection or unnecessary costs.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Carefully review the Nice Classification system</li>
                <li>Consider both current and future business activities</li>
                <li>Use the DPMA's classification database for guidance</li>
                <li>Focus on classes that cover your core business activities</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Overly Broad Goods/Services Descriptions</h3>
              <p className="mb-3">
                Descriptions that are too vague or broad often trigger office actions and can lead to delays.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Be specific about your actual goods and services</li>
                <li>Use the DPMA's pre-approved descriptions when possible</li>
                <li>Avoid catch-all phrases like "and related goods"</li>
                <li>Consider filing in multiple classes if your business spans different categories</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Missing Deadlines</h3>
              <p className="mb-3">
                The DPMA has strict deadlines for responses, and missing them can result in abandonment of your
                application.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Set calendar reminders for all DPMA deadlines</li>
                <li>Remember that most office actions have a 1-2 month response deadline</li>
                <li>Consider setting reminders earlier than the actual deadline to allow preparation time</li>
                <li>If you need more time, request an extension before the deadline expires</li>
              </ul>
            </div>
          </div>

          <h2 id="timeline" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20">
            <Calendar className="mr-3 h-6 w-6 text-indigo-700" />
            Timeline and What to Expect
          </h2>

          <p>
            Understanding the typical timeline for trademark registration in Germany helps set realistic expectations
            and plan your business activities accordingly.
          </p>

          <div className="relative my-8">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>

            {/* Filing */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Application Filing</h3>
                <p className="text-sm text-gray-500 mb-2">Day 1</p>
                <p className="m-0">
                  Your application is submitted to the DPMA and assigned an application number. You can begin using the
                  ™ symbol (but not the ® symbol yet).
                </p>
              </div>
            </div>

            {/* Initial Processing */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Initial Processing</h3>
                <p className="text-sm text-gray-500 mb-2">1-2 months</p>
                <p className="m-0">
                  The DPMA processes your application and assigns it to an examining attorney. Your application appears
                  in the DPMA database but hasn't been reviewed yet.
                </p>
              </div>
            </div>

            {/* Examination */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Search className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Substantive Examination</h3>
                <p className="text-sm text-gray-500 mb-2">2-4 months</p>
                <p className="m-0">
                  An examining attorney reviews your application for compliance with trademark laws and regulations.
                  They may issue an office action if there are issues to address.
                </p>
              </div>
            </div>

            {/* Office Action Response (if applicable) */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Office Action Response Period</h3>
                <p className="text-sm text-gray-500 mb-2">1-2 months</p>
                <p className="m-0">
                  If you receive an office action, you have 1-2 months to respond (with possible extensions). The
                  examining attorney will review your response and either approve your application or issue another
                  office action.
                </p>
              </div>
            </div>

            {/* Registration */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Registration</h3>
                <p className="text-sm text-gray-500 mb-2">4-8 months after filing</p>
                <p className="m-0">
                  If your application is approved, the DPMA will register your trademark. You can now use the ® symbol
                  with your mark in Germany.
                </p>
              </div>
            </div>

            {/* Opposition Period */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Opposition Period</h3>
                <p className="text-sm text-gray-500 mb-2">3 months after registration</p>
                <p className="m-0">
                  Third parties have 3 months from the date of registration to file an opposition. If no opposition is
                  filed (or if any opposition is resolved in your favor), your registration is confirmed.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Total Timeline</h3>
            <p className="mb-3">The entire process typically takes:</p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>
                <strong>Without office actions:</strong> 4-8 months from filing to registration
              </li>
              <li>
                <strong>With office actions:</strong> Add 2-4 months for each office action response and review
              </li>
              <li>
                <strong>Opposition period:</strong> 3 months after registration
              </li>
            </ul>
            <p className="mt-3 italic text-blue-700">
              Note: These timelines are estimates based on current DPMA processing times. Actual timelines may vary
              based on application complexity and DPMA workload.
            </p>
          </div>

          <h2 id="faqs" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20">
            <HelpCircle className="mr-3 h-6 w-6 text-indigo-700" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 my-6">
            {[
              {
                q: "Can I file a German trademark application myself, or do I need an attorney?",
                a: "While you can file a trademark application yourself, the DPMA recommends using a qualified trademark attorney, especially for foreign applicants. The application process involves legal complexities, and an attorney can help navigate potential issues, respond to office actions, and improve your chances of successful registration.",
              },
              {
                q: "What's the difference between a German national trademark and an EU trademark?",
                a: "A German national trademark provides protection only within Germany, while an EU trademark (EUTM) provides protection across all 27 EU member states. If you only need protection in Germany, a national filing may be more cost-effective. However, if you plan to do business in multiple EU countries, an EUTM might be more efficient.",
              },
              {
                q: "How long does German trademark protection last?",
                a: "German trademark registrations last for 10 years from the filing date and can be renewed indefinitely for additional 10-year periods as long as you continue to use the mark and pay the renewal fees.",
              },
              {
                q: "Can I file for a trademark before I start using it in Germany?",
                a: "Yes, unlike some countries, Germany does not require proof of use to obtain registration. However, if you don't use your mark in commerce within 5 years of registration, it becomes vulnerable to cancellation for non-use.",
              },
              {
                q: "What if someone is already using a similar mark in Germany?",
                a: "This depends on several factors, including who used it first, whether it's registered, and how similar the goods/services are. In some cases, you might need to modify your mark, limit your goods/services, or consider a different name. In others, coexistence might be possible. This is definitely a situation where professional guidance is valuable.",
              },
              {
                q: "Do I need separate registrations for different products or services?",
                a: "Not necessarily. A single trademark application can cover multiple related goods and services, grouped into different 'classes.' Each class requires additional fees, but it's often more cost-effective than filing separate applications. Strategic class selection is important to ensure comprehensive protection for your business activities.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-indigo-800">{faq.q}</h3>
                <p className="text-gray-700 m-0">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="my-12 rounded-lg overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Ready to Secure Your Brand in Germany?</h2>
                <p className="mb-6 text-blue-100">
                  Let our experts guide you through the complexities of German trademark law and registration.
                </p>
                <div className="flex justify-center">
                  <div className="bg-blue-500/30 p-4 rounded-full">
                    <Award className="h-16 w-16 text-white/80" />
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white flex flex-col justify-center">
                <p className="text-gray-700 mb-6">
                  Whether you're a German business or looking to expand into the European market, taking action now can
                  save you from costly disputes in the future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/verification">Start Registration</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Link href="/free-search">Free Trademark Search</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              This article was last updated on March 25, 2024, to reflect the latest DPMA procedures and requirements.
              While we strive to provide accurate and up-to-date information, trademark law is complex and subject to
              change. For advice specific to your situation, we recommend consulting with a trademark professional.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
