import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogPostPreview } from "@/components/blog-post-preview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Registration Blog | Expert Insights & Guides",
  description:
    "Explore our blog for expert insights on trademark registration, brand protection strategies, and intellectual property tips for businesses worldwide.",
  alternates: {
    canonical: "https://justprotected.com/blog/",
  },
}

// Function to get all blog posts dynamically
function getBlogPosts() {
  // Define all blog post slugs (directories that exist)
  const allSlugs = [
    "disney-openai-ip-licensing-strategy", // New: Disney's AI IP strategy
    "argentina-trademark-law-changes-2025", // Featured: Latest Argentina law changes
    "register-trademark-singapore",
    "hermes-metabirkins-trademark-battle",
    "cole-palmer-celebration-trademark",
    "five-things-about-trademark-registration",
    "make-trademark-stand-out",
    "meghan-markle-as-ever-trademark-challenges",
    "jiffy-bag-genericized-trademark",
    "registered-trademark-symbol-history",
    "register-trademark-france",
    "importance-of-brand-protection",
    "trademark-registration-process",
    "global-trademark-strategies",
    "trademark-priority-period",
    "maximise-successful-trademark-registration",
    "trademark-classification",
    "trademark-registration-comparison",
    "register-trademark-usa",
    "register-trademark-california",
    "register-trademark-eu",
    "register-trademark-china",
    "register-trademark-india",
    "register-trademark-united-kingdom",
    "register-trademark-germany",
    "register-trademark-spain",
    "register-trademark-new-zealand",
    "register-trademark-mexico",
    "register-trademark-brazil",
    "register-trademark-argentina",
    "register-trademark-poland",
    "register-trademark-czech-republic",
  ]

  // Generate consistent publishing dates (Tuesdays and Thursdays)
  const generateConsistentDates = () => {
    const dates = []
    const today = new Date()
    const currentDate = new Date(today)

    if (currentDate.getDay() !== 2 && currentDate.getDay() !== 4) {
      while (currentDate.getDay() !== 2 && currentDate.getDay() !== 4) {
        currentDate.setDate(currentDate.getDate() - 1)
      }
    }

    for (let i = 0; i < 100; i++) {
      dates.push(new Date(currentDate))
      if (currentDate.getDay() === 2) {
        currentDate.setDate(currentDate.getDate() - 5)
      } else {
        currentDate.setDate(currentDate.getDate() - 2)
      }
    }

    return dates
  }

  const publishDates = generateConsistentDates()

  // Group articles by category for strategic dating
  const categories = {
    featured: [
      "disney-openai-ip-licensing-strategy", // New: Disney's AI IP strategy
      "argentina-trademark-law-changes-2025", // Featured: Latest Argentina law changes
      "register-trademark-singapore",
      "hermes-metabirkins-trademark-battle",
      "cole-palmer-celebration-trademark",
      "five-things-about-trademark-registration",
      "make-trademark-stand-out",
      "meghan-markle-as-ever-trademark-challenges",
      "jiffy-bag-genericized-trademark",
      "registered-trademark-symbol-history",
      "register-trademark-france",
    ],
    fundamentals: [
      "importance-of-brand-protection",
      "trademark-registration-process",
      "global-trademark-strategies",
      "trademark-priority-period",
      "maximise-successful-trademark-registration",
      "trademark-classification",
      "trademark-registration-comparison",
    ],
    majorMarkets: [
      "register-trademark-usa",
      "register-trademark-california",
      "register-trademark-eu",
      "register-trademark-china",
      "register-trademark-india",
      "register-trademark-united-kingdom",
      "register-trademark-germany",
      "register-trademark-france",
    ],
    otherMarkets: [
      "register-trademark-spain",
      "register-trademark-new-zealand",
      "register-trademark-mexico",
      "register-trademark-brazil",
      "register-trademark-argentina",
      "register-trademark-poland",
      "register-trademark-czech-republic",
    ],
  }

  // Assign dates strategically
  let dateIndex = 0
  const dateMap: Record<string, Date> = {}

  categories.featured.forEach((slug) => {
    dateMap[slug] = publishDates[dateIndex++]
  })

  categories.fundamentals.forEach((slug) => {
    dateMap[slug] = publishDates[dateIndex++]
  })

  categories.majorMarkets.forEach((slug) => {
    dateMap[slug] = publishDates[dateIndex++]
  })

  categories.otherMarkets.forEach((slug) => {
    dateMap[slug] = publishDates[dateIndex++]
  })

  dateMap["argentina-trademark-law-changes-2025"] = new Date() // Set the Argentina article date to today to ensure it appears first
  dateMap["disney-openai-ip-licensing-strategy"] = new Date() // Set Disney article date to today to feature it

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Country-specific images
  const countryImages: Record<string, string> = {
    "register-trademark-singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    "register-trademark-usa": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=600&h=400&fit=crop",
    "register-trademark-eu": "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&h=400&fit=crop",
    "register-trademark-china": "https://images.unsplash.com/photo-1547981609437-e706e86654de?w=600&h=400&fit=crop",
    "register-trademark-india": "https://images.unsplash.com/photo-1524492412937-e706e86654de?w=600&h=400&fit=crop",
    "register-trademark-united-kingdom":
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    "register-trademark-germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
    "register-trademark-spain": "https://images.unsplash.com/photo-1543783207637-e706e86654de?w=600&h=400&fit=crop",
    "register-trademark-new-zealand":
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop",
    "register-trademark-mexico": "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&h=400&fit=crop",
    "register-trademark-brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop",
    "register-trademark-argentina": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop",
    "register-trademark-poland": "https://images.unsplash.com/photo-1562109245885-df96941cfa24?w=600&h=400&fit=crop",
    "register-trademark-czech-republic":
      "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=600&h=400&fit=crop",
    "register-trademark-california":
      "https://images.unsplash.com/photo-1580655653885-df96941cfa24?w=600&h=400&fit=crop",
  }

  // Topic-specific images
  const topicImages: Record<string, string> = {
    "hermes-metabirkins-trademark-battle":
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&h=400&fit=crop",
    "cole-palmer-celebration-trademark":
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    "five-things-about-trademark-registration":
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    "trademark-priority-period": "https://images.unsplash.com/photo-1526304640581-d10d557cf95e?w=600&h=400&fit=crop",
    "make-trademark-stand-out": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    "maximise-successful-trademark-registration":
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    "importance-of-brand-protection":
      "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=600&h=400&fit=crop",
    "trademark-registration-process": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    "global-trademark-strategies": "https://images.unsplash.com/photo-1529119368496-359c35dd8327?w=600&h=400&fit=crop",
    "trademark-classification": "https://images.unsplash.com/photo-1568234928966-3f8f99389edd?w=600&h=400&fit=crop",
    "trademark-registration-comparison":
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    "disney-openai-ip-licensing-strategy":
      "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&h=400&fit=crop",
  }

  // Blog post metadata
  const blogPostsData: Record<string, { title: string; description: string; image: string }> = {
    "disney-openai-ip-licensing-strategy": {
      title: "Disney's OpenAI Partnership: The Future of IP Licensing in the AI Era",
      description:
        "Disney's $1B strategic arrangement with OpenAI marks a shift from reactive copyright enforcement to proactive AI licensing. Learn what this means for trademark and IP strategy.",
      image: topicImages["disney-openai-ip-licensing-strategy"],
    },
    "register-trademark-singapore": {
      title: "Why Trademark Registration Matters in Singapore — And Why Waiting Is the Most Expensive Mistake",
      description:
        "Singapore's business environment is highly competitive. Learn why trademark registration is crucial for startups, SMEs, and e-commerce businesses in this global hub.",
      image: countryImages["register-trademark-singapore"],
    },
    "hermes-metabirkins-trademark-battle": {
      title: "Virtual Handbags, Real Lawsuits: The Hermès MetaBirkins Trademark Battle",
      description:
        "Explore how the landmark Hermès vs. MetaBirkins case reshaped trademark law for the digital age, setting crucial precedents for brand protection in NFTs and the metaverse.",
      image: topicImages["hermes-metabirkins-trademark-battle"],
    },
    "cole-palmer-celebration-trademark": {
      title: "Cole Palmer's Iconic Celebration: The Path to Trademarking It",
      description:
        "Explore how football star Cole Palmer could trademark his iconic goal celebration and the benefits of protecting personal brands in sports.",
      image: topicImages["cole-palmer-celebration-trademark"],
    },
    "five-things-about-trademark-registration": {
      title: "5 Things You Didn't Know About Trademark Registration",
      description:
        "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
      image: topicImages["five-things-about-trademark-registration"],
    },
    "make-trademark-stand-out": {
      title: "How to Make Your Trademark Stand Out",
      description:
        "Discover practical tips to create a distinctive, memorable trademark that stands out in the marketplace and provides stronger legal protection for your brand.",
      image: topicImages["make-trademark-stand-out"],
    },
    "meghan-markle-as-ever-trademark-challenges": {
      title: "Meghan Markle's 'As Ever' Trademark Challenges",
      description:
        "Explore the trademark challenges faced by Meghan Markle for her lifestyle brand 'As Ever' and the lessons businesses can learn about trademark protection.",
      image: "/images/meghan-markle-as-ever-trademark.png",
    },
    "jiffy-bag-genericized-trademark": {
      title: "Jiffy Bag: How a Trademark Became Generic",
      description:
        "Explore how the Jiffy bag trademark became genericized and the lessons businesses can learn about protecting their trademarks from suffering the same fate.",
      image: "/images/jiffy-bags.png",
    },
    "registered-trademark-symbol-history": {
      title: "The History and Evolution of the Registered Trademark Symbol",
      description:
        "Discover the fascinating history behind the registered trademark symbol (®), its legal significance, and how its usage has evolved over time.",
      image: "/images/A_2D_digital_graphic_design_image_features_the_his.png",
    },
    "register-trademark-france": {
      title: "French Trademark Registration: Protecting Your Brand in the Heart of Europe",
      description:
        "Learn how to register your trademark in France with our comprehensive guide. Understand the INPI process, costs, and essential steps to protect your brand in this key European market.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    },
    "argentina-trademark-law-changes-2025": {
      title: "Argentina's Trademark Law Changes 2025: What You Need to Know",
      description:
        "Major reforms to Argentina's trademark system starting 2025. Learn how Resolution INPI P-583/25 changes registration, oppositions, and brand protection.",
      image: "/argentina-buenos-aires-business-law.jpg",
    },
    "register-trademark-usa": {
      title: "Securing Your Brand in America: US Trademark Guide (2024)",
      description:
        "Comprehensive guide to US trademark registration. Learn the step-by-step process, costs, timelines, and requirements to protect your brand in the United States.",
      image: countryImages["register-trademark-usa"],
    },
    "register-trademark-california": {
      title: "How to Register a Trademark in California (2024) | Complete Guide",
      description:
        "Complete guide to California trademark registration. Learn about state vs federal registration, costs, and the process.",
      image: countryImages["register-trademark-california"],
    },
    "register-trademark-eu": {
      title: "Protecting Brands Across Europe: EU Trademark Essentials",
      description:
        "Complete guide to EU trademark registration through the EUIPO. Learn about the process, costs, and protection across all 27 member states.",
      image: countryImages["register-trademark-eu"],
    },
    "register-trademark-china": {
      title: "Navigating China's Trademark System: A Western Brand's Guide",
      description:
        "Complete guide to registering your trademark in China. Learn about the CNIPA process, costs, and timeline for protecting your brand.",
      image: countryImages["register-trademark-china"],
    },
    "register-trademark-india": {
      title: "Brand Protection in India's Booming Market: Trademark Strategies",
      description:
        "Comprehensive guide to trademark registration in India. Learn about the IPO process, costs, and timeline for protecting your brand.",
      image: countryImages["register-trademark-india"],
    },
    "register-trademark-united-kingdom": {
      title: "Post-Brexit Trademark Registration: UK Brand Protection",
      description:
        "Complete guide to trademark registration in the UK. Learn about the IPO process, costs, and timeline post-Brexit.",
      image: countryImages["register-trademark-united-kingdom"],
    },
    "register-trademark-germany": {
      title: "German Trademark Law: Protecting Your Brand in Europe's Largest Economy",
      description:
        "Comprehensive guide to trademark registration in Germany. Learn about the DPMA process, costs, and timeline.",
      image: countryImages["register-trademark-germany"],
    },
    "register-trademark-spain": {
      title: "Trademark Registration in Spain: Mediterranean Market Entry Guide",
      description:
        "Complete guide to registering your trademark in Spain. Learn about the Spanish Patent and Trademark Office process, costs, and timeline.",
      image: countryImages["register-trademark-spain"],
    },
    "register-trademark-new-zealand": {
      title: "Protecting Brands in New Zealand: Trademark Insights for Foreign Companies",
      description:
        "Comprehensive guide to trademark registration in New Zealand. Learn about the IPONZ process, costs, and protection for your brand.",
      image: countryImages["register-trademark-new-zealand"],
    },
    "register-trademark-mexico": {
      title: "Mexican Trademark Strategy: Safeguarding Your Brand in Latin America",
      description:
        "Complete guide to trademark registration in Mexico. Learn about the IMPI process, costs, and timeline for protecting your brand.",
      image: countryImages["register-trademark-mexico"],
    },
    "register-trademark-brazil": {
      title: "Brazilian Trademark Essentials: Navigating South America's Largest Market",
      description:
        "Comprehensive guide to trademark registration in Brazil. Learn about the INPI process, costs, and timeline for protecting your brand.",
      image: countryImages["register-trademark-brazil"],
    },
    "register-trademark-argentina": {
      title: "Trademark Protection in Argentina: A Strategic Approach",
      description:
        "Comprehensive guide to trademark registration in Argentina. Learn about the INPI process, costs, and timeline for protecting your brand.",
      image: countryImages["register-trademark-argentina"],
    },
    "register-trademark-poland": {
      title: "Securing Trademarks in Poland: Eastern European Market Guide",
      description:
        "Comprehensive guide to trademark registration in Poland. Learn about the Polish Patent Office process, costs, and timeline.",
      image: countryImages["register-trademark-poland"],
    },
    "register-trademark-czech-republic": {
      title: "Czech Republic Trademark System: Central European Brand Protection",
      description:
        "Comprehensive guide to trademark registration in the Czech Republic. Learn about the IPO CZ process, costs, and timeline.",
      image: countryImages["register-trademark-czech-republic"],
    },
    "trademark-classification": {
      title: "Understanding Trademark Classification",
      description:
        "Learn about the Nice Classification system and how to choose the right trademark classes for your business.",
      image: topicImages["trademark-classification"],
    },
    "trademark-registration-comparison": {
      title: "Trademark Registration Comparison",
      description:
        "Compare trademark registration processes, costs, and timelines across different jurisdictions to make informed decisions.",
      image: topicImages["trademark-registration-comparison"],
    },
  }

  // Create blog post objects
  const blogPosts = allSlugs.map((slug) => {
    const metadata = blogPostsData[slug]
    const date = dateMap[slug]

    return {
      slug,
      title:
        metadata?.title ||
        slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      description: metadata?.description || "Learn about trademark registration and brand protection strategies.",
      image: metadata?.image || "/placeholder.svg?height=400&width=600",
      date: formatDate(date),
      dateObj: date,
    }
  })

  // Sort by date (newest first)
  return blogPosts.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Trademark Registration Blog</h1>
            <p className="text-xl text-gray-700">
              Expert insights, guides, and strategies for protecting your brand worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => (
              <BlogPostPreview
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                image={post.image}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
