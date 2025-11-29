import { Card } from "@/components/ui/card"

const legalServices = [
  {
    title: "Ownership transfer",
    description: "Preparation of an assignment agreement for a trademark ownership transfer",
    priceEUR: 587,
    priceUSD: 640, // 587 * 1.09 = 640
  },
  {
    title: "Cease and desist letter",
    description: "Preparation of a cease and desist letter to stop trademark infringement",
    priceEUR: 807,
    priceUSD: 880, // 807 * 1.09 = 880
  },
  {
    title: "Co-existence agreement",
    description: "Negotiation with a counterparty and drafting of a co-existence agreement",
    priceEUR: 807,
    priceUSD: 880, // 807 * 1.09 = 880
  },
  {
    title: "Response to a cease and desist letter",
    description: "Consultation and response related to a cease & desist request",
    priceEUR: 807,
    priceUSD: 880, // 807 * 1.09 = 880
  },
  {
    title: "Settlement proposal letter",
    description: "Consultation and drafting of a co-existence agreement",
    priceEUR: 807,
    priceUSD: 880, // 807 * 1.09 = 880
  },
  {
    title: "Office action response",
    description: "Advice and drafting of a response to an office action",
    priceEUR: 1248,
    priceUSD: 1360, // 1248 * 1.09 = 1360
  },
  {
    title: "Opposition response",
    description: "Drafting a response to objections in the trademark registration process",
    priceEUR: 1761,
    priceUSD: 1920, // 1761 * 1.09 = 1920
  },
  {
    title: "Trademark watch service",
    description: "Monthly monitoring of similar trademark applications",
    priceEUR: 28,
    priceUSD: 30, // 28 * 1.09 ≈ 30
  },
  {
    title: "Trademark infringement analysis",
    description: "Legal analysis of potential trademark infringement",
    priceEUR: 1101,
    priceUSD: 1200, // 1101 * 1.09 = 1200
  },
  {
    title: "Trademark license agreement",
    description: "Drafting a trademark license agreement",
    priceEUR: 1468,
    priceUSD: 1600, // 1468 * 1.09 = 1600
  },
  {
    title: "Trademark renewal",
    description: "Preparation and filing of trademark renewal application",
    priceEUR: 440,
    priceUSD: 480, // 440 * 1.09 = 480
  },
  {
    title: "Trademark cancellation",
    description: "Preparation and filing of trademark cancellation request",
    priceEUR: 1321,
    priceUSD: 1440, // 1321 * 1.09 = 1440
  },
]

export function LegalServicesContent() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-3xl mx-auto p-6 bg-white shadow-sm">
        <h2 className="text-xl font-light mb-6 text-gray-800">Legal Services Pricing</h2>
        <div className="space-y-3">
          {legalServices.map((service, index) => (
            <div key={index} className="flex justify-between items-start py-2 border-b last:border-b-0 border-gray-100">
              <div>
                <h3 className="font-medium text-sm text-gray-700">{service.title}</h3>
                <p className="text-xs text-gray-500">{service.description}</p>
              </div>
              <span className="font-light text-sm text-gray-700 ml-4">
                {service.title === "Trademark watch service" ? `$ ${service.priceUSD}/month` : `$ ${service.priceUSD}`}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
