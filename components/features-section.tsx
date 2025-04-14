import { Shield, Globe, Clock, DollarSign } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Secure your brand across all relevant classes and jurisdictions.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Register your trademark in multiple countries with ease.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Get your trademark registered quickly with our streamlined process.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Protect your brand without breaking the bank. Transparent pricing, no hidden fees.",
    },
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">Why Choose Protectly</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
