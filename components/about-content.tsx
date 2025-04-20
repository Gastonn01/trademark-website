import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Globe, Zap, Scale, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-8 text-center text-blue-900">About Just Protected</h1>

      {/* Hero Section */}
      <section className="mb-16 relative w-full overflow-hidden rounded-lg">
        <div className="w-full h-[400px] relative">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop"
            alt="Protect.ly team at work"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center rounded-lg">
            <p className="text-white text-2xl font-semibold text-center max-w-2xl px-4">
              Empowering businesses to safeguard their intellectual property in the digital age
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <h2 className="sr-only">Company Overview</h2>
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-blue-700">Our Mission</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          At Just Protected, we're committed to revolutionizing trademark protection, making it more accessible,
          efficient, and affordable for businesses of all sizes.
        </p>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <Shield className="w-16 h-16 text-blue-600 mb-2" />
            <span className="text-lg font-semibold">Protect</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-16 h-16 text-blue-600 mb-2" />
            <span className="text-lg font-semibold">Innovate</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-16 h-16 text-blue-600 mb-2" />
            <span className="text-lg font-semibold">Empower</span>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-blue-700">Who We Are</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-4">
              Founded recently, JustProtected is an innovative startup in the online trademark registration space. Our
              team combines fresh perspectives with legal expertise and cutting-edge technology to streamline the
              trademark protection process.
            </p>
            <p className="text-lg mb-4">
              As a new player in the field, we're committed to providing top-notch service to businesses of all sizes.
              From fellow startups to growing e-commerce brands, we're here to help navigate the complex world of
              trademark law and registration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center p-4">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold mb-2">75+</CardTitle>
              <CardContent>Countries Covered</CardContent>
            </Card>
            <Card className="text-center p-4">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold mb-2">10+</CardTitle>
              <CardContent>Dedicated Team Members</CardContent>
            </Card>
            <Card className="text-center p-4">
              <Scale className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold mb-2">24/7</CardTitle>
              <CardContent>Customer Support</CardContent>
            </Card>
            <Card className="text-center p-4">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-4xl font-bold mb-2">100%</CardTitle>
              <CardContent>Commitment to Excellence</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-blue-700">Our Approach</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <Search className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Technology-Driven Solutions</h3>
              <p className="text-lg">
                We're developing innovative AI and machine learning algorithms to enhance our trademark search
                capabilities, aiming to provide comprehensive protection for our clients' brands.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Scale className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Expert Human Oversight</h3>
              <p className="text-lg">
                While we embrace cutting-edge technology, we ensure that every application is carefully reviewed by our
                knowledgeable team to maximize the chances of successful registration.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Globe className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Global Perspective</h3>
              <p className="text-lg">
                In today's interconnected world, we offer international trademark registration services to protect your
                brand across borders and markets.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Clock className="w-12 h-12 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">Efficient Process</h3>
              <p className="text-lg">
                Our streamlined approach reduces the time and complexity typically associated with trademark
                registration, allowing you to focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-100 py-12 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Ready to Secure Your Brand's Future?</h2>
        <p className="text-lg mb-6">
          Join the growing number of businesses choosing Protect.ly for their trademark needs.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 transition-all duration-300"
        >
          <Link href="/free-search">
            <span className="flex items-center justify-center border-2 border-white/50 rounded-md px-6 py-2">
              Get Started Today
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Link>
        </Button>
      </section>
    </div>
  )
}
