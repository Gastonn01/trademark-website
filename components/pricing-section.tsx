import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, FileCheck, FileSearch, Globe, Scale, ShieldCheck } from "lucide-react"

export function PricingSection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-700">Comprehensive Brand Protection</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "IP Legal Services",
              price: "from $160",
              description: "Expert legal analysis of your trademark",
              cta: "Learn More",
              href: "/verification",
              highlight: "FREE CONSULTATION",
            },
            {
              title: "Trademark Registration",
              price: "from $450",
              description: "Register your trademark with expert support",
              cta: "Start Free Search",
              href: "/free-search",
              highlight: "MONEY-BACK GUARANTEE",
            },
            {
              title: "Trademark Renewal",
              price: "from $685",
              description: "Renew your trademark before expiration",
              cta: "Renew Trademark",
              href: "/services#trademark-renewal",
              highlight: "10 YEAR VALIDITY",
            },
          ].map((plan, index) => (
            <Card key={index} className="border-2 hover:border-indigo-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-700">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm font-semibold text-indigo-600 mt-1">{plan.highlight}</div>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FileSearch,
              title: "Trademark Search",
              description: "Comprehensive search to ensure your trademark is unique",
            },
            {
              icon: FileCheck,
              title: "Application Filing",
              description: "Expert preparation and filing of your trademark application",
            },
            {
              icon: Scale,
              title: "Office Actions",
              description: "Professional responses to trademark office objections",
            },
            {
              icon: CheckCircle2,
              title: "Registration Certificate",
              description: "Secure your official trademark registration certificate",
            },
            {
              icon: Globe,
              title: "International Protection",
              description: "Extend your trademark protection globally",
            },
            {
              icon: ShieldCheck,
              title: "Ongoing Support",
              description: "Continuous assistance and monitoring of your trademark",
            },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
