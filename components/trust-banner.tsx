"use client"

export function TrustBanner() {
  const trustItems = ["Registered law firm", "Licensed attorneys", "15+ years of practice", "70+ countries"]

  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trustItems.map((item, index) => (
            <span key={index} className="flex items-center gap-10">
              <span className="label-caps text-[0.7rem] text-gray-400">{item}</span>
              {index < trustItems.length - 1 && (
                <span className="hidden md:inline-block w-1 h-1 rounded-full bg-accent" aria-hidden />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
