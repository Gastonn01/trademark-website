import Image from "next/image"

export function PricingTestimonials() {
  const testimonials = [
    {
      quote:
        "Protectly made trademark registration a breeze. Their team was incredibly helpful throughout the process.",
      author: "Jane Doe",
      company: "Tech Innovators Inc.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I was amazed at how quickly and efficiently Protectly handled our trademark application. Highly recommended!",
      author: "John Smith",
      company: "Global Brands LLC",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-indigo-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
