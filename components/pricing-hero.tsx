import { Button } from "@/components/ui/button"

export function PricingHero() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Protect Your Brand, Grow Your Business</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
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
