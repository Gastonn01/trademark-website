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
  title: "How to Register a Trademark in the United Kingdom (2025) | Complete Guide",
  description:
    "Comprehensive guide to UK trademark registration in 2025. Learn the step-by-step process, timelines, and requirements to protect your brand in the United Kingdom post-Brexit.",
  keywords:
    "UK trademark registration 2025, UKIPO, UK trademark, British trademark, UK brand protection, United Kingdom trademark, trademark application, trademark process UK, post-Brexit trademark",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-united-kingdom/",
    languages: {
      en: "https://justprotected.com/blog/register-trademark-united-kingdom/",
    },
  },
}

export default function RegisterTrademarkUK() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />

      {/* Hero Section with Enhanced Visual Appeal */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=800&fit=crop"
          alt="London skyline representing trademark registration in the UK"
          width={1600}
          height={800}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              How to Register a Trademark in the United Kingdom (2025)
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A Complete Guide to Protecting Your Brand Through UKIPO Registration Post-Brexit
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
            <p>Published: November 27, 2024</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-indigo max-w-none mb-10">
          <p className="text-xl leading-relaxed">
            Registering a trademark in the United Kingdom is essential for protecting your brand identity in the
            post-Brexit era. Whether you're a UK-based business or an international company looking to expand into the
            British market, securing trademark protection through the UK Intellectual Property Office (UKIPO) provides
            valuable legal rights and benefits that safeguard your business interests.
          </p>

          <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 my-6">
            <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <p className="italic text-blue-800 m-0">
              <strong>Did you know?</strong> Since Brexit, EU trademarks (EUTMs) no longer provide protection in the UK.
              While existing EUTMs were automatically cloned into UK registrations, new applications must be filed
              separately with the UKIPO to secure protection in the United Kingdom.
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
                section: "UK Trademark Protection Post-Brexit",
                desc: "How Brexit has changed trademark protection in the UK and what it means for your business",
              },
              {
                section: "The Complete Registration Process",
                desc: "A step-by-step breakdown of how to register with the UKIPO",
              },
              {
                section: "2025 Application Types and Requirements",
                desc: "Current UKIPO filing options and what you need for each",
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
                ["Post-Brexit Protection", "#post-brexit"],
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
          <h2 id="post-brexit" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 scroll-mt-20">
            <Target className="mr-3 h-6 w-6 text-indigo-700" />
            UK Trademark Protection Post-Brexit
          </h2>

          <p>
            Since the UK's departure from the European Union, the landscape for trademark protection in the United
            Kingdom has changed significantly. Understanding these changes is essential for developing an effective
            brand protection strategy.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            {[
              ["UK-specific protection separate from the EU", "bg-green-50 border-green-200"],
              ["Exclusive rights to use the mark in the UK market", "bg-blue-50 border-blue-200"],
              ["The ability to use the ® symbol in the UK", "bg-purple-50 border-purple-200"],
              ["Legal presumption of ownership in UK courts", "bg-amber-50 border-amber-200"],
              ["Foundation for international trademark protection", "bg-red-50 border-red-200"],
              ["Protection against UK-based counterfeiters", "bg-teal-50 border-teal-200"],
              ["Asset that can be licensed or sold in the UK market", "bg-indigo-50 border-indigo-200"],
              [
                "Ability to register with UK Customs to prevent imports of infringing goods",
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
              "The post-Brexit era has seen a 34% increase in UK-specific trademark applications, as businesses
              recognize the need for separate protection in this key market. Companies that fail to secure UK-specific
              rights are increasingly finding themselves vulnerable to infringement." — UK Intellectual Property Report,
              2024
            </p>
          </div>

          <p>
            For businesses that previously relied solely on EU trademark protection, securing a UK trademark has become
            an essential step. Without UK-specific registration, your brand protection in this major market is
            significantly weakened, potentially allowing competitors to use similar marks and dilute your brand
            identity.
          </p>

          <h2
            id="registration-process"
            className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-indigo-700" />
            The Complete Trademark Registration Process
          </h2>

          <p>
            Registering a trademark with the UK Intellectual Property Office (UKIPO) involves several key steps.
            Understanding this process helps ensure a smoother application experience and improves your chances of
            successful registration.
          </p>

          <div className="space-y-8 my-6">
            {/* Step 1 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Conduct a Comprehensive Trademark Search</h3>
              <p className="mb-3">
                Before filing, it's essential to determine if your desired mark is available in the UK. A thorough
                search helps identify potential conflicts with existing trademarks that could lead to rejection.
              </p>
              <p className="mb-3">A comprehensive UK search should include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The UKIPO's trademark database</li>
                <li>Common law (unregistered) trademarks in the UK</li>
                <li>UK company names and trade names</li>
                <li>UK domain names (.uk, .co.uk, etc.)</li>
                <li>Relevant industry directories and publications</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-4">
                <div className="flex">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-amber-800 m-0">
                    <strong>Warning:</strong> Approximately 25% of UK trademark applications face objections due to
                    conflicts with existing marks. A proper search is particularly important in the UK, where both
                    registered and unregistered rights can be enforced against later applications.
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
                <li>A clear representation of your mark (word, figurative, or combined)</li>
                <li>A description of the goods or services associated with your mark</li>
                <li>The appropriate Nice Classification classes for your goods/services</li>
                <li>Your business information and details of the applicant</li>
                <li>Information about any priority claims (if applicable)</li>
              </ul>

              <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100 mt-4">
                <Search className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <p className="italic text-blue-800 m-0">
                  <strong>Pro tip:</strong> The UKIPO offers a "Right Start" service that provides an examination report
                  before you pay the full application fee. This can be particularly valuable for first-time applicants
                  or those with potentially problematic marks.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">File Your Application</h3>
              <p className="mb-3">Applications are filed through the UKIPO's online services. You'll need to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Create a UKIPO account if you don't already have one</li>
                <li>Complete the application form with your mark and goods/services information</li>
                <li>Select the appropriate classes for your goods and services</li>
                <li>Pay the filing fees (varies based on application type and number of classes)</li>
                <li>Submit any priority documents if claiming priority from an earlier application</li>
              </ul>
              <p className="mt-3">
                After submission, you'll receive a filing receipt with your application number, which you'll use to
                track your application's progress.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Examination Process</h3>
              <p className="mb-3">
                After filing, your application will be examined by the UKIPO for compliance with UK trademark laws and
                regulations. This examination typically begins within 2-4 weeks of filing.
              </p>
              <p className="mb-3">
                The examiner will check for absolute grounds (inherent registrability) and relative grounds (conflicts
                with earlier rights). If issues are found, the UKIPO will issue an examination report requiring your
                response.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-800 mb-2">Common reasons for examination reports in 2025:</p>
                <ul className="list-disc pl-5 space-y-1 text-blue-900 m-0">
                  <li>Conflicts with existing UK or international marks designating the UK</li>
                  <li>Descriptive or non-distinctive marks</li>
                  <li>Overly broad specifications of goods/services</li>
                  <li>Protected geographical indications or emblems</li>
                  <li>Marks contrary to public policy or morality</li>
                </ul>
              </div>
              <p className="mt-3">
                You must respond to examination reports within the specified deadline (typically 2 months, with possible
                extensions). Failure to respond will result in your application being deemed withdrawn.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative pl-8 border-l-2 border-indigo-200">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Publication and Opposition Period</h3>
              <p className="mb-3">
                If your application passes examination, it will be published in the UKIPO's Trade Marks Journal for a
                2-month opposition period. During this time, third parties who believe they might be damaged by the
                registration of your mark can file an opposition.
              </p>
              <p className="mb-3">
                The opposition period can be extended by one month (to a total of 3 months) if a potential opponent
                files a "Notice of Threatened Opposition."
              </p>
              <p className="mb-3">
                If no opposition is filed (or if any opposition is resolved in your favor), your application will
                proceed to registration.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative pl-8">
              <div className="absolute left-[-10px] top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-800">Registration</h3>
              <p className="mb-3">
                If no oppositions are filed or all oppositions are overcome, the UKIPO will register your trademark.
                You'll receive a certificate of registration, and your mark will be added to the UK trademark register.
              </p>
              <p className="mb-3">
                UK trademark registrations last for 10 years from the filing date and can be renewed indefinitely for
                additional 10-year periods as long as the mark continues to be used in the UK.
              </p>
            </div>
          </div>

          <h2
            id="application-types"
            className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20"
          >
            <FileText className="mr-3 h-6 w-6 text-indigo-700" />
            2025 UKIPO Application Types and Requirements
          </h2>

          <p>
            The UK Intellectual Property Office offers different application options, each with its own requirements,
            benefits, and fee structure. Understanding these options helps you choose the most appropriate filing
            strategy for your situation.
          </p>

          <div className="my-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Standard Application</h3>
              <p className="mb-2">The traditional option for registering a trademark in the UK.</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Full fee payable at filing</li>
                <li>Examination report issued after payment</li>
                <li>Suitable for straightforward applications</li>
                <li>Lower overall cost if successful on first attempt</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-indigo-800">
              International Registration Designating the UK
            </h3>
            <p className="mb-3">
              For businesses already filing international applications through the Madrid System, designating the UK is
              an alternative to direct filing.
            </p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>File a single international application designating multiple countries including the UK</li>
              <li>Managed through the World Intellectual Property Organization (WIPO)</li>
              <li>Requires a base application or registration in your home country</li>
              <li>Can be more cost-effective for multi-country filings</li>
              <li>Subject to the same examination process by the UKIPO</li>
            </ul>
            <p className="mt-3 italic">
              This option is particularly valuable for businesses with international expansion plans beyond just the UK
              market.
            </p>
          </div>

          <div className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-100 my-6">
            <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 m-0">Important 2025 Update:</p>
              <p className="text-amber-700 m-0">
                The UKIPO has introduced stricter requirements for specifications of goods and services in 2025. Vague
                or overly broad terms are increasingly being objected to. Use clear, specific descriptions that
                accurately reflect your actual or intended business activities to avoid delays in the registration
                process.
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
            Many trademark applications in the UK encounter problems that could have been avoided with proper
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
                <li>Conduct a comprehensive search of the UK trademark register</li>
                <li>Consider similar-sounding and similar-looking marks, not just exact matches</li>
                <li>Search for unregistered rights that might be protected under UK passing off law</li>
                <li>Consider professional search services for important marks</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Descriptive or Non-Distinctive Marks</h3>
              <p className="mb-3">
                The UKIPO is particularly strict about refusing marks that merely describe characteristics of the
                goods/services or lack distinctive character.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Choose distinctive, unique marks rather than descriptive terms</li>
                <li>Consider arbitrary or invented words for stronger protection</li>
                <li>If using a descriptive term, add distinctive graphic elements</li>
                <li>Consider building evidence of acquired distinctiveness through use if your mark is borderline</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Overly Broad Specifications</h3>
              <p className="mb-3">
                The UKIPO has become increasingly strict about overly broad or vague specifications of goods and
                services.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Be specific about your actual goods and services</li>
                <li>Use the UKIPO's pre-approved terms where possible</li>
                <li>Avoid catch-all phrases like "all goods in this class"</li>
                <li>Consider the actual and intended scope of your business</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Ignoring UK-Specific Requirements</h3>
              <p className="mb-3">
                International applicants often make mistakes by assuming UK requirements are identical to other
                jurisdictions.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Be aware that the UK has its own distinct trademark system post-Brexit</li>
                <li>Pay attention to UK-specific classification practices</li>
                <li>Consider using a UK-based trademark attorney for local expertise</li>
                <li>Remember that EU rights no longer extend to the UK</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-indigo-800">Missing Deadlines</h3>
              <p className="mb-3">
                The UKIPO has strict deadlines for responses, and missing them can result in your application being
                deemed withdrawn.
              </p>
              <p className="font-medium text-indigo-700">How to avoid:</p>
              <ul className="list-disc pl-5 space-y-1 m-0">
                <li>Set calendar reminders for all UKIPO deadlines</li>
                <li>Remember that most examination reports have a 2-month response deadline</li>
                <li>Be aware that extensions are available but must be requested before the deadline expires</li>
                <li>Consider setting reminders earlier than the actual deadline to allow preparation time</li>
              </ul>
            </div>
          </div>

          <h2 id="timeline" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20">
            <Calendar className="mr-3 h-6 w-6 text-indigo-700" />
            Timeline and What to Expect
          </h2>

          <p>
            Understanding the typical timeline for UK trademark registration helps set realistic expectations and plan
            your business activities accordingly.
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
                  Your application is submitted to the UKIPO and assigned an application number. You can begin using the
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
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Examination</h3>
                <p className="text-sm text-gray-500 mb-2">2-4 weeks</p>
                <p className="m-0">
                  The UKIPO examines your application for compliance with UK trademark laws and regulations. This
                  includes checking for absolute grounds (inherent registrability) and relative grounds (conflicts with
                  earlier rights).
                </p>
              </div>
            </div>

            {/* Examination */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Search className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">
                  Response to Examination Report (if applicable)
                </h3>
                <p className="text-sm text-gray-500 mb-2">2-3 months</p>
                <p className="m-0">
                  If the examiner raises objections, you'll have 2 months to respond. This period may involve
                  negotiations with the examiner to overcome objections or amend your application.
                </p>
              </div>
            </div>

            {/* Publication */}
            <div className="relative mb-8 pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Publication for Opposition</h3>
                <p className="text-sm text-gray-500 mb-2">3-4 months after filing</p>
                <p className="m-0">
                  Your application is published in the UKIPO's Trade Marks Journal for a 2-month opposition period
                  (extendable to 3 months). Third parties who believe they might be damaged by registration of your mark
                  can file an opposition.
                </p>
              </div>
            </div>

            {/* Registration */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-1 text-indigo-800">Registration</h3>
                <p className="text-sm text-gray-500 mb-2">2-3 months after publication period</p>
                <p className="m-0">
                  If no opposition is filed (or if any opposition is resolved in your favor), the UKIPO will register
                  your trademark. You'll receive a certificate of registration, and your mark will be added to the UK
                  trademark register.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 my-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-800">Total Timeline</h3>
            <p className="mb-3">The entire process typically takes:</p>
            <ul className="list-disc pl-5 space-y-1 m-0">
              <li>
                <strong>Straightforward applications:</strong> 4-6 months from filing to registration if there are no
                objections or oppositions
              </li>
              <li>
                <strong>Applications with examination objections:</strong> Add 2-4 months for responding to and
                resolving objections
              </li>
              <li>
                <strong>Applications facing opposition:</strong> Add 6-18 months depending on the complexity of the
                opposition
              </li>
              <li>
                <strong>International registrations designating the UK:</strong> Similar timeline once the application
                reaches the UKIPO, plus WIPO processing time
              </li>
            </ul>
            <p className="mt-3 italic text-blue-700">
              Note: These timelines are estimates based on current UKIPO processing times. Actual timelines may vary
              based on application complexity and UKIPO workload.
            </p>
          </div>

          <h2 id="faqs" className="flex items-center text-2xl font-bold text-indigo-900 mb-4 mt-12 scroll-mt-20">
            <HelpCircle className="mr-3 h-6 w-6 text-indigo-700" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 my-6">
            {[
              {
                q: "Do I need a UK address to register a trademark in the United Kingdom?",
                a: "No, you don't need a UK address to register a trademark. However, if you're based outside the UK and the EU, you'll need to appoint a UK address for service. This can be a UK trademark attorney or agent who will receive official communications from the UKIPO on your behalf.",
              },
              {
                q: "How has Brexit affected EU trademarks in the UK?",
                a: "Since January 1, 2021, EU trademarks (EUTMs) no longer provide protection in the UK. Existing EUTMs registered before this date were automatically cloned into equivalent UK registrations at no cost. For new protection, separate applications must be filed with both the EUIPO (for EU protection) and the UKIPO (for UK protection).",
              },
              {
                q: "How long does UK trademark protection last?",
                a: "UK trademark registrations last for 10 years from the filing date. They can be renewed indefinitely for additional 10-year periods as long as the mark continues to be used in the UK. Renewal can be done up to 6 months before the expiry date, with a 6-month grace period after expiry (subject to late fees).",
              },
              {
                q: "Can I file a UK trademark application based on 'intent to use'?",
                a: "Yes, unlike some jurisdictions, the UK allows you to apply for trademark registration before you've actually used the mark. There's no requirement to prove use at the application stage. However, after registration, your mark becomes vulnerable to cancellation for non-use if it's not used for a continuous period of 5 years.",
              },
              {
                q: "What's the difference between the TM symbol and the ® symbol in the UK?",
                a: "The TM symbol can be used with any trademark, whether registered or not. It indicates that you're claiming rights in the mark. The ® symbol can only be used with trademarks that are registered in the UK. Using the ® symbol with an unregistered mark is a criminal offense in the UK under the Trade Marks Act 1994.",
              },
              {
                q: "Do I need separate registrations for different products or services?",
                a: "Not necessarily. A single UK trademark application can cover multiple goods and services, grouped into different 'classes' according to the Nice Classification system. Each additional class requires additional fees, but it's often more cost-effective than filing separate applications. The key is to ensure your specification accurately covers your current and planned business activities.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-indigo-800">{faq.q}</h3>
                <p className="text-gray-700 m-0">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="my-12 bg-white border border-indigo-100 rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
                <h2 className="text-2xl font-bold mb-4">Ready to Protect Your Brand in the UK?</h2>
                <p className="mb-6 text-lg">
                  Securing trademark protection in the United Kingdom is a crucial step in building a strong brand,
                  especially in the post-Brexit era.
                </p>
                <div className="flex items-center mt-8">
                  <Award className="h-12 w-12 text-white/80 mr-4" />
                  <p className="text-white/90">
                    Whether you're a UK business or looking to expand into the British market, taking action now can
                    save you from costly disputes in the future.
                  </p>
                </div>
              </div>
              <div className="md:col-span-2 p-8 bg-white flex flex-col justify-center">
                <div className="space-y-6">
                  <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Link href="/free-search">Get a Free Trademark Search</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  >
                    <Link href="/verification">Learn About Our Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              This article was last updated on November 27, 2024, to reflect the latest UKIPO procedures and
              requirements. While we strive to provide accurate and up-to-date information, trademark law is complex and
              subject to change. For advice specific to your situation, we recommend consulting with a trademark
              professional.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
