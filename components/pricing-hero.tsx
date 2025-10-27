import { Button } from "@/components/ui/button"

export function PricingHero() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Flat Fees. No Hidden Extras.</h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto">
          What you see is what you pay — always. No surprise charges, no unclear government fees.
        </p>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Choose a plan that fits your needs and budget. All plans include our comprehensive trademark protection
          services.
        </p>
        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" asChild>
          <a href="#plans">View Plans</a>
        </Button>
      </div>
    </div>
  )
}
