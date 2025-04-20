import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogPostPreview } from "@/components/blog-post-preview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Just Protected",
  description:
    "Latest articles and insights about trademark registration, brand protection, and intellectual property.",
}

// Comprehensive list of all blog posts based on the file structure
const blogPosts = [
  {
    slug: "register-trademark-usa",
    title: "How to Register a Trademark in the USA: Complete Guide",
    excerpt:
      "Learn the step-by-step process of registering a trademark in the United States, including requirements, costs, and timeline.",
    date: "April 15, 2023",
    image: "/images/blog/usa-trademark.jpg",
  },
  {
    slug: "register-trademark-eu",
    title: "Registering a Trademark in the European Union",
    excerpt:
      "Everything you need to know about protecting your brand across all EU member states with a single trademark registration.",
    date: "March 22, 2023",
    image: "/images/blog/eu-trademark.jpg",
  },
  {
    slug: "register-trademark-european-union",
    title: "Complete Guide to Registering a Trademark in the European Union",
    excerpt:
      "A comprehensive guide to protecting your brand across all EU member states with a single trademark registration.",
    date: "March 20, 2023",
    image: "/images/blog/european-union-trademark.jpg",
  },
  {
    slug: "trademark-registration-china",
    title: "Trademark Registration in China: Essential Guide",
    excerpt:
      "Navigate the complexities of China's trademark system and protect your brand in the world's largest consumer market.",
    date: "February 18, 2023",
    image: "/images/blog/china-trademark.jpg",
  },
  {
    slug: "register-trademark-china",
    title: "How to Register a Trademark in China: Step-by-Step Guide",
    excerpt:
      "A detailed guide to registering your trademark in China, including requirements, process, and common challenges.",
    date: "February 15, 2023",
    image: "/images/blog/china-registration.jpg",
  },
  {
    slug: "trademark-registration-india",
    title: "Trademark Registration in India: Complete Guide",
    excerpt: "Everything you need to know about registering and protecting your trademark in India's growing market.",
    date: "February 10, 2023",
    image: "/images/blog/india-trademark.jpg",
  },
  {
    slug: "register-trademark-india",
    title: "How to Register a Trademark in India: Step-by-Step Process",
    excerpt: "A comprehensive guide to navigating India's trademark registration system and protecting your brand.",
    date: "February 8, 2023",
    image: "/images/blog/india-registration.jpg",
  },
  {
    slug: "trademark-registration-germany",
    title: "Trademark Registration in Germany: Essential Guide",
    excerpt: "Learn how to register and protect your trademark in Europe's largest economy.",
    date: "February 5, 2023",
    image: "/images/blog/germany-trademark.jpg",
  },
  {
    slug: "register-trademark-germany",
    title: "How to Register a Trademark in Germany: Complete Process",
    excerpt: "A detailed guide to registering your trademark in Germany, including requirements, timeline, and costs.",
    date: "February 3, 2023",
    image: "/images/blog/germany-registration.jpg",
  },
  {
    slug: "trademark-registration-united-kingdom",
    title: "Trademark Registration in the United Kingdom: Complete Guide",
    excerpt: "Everything you need to know about protecting your brand in the UK market post-Brexit.",
    date: "January 28, 2023",
    image: "/images/blog/uk-trademark.jpg",
  },
  {
    slug: "register-trademark-united-kingdom",
    title: "How to Register a Trademark in the UK: Step-by-Step Guide",
    excerpt: "A comprehensive guide to registering your trademark in the United Kingdom after Brexit.",
    date: "January 25, 2023",
    image: "/images/blog/uk-registration.jpg",
  },
  {
    slug: "trademark-registration-process",
    title: "Understanding the Trademark Registration Process",
    excerpt:
      "A comprehensive overview of the trademark registration process, from search to registration and maintenance.",
    date: "January 20, 2023",
    image: "/images/blog/trademark-process.jpg",
  },
  {
    slug: "trademark-priority-period",
    title: "Understanding Trademark Priority Period",
    excerpt: "Learn about the trademark priority period and how it can benefit your international trademark strategy.",
    date: "January 15, 2023",
    image: "/images/blog/priority-period.jpg",
  },
  {
    slug: "register-trademark-spain",
    title: "How to Register a Trademark in Spain: Complete Guide",
    excerpt: "A detailed guide to protecting your brand in Spain through trademark registration.",
    date: "January 10, 2023",
    image: "/images/blog/spain-trademark.jpg",
  },
  {
    slug: "register-trademark-france",
    title: "How to Register a Trademark in France: Step-by-Step Guide",
    excerpt: "Everything you need to know about registering and protecting your trademark in France.",
    date: "January 5, 2023",
    image: "/images/blog/france-trademark.jpg",
  },
  {
    slug: "register-trademark-new-zealand",
    title: "How to Register a Trademark in New Zealand",
    excerpt:
      "A comprehensive guide to trademark registration in New Zealand, including process, requirements, and costs.",
    date: "December 28, 2022",
    image: "/images/blog/new-zealand-trademark.jpg",
  },
  {
    slug: "register-trademark-mexico",
    title: "Registering a Trademark in Mexico: Complete Guide",
    excerpt: "Learn how to protect your brand in Mexico through proper trademark registration.",
    date: "December 20, 2022",
    image: "/images/blog/mexico-trademark.jpg",
  },
  {
    slug: "register-trademark-brazil",
    title: "How to Register a Trademark in Brazil: Essential Guide",
    excerpt: "Navigate Brazil's trademark system and protect your brand in South America's largest market.",
    date: "December 15, 2022",
    image: "/images/blog/brazil-trademark.jpg",
  },
  {
    slug: "maximise-successful-trademark-registration",
    title: "How to Maximize Your Chances of Successful Trademark Registration",
    excerpt: "Expert tips to increase your chances of successful trademark registration and avoid common pitfalls.",
    date: "December 12, 2022",
    image: "/images/blog/successful-registration.jpg",
  },
  {
    slug: "register-trademark-argentina",
    title: "Trademark Registration in Argentina: Complete Guide",
    excerpt: "Everything you need to know about protecting your brand in Argentina through trademark registration.",
    date: "December 8, 2022",
    image: "/images/blog/argentina-trademark.jpg",
  },
  {
    slug: "register-trademark-poland",
    title: "How to Register a Trademark in Poland: Step-by-Step Guide",
    excerpt: "A comprehensive guide to navigating Poland's trademark system and protecting your brand.",
    date: "December 5, 2022",
    image: "/images/blog/poland-trademark.jpg",
  },
  {
    slug: "register-trademark-czech-republic",
    title: "Trademark Registration in the Czech Republic",
    excerpt: "Learn how to register and protect your trademark in the Czech Republic's growing market.",
    date: "December 1, 2022",
    image: "/images/blog/czech-trademark.jpg",
  },
  {
    slug: "global-trademark-strategies",
    title: "Global Trademark Strategies for Businesses",
    excerpt: "Develop an effective international trademark strategy to protect your brand across multiple markets.",
    date: "November 28, 2022",
    image: "/images/blog/global-strategy.jpg",
  },
  {
    slug: "make-trademark-stand-out",
    title: "How to Make Your Trademark Stand Out",
    excerpt: "Tips for creating a distinctive and memorable trademark that will stand out in the marketplace.",
    date: "November 10, 2022",
    image: "/images/blog/distinctive-trademark.jpg",
  },
  {
    slug: "cole-palmer-celebration-trademark",
    title: "Cole Palmer's Celebration Trademark",
    excerpt: "Exploring the potential trademark implications of Cole Palmer's distinctive goal celebration.",
    date: "October 25, 2022",
    image: "/images/blog/cole-palmer.jpg",
  },
  {
    slug: "five-things-about-trademark-registration",
    title: "Five Things You Should Know About Trademark Registration",
    excerpt: "Essential information every business owner should understand before registering a trademark.",
    date: "October 8, 2022",
    image: "/images/blog/trademark-essentials.jpg",
  },
  {
    slug: "hermes-metabirkins-trademark-battle",
    title: "Hermès vs. MetaBirkins: The NFT Trademark Battle",
    excerpt: "An analysis of the landmark trademark case between Hermès and MetaBirkins in the NFT space.",
    date: "October 1, 2022",
    image: "/images/blog/hermes-metabirkins.jpg",
  },
  {
    slug: "trademark-classification",
    title: "Understanding Trademark Classification: A Complete Guide",
    excerpt: "Everything you need to know about the international classification system for trademarks.",
    date: "September 25, 2022",
    image: "/images/blog/trademark-classification.jpg",
  },
  {
    slug: "jiffy-bag-genericized-trademark",
    title: "Jiffy Bag: The Story of a Genericized Trademark",
    excerpt: "How Jiffy Bag became a genericized trademark and lessons for brand owners.",
    date: "September 20, 2022",
    image: "/images/blog/jiffy-bag.jpg",
  },
  {
    slug: "uspto-detroit-satellite-office",
    title: "USPTO Detroit Satellite Office: What You Need to Know",
    excerpt: "Information about the USPTO's Detroit satellite office and how it serves trademark applicants.",
    date: "September 5, 2022",
    image: "/images/blog/uspto-detroit.jpg",
  },
  {
    slug: "meghan-markle-as-ever-trademark-challenges",
    title: "Meghan Markle's 'American Riviera Orchard': Trademark Challenges",
    excerpt: "Analyzing the trademark challenges faced by Meghan Markle's new lifestyle brand.",
    date: "August 28, 2022",
    image: "/images/blog/meghan-markle-trademark.jpg",
  },
  {
    slug: "registered-trademark-symbol-history",
    title: "The History of the Registered Trademark Symbol ®",
    excerpt: "Exploring the origins and evolution of the registered trademark symbol and its legal significance.",
    date: "August 20, 2022",
    image: "/images/blog/trademark-symbol.jpg",
  },
  {
    slug: "register-trademark-california",
    title: "How to Register a Trademark in California",
    excerpt: "A comprehensive guide to state trademark registration in California and its benefits.",
    date: "August 15, 2022",
    image: "/images/california-trademark.png",
  },
  {
    slug: "importance-of-brand-protection",
    title: "The Importance of Brand Protection in Today's Digital World",
    excerpt: "Why protecting your brand through trademarks is more critical than ever in the digital age.",
    date: "August 10, 2022",
    image: "/images/blog/brand-protection.jpg",
  },
  {
    slug: "registrar-marca-estados-unidos",
    title: "Cómo Registrar una Marca en Estados Unidos",
    excerpt: "Guía completa para registrar su marca en los Estados Unidos desde el extranjero.",
    date: "August 5, 2022",
    image: "/images/blog/usa-spanish.jpg",
  },
  {
    slug: "registrar-marca-union-europea",
    title: "Cómo Registrar una Marca en la Unión Europea",
    excerpt: "Todo lo que necesita saber sobre el registro de marcas en la Unión Europea.",
    date: "August 1, 2022",
    image: "/images/blog/eu-spanish.jpg",
  },
  {
    slug: "trademark-registration-comparison",
    title: "Trademark Registration: Country-by-Country Comparison",
    excerpt: "A comparative analysis of trademark registration processes across major global markets.",
    date: "July 25, 2022",
    image: "/images/blog/country-comparison.jpg",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">
            Latest insights and guides on trademark registration and intellectual property protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostPreview
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
