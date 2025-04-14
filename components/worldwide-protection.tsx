import Image from "next/image"

export function WorldwideProtection() {
  const countries = [
    { name: "United States", flag: "/placeholder.svg", position: "bottom-24 right-20" },
    { name: "European Union", flag: "/placeholder.svg", position: "top-20 right-32" },
    { name: "United Kingdom", flag: "/placeholder.svg", position: "top-32 right-40" },
    { name: "Canada", flag: "/placeholder.svg", position: "top-16 left-32" },
    { name: "Australia", flag: "/placeholder.svg", position: "bottom-16 left-24" },
    { name: "Japan", flag: "/placeholder.svg", position: "top-24 right-24" },
    { name: "Singapore", flag: "/placeholder.svg", position: "bottom-32 right-32" },
    { name: "China", flag: "/placeholder.svg", position: "top-40 right-48" },
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-indigo-700">Global Trademark Protection</h2>
            <p className="text-xl text-gray-600">
              Protect your brand across borders with our comprehensive global coverage. Our network of trademark
              attorneys is ready to represent you worldwide, ensuring seamless and effective brand protection no matter
              where your business takes you.
            </p>
          </div>
          <div className="relative h-[400px]">
            {countries.map((country) => (
              <div key={country.name} className={`absolute ${country.position}`}>
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
