import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ComparisonTable() {
  const features = [
    {
      name: "Initial risk assessment",
      industry: "Paid search (~ $150)",
      protectly: "Free lawyer's check in 24 hours",
    },
    {
      name: "Scope of services",
      industry: "Registration only",
      protectly: "Registration, Litigation support, Monitoring",
    },
    {
      name: "Coverage",
      industry: "1-2 countries only",
      protectly: "Global",
    },
    {
      name: "Registration process",
      industry: "Lengthy and often unclear",
      protectly: "Simple online 3-step process",
    },
    {
      name: "Application success rate",
      industry: "64.40%",
      protectly: "96.90%",
    },
    {
      name: "Pricing structure",
      industry: "Unclear with hidden fees",
      protectly: "Transparent, including all fees",
    },
    {
      name: "Access to Amazon Brand Registry",
      industry: "Months",
      protectly: "1-2 weeks",
    },
    {
      name: "Extra benefit",
      industry: "",
      protectly: "Peace of mind based on Protectly's record of 10,000+ satisfied clients",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-indigo-700">Why Choose Protectly?</h2>
          <p className="text-center text-gray-600 mb-12">See how we stand out in the trademark protection industry.</p>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 p-4 border-b bg-indigo-50">
              <div className="font-semibold text-indigo-700">Feature</div>
              <div className="font-semibold text-center text-indigo-700">Industry Average</div>
              <div className="font-semibold text-center text-indigo-700">Protectly</div>
            </div>
            {features.map((feature) => (
              <div key={feature.name} className="grid grid-cols-3 p-4 border-b hover:bg-gray-50">
                <div className="font-medium text-gray-700">{feature.name}</div>
                <div className="text-center text-gray-600">{feature.industry}</div>
                <div className="text-center text-indigo-600 font-medium">{feature.protectly}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg">
              <Link href="/verification">Start with Free Lawyer's Check</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

