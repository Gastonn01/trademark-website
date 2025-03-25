import { Card } from "@/components/ui/card"

const legalServices = [
  {
    title: "Ownership transfer",
    description: "Preparation of an assignment agreement for a trademark ownership transfer",
    price: "$ 640",
  },
  {
    title: "Cease and desist letter",
    description: "Preparation of a cease and desist letter to stop trademark infringement",
    price: "$ 880",
  },
  {
    title: "Co-existence agreement",
    description: "Negotiation with a counterparty and drafting of a co-existence agreement",
    price: "$ 880",
  },
  {
    title: "Response to a cease and desist letter",
    description: "Consultation and response related to a cease & desist request",
    price: "$ 880",
  },
  {
    title: "Settlement proposal letter",
    description: "Consultation and drafting of a co-existence agreement",
    price: "$ 880",
  },
  {
    title: "Office action response",
    description: "Advice and drafting of a response to an office action",
    price: "$ 1,360",
  },
  {
    title: "Opposition response",
    description: "Drafting a response to objections in the trademark registration process",
    price: "$ 1,920",
  },
  {
    title: "Trademark watch service",
    description: "Monthly monitoring of similar trademark applications",
    price: "$ 30/month",
  },
  {
    title: "Trademark infringement analysis",
    description: "Legal analysis of potential trademark infringement",
    price: "$ 1,200",
  },
  {
    title: "Trademark license agreement",
    description: "Drafting a trademark license agreement",
    price: "$ 1,600",
  },
  {
    title: "Trademark renewal",
    description: "Preparation and filing of trademark renewal application",
    price: "$ 480",
  },
  {
    title: "Trademark cancellation",
    description: "Preparation and filing of trademark cancellation request",
    price: "$ 1,440",
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
              <span className="font-light text-sm text-gray-700 ml-4">{service.price}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

