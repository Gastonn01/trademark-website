import Link from "next/link"

export function ProcessSection() {
  const steps = [
    {
      step: "1",
      process: "Free Trademark Search",
      help: "Instantly check if your brand name is available before investing in registration.",
      isClickable: true,
    },
    {
      step: "2",
      process: "Application Filing Done Right",
      help: "Our experts handle the paperwork and ensure your application meets all legal requirements, reducing the risk of rejection.",
      isClickable: false,
    },
    {
      step: "3",
      process: "We Monitor & Guide You",
      help: "We track the process, provide updates, and help navigate any challenges along the way.",
      isClickable: false,
    },
    {
      step: "4",
      process: "Your Brand is Legally Protected",
      help: "Once registered, your trademark is secured and renewable as per each country's laws, giving you full ownership and enforcement rights.",
      isClickable: false,
    },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">The Registration Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined approach makes trademark registration simple and efficient
          </p>
        </div>

        {/* Amazon-style progress tracker */}
        <div className="mb-12 relative">
          <div className="hidden md:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-1 bg-gray-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 ${index === 0 ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  {step.step}
                </div>
                <h3 className="mt-4 text-center font-medium text-gray-900">
                  {step.isClickable ? (
                    <Link href="/verification" className="text-blue-600 hover:underline">
                      {step.process}
                    </Link>
                  ) : (
                    step.process
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-600 text-center">{step.help}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Amazon-style info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Why register your trademark?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Legal protection against copycats and infringers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Exclusive rights to use your brand name and logo</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Increased brand value and customer trust</span>
              </li>
            </ul>
          </div>
          <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Our guarantee</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Expert legal support throughout the process</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Transparent pricing with no hidden fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-sm text-gray-700">Regular updates on your application status</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Amazon-style CTA */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Ready to protect your brand?</h3>
            <p className="text-sm text-gray-600">Start with a free trademark search today.</p>
          </div>
          <Link
            href="/free-search"
            className="mt-4 md:mt-0 px-6 py-2 bg-yellow-400 border border-yellow-500 rounded-full text-sm font-medium text-gray-900 hover:bg-yellow-500 transition-colors"
          >
            Start Free Search
          </Link>
        </div>
      </div>
    </div>
  )
}

