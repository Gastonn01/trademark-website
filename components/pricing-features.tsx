import { Shield, Globe, Clock, DollarSign, HeadphonesIcon, AlertCircle } from "lucide-react"

export function PricingFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Our trademark experts ensure your brand is fully protected across all relevant classes.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Protect your trademark in multiple countries with our international registration services.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Experience quick registration times with our efficient and streamlined process.",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Get top-notch trademark protection at prices that won't break your budget.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Access our team of experienced trademark attorneys for guidance and advice.",
    },
    {
      icon: AlertCircle,
      title: "Ongoing Monitoring",
      description: "We continuously monitor and protect your trademark from potential infringements.",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Why Choose Our Trademark Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

