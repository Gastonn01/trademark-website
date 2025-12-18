import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Shield, Users, Globe, Zap, Scale, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 relative w-full overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full h-[500px] relative">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop"
            alt="Just Protected team at work"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-accent/60 flex items-center justify-center rounded-2xl">
            <p className="text-white text-3xl md:text-4xl font-semibold text-center max-w-3xl px-4 leading-tight">
              Empowering businesses to safeguard their intellectual property in the digital age
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <h2 className="sr-only">Company Overview</h2>
      <section className="mb-20 text-center bg-gradient-to-b from-white to-gray-50 py-16 rounded-2xl shadow-sm">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Mission</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
          At Just Protected, we're committed to revolutionizing trademark protection, making it more accessible,
          efficient, and affordable for businesses of all sizes.
        </p>
        <div className="flex justify-center space-x-12 md:space-x-16">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
              <Shield className="w-12 h-12 text-accent" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Protect</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
              <Zap className="w-12 h-12 text-accent" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Innovate</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-accent" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Empower</span>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Who We Are</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              Founded recently, Just Protected is an innovative startup in the online trademark registration space. Our
              team combines fresh perspectives with legal expertise and cutting-edge technology to streamline the
              trademark protection process.
            </p>
            <p className="text-lg mb-4 text-gray-700 leading-relaxed">
              As a new player in the field, we're committed to providing top-notch service to businesses of all sizes.
              From fellow startups to growing e-commerce brands, we're here to help navigate the complex world of
              trademark law and registration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 border-accent">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2 text-gray-900">75+</CardTitle>
              <CardContent className="text-gray-600">Countries Covered</CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 border-accent">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2 text-gray-900">10+</CardTitle>
              <CardContent className="text-gray-600">Dedicated Team</CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 border-accent">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2 text-gray-900">24/7</CardTitle>
              <CardContent className="text-gray-600">Support</CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 border-accent">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2 text-gray-900">100%</CardTitle>
              <CardContent className="text-gray-600">Excellence</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mb-20 bg-gradient-to-b from-gray-50 to-white py-16 rounded-2xl shadow-sm">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900 text-center">Our Approach</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-8">
          <div className="flex items-start space-x-6 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Technology-Driven Solutions</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're developing innovative AI and machine learning algorithms to enhance our trademark search
                capabilities, aiming to provide comprehensive protection for our clients' brands.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-6 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Scale className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Expert Human Oversight</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                While we embrace cutting-edge technology, we ensure that every application is carefully reviewed by our
                knowledgeable team to maximize the chances of successful registration.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-6 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Global Perspective</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                In today's interconnected world, we offer international trademark registration services to protect your
                brand across borders and markets.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-6 group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Efficient Process</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our streamlined approach reduces the time and complexity typically associated with trademark
                registration, allowing you to focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-br from-gray-900 via-gray-800 to-accent text-white py-16 rounded-2xl shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Secure Your Brand's Future?</h2>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Join the growing number of businesses choosing Just Protected for their trademark needs.
        </p>
        <Link
          href="/free-search"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Get Started Today
          <ArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  )
}
