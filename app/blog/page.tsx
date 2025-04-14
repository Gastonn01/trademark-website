import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BlogPostPreview } from "@/components/blog-post-preview"
import fs from "fs"
import path from "path"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Registration Blog | Expert Insights & Guides",
  description:
    "Explore our blog for expert insights on trademark registration, brand protection strategies, and intellectual property tips for businesses worldwide.",
}

export const metadata2 = {
  title: "Trademark Registration Blog | Expert Insights & Guides",
  description:
    "Explore our blog for expert insights on trademark registration, brand protection strategies, and intellectual property tips for businesses worldwide.",
  alternates: {
    canonical: "https://justprotected.com/blog/",
  },
}

// Function to get all blog posts dynamically
function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "app/blog")
  const directories = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dir) => dir !== "assets" && !dir.startsWith(".")) // Exclude non-blog directories

  // Define duplicate/related content groups and their preferred version
  const duplicateGroups = {
    // EU trademark articles - keep the main English version
    "register-trademark-eu": ["register-trademark-european-union"],

    // Country duplicates - keep the "register-trademark-X" version and remove "trademark-registration-X"
    "register-trademark-china": ["trademark-registration-china"],
    "register-trademark-india": ["trademark-registration-india"],
    "register-trademark-germany": ["trademark-registration-germany"],
    "register-trademark-united-kingdom": ["trademark-registration-united-kingdom"],
  }

  // Spanish versions to exclude
  const spanishVersions = ["registrar-marca-estados-unidos", "registrar-marca-union-europea"]

  // Flatten the duplicate groups to get a list of all duplicates
  const duplicates = Object.values(duplicateGroups).flat().concat(spanishVersions)

  // Filter out duplicates and Spanish versions from the directories list
  const uniqueSlugs = directories.filter((slug) => !duplicates.includes(slug))

  // Create a consistent publishing schedule (every Tuesday and Thursday)
  // Starting from recent date and working backwards
  const generateConsistentDates = () => {
    const dates = []
    const today = new Date() // March 25, 2025

    // Start from today and work backwards
    // We'll generate dates for Tuesdays and Thursdays in the past
    const currentDate = new Date(today)

    // If today is a publishing day (Tuesday or Thursday), include it
    // Otherwise, move to the most recent past publishing day
    if (currentDate.getDay() !== 2 && currentDate.getDay() !== 4) {
      // Move to the most recent past Tuesday or Thursday
      while (currentDate.getDay() !== 2 && currentDate.getDay() !== 4) {
        currentDate.setDate(currentDate.getDate() - 1)
      }
    }

    // Generate dates going back in time (Tuesday and Thursday each week)
    for (let i = 0; i < 100; i++) {
      // Generate plenty of dates
      dates.push(new Date(currentDate))

      // Move to previous publishing day
      if (currentDate.getDay() === 2) {
        // Tuesday
        currentDate.setDate(currentDate.getDate() - 5) // Move to previous Thursday
      } else {
        // Thursday
        currentDate.setDate(currentDate.getDate() - 2) // Move to previous Tuesday
      }
    }

    return dates // Already in reverse chronological order (newest to oldest)
  }

  const publishDates = generateConsistentDates()

  // More diverse and engaging titles for country articles
  const countryTitles = {
    "register-trademark-usa": "Securing Your Brand in America: US Trademark Guide (2024)",
    "register-trademark-eu": "Protecting Brands Across Europe: EU Trademark Essentials",
    "register-trademark-china": "Navigating China's Trademark System: A Western Brand's Guide",
    "register-trademark-india": "Brand Protection in India's Booming Market: Trademark Strategies",
    "register-trademark-united-kingdom": "Post-Brexit Trademark Registration: UK Brand Protection",
    "register-trademark-germany": "German Trademark Law: Protecting Your Brand in Europe's Largest Economy",
    "register-trademark-spain": "Trademark Registration in Spain: Mediterranean Market Entry Guide",
    "register-trademark-new-zealand": "Protecting Brands in New Zealand: Trademark Insights for Foreign Companies",
    "register-trademark-mexico": "Mexican Trademark Strategy: Safeguarding Your Brand in Latin America",
    "register-trademark-brazil": "Brazilian Trademark Essentials: Navigating South America's Largest Market",
    "register-trademark-argentina": "Trademark Protection in Argentina: A Strategic Approach",
    "register-trademark-poland": "Securing Trademarks in Poland: Eastern European Market Guide",
    "register-trademark-czech-republic": "Czech Republic Trademark System: Central European Brand Protection",
    "register-trademark-california": "How to Register a Trademark in California (2025) | Complete Guide",
    "register-trademark-france": "French Trademark Registration: Protecting Your Brand in the Heart of Europe",
  }

  // Group articles by category for strategic dating
  const categories = {
    featured: [
      "hermes-metabirkins-trademark-battle", // Most recent - NFT/digital is cutting edge
      "cole-palmer-celebration-trademark", // Sports/celebrity content is timely
      "five-things-about-trademark-registration", // Listicle - good for recent content
      "make-trademark-stand-out", // Practical advice - good for recent content
      "meghan-markle-as-ever-trademark-challenges", // Add this line
      "jiffy-bag-genericized-trademark", // Add this line
      "registered-trademark-symbol-history", // Add this line
      "register-trademark-france", // Add this line
    ],
    fundamentals: [
      "importance-of-brand-protection", // Foundational content
      "trademark-registration-process", // Core process explanation
      "global-trademark-strategies", // Strategic overview
      "trademark-priority-period", // Important concept
      "maximise-successful-trademark-registration", // General advice
      "trademark-classification", // Technical knowledge
      "trademark-registration-comparison", // Comparison content
    ],
    majorMarkets: [
      "register-trademark-usa", // US (English only)
      "register-trademark-california", // California
      "register-trademark-eu", // EU (English only)
      "register-trademark-china", // China
      "register-trademark-india", // India
      "register-trademark-united-kingdom", // UK
      "register-trademark-germany", // Germany
      "register-trademark-france", // France
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

  // Assign dates strategically by category
  let dateIndex = 0
  const dateMap = {}

  // Featured content gets the most recent dates
  categories.featured.forEach((slug) => {
    const date = publishDates[dateIndex]
    dateMap[slug] = date
    dateIndex++
  })

  // Fundamentals get slightly older dates but still recent
  categories.fundamentals.forEach((slug) => {
    const date = publishDates[dateIndex]
    dateMap[slug] = date
    dateIndex++
  })

  // Major markets get the next batch of dates
  categories.majorMarkets.forEach((slug) => {
    const date = publishDates[dateIndex]
    dateMap[slug] = date
    dateIndex++
  })

  // Other markets get the oldest dates
  categories.otherMarkets.forEach((slug) => {
    const date = publishDates[dateIndex]
    dateMap[slug] = date
    dateIndex++
  })

  // Format date as "Month Day, Year"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Country-specific images that match the content
  const countryImages = {
    "register-trademark-usa": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=600&h=400&fit=crop", // US flag or landmark
    "register-trademark-eu": "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&h=400&fit=crop", // EU flag or Brussels
    "register-trademark-china": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&h=400&fit=crop", // Great Wall or Shanghai skyline
    "register-trademark-india": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop", // Taj Mahal or business district
    "register-trademark-united-kingdom":
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", // London or UK flag
    "register-trademark-germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop", // Berlin or German landmark
    "register-trademark-spain": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&h=400&fit=crop", // Spanish architecture
    "register-trademark-new-zealand":
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400&fit=crop", // NZ landscape
    "register-trademark-mexico": "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&h=400&fit=crop", // Mexican landmark
    "register-trademark-brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop", // Rio or Brazilian scene
    "register-trademark-argentina": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop", // Buenos Aires or Argentine landmark
    "register-trademark-poland": "https://images.unsplash.com/photo-1562109245-c9f084749538?w=600&h=400&fit=crop", // Warsaw or Polish scene
    "register-trademark-czech-republic":
      "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=600&h=400&fit=crop", // Prague or Czech landmark
    "register-trademark-california":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8777996los-angeles-hollywood-sign.jpg-rLwjzZLJASUIniBUJeIU7NFLJiQuYO.jpeg", // Hollywood Sign
  }

  // Topic-specific images for non-country articles
  const topicImages = {
    "hermes-metabirkins-trademark-battle":
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&h=400&fit=crop", // Luxury goods/digital art
    "cole-palmer-celebration-trademark":
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop", // Football/sports
    "five-things-about-trademark-registration":
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", // Business/documents
    "trademark-priority-period": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop", // Calendar/time concept
    "make-trademark-stand-out": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop", // Creative branding
    "maximise-successful-trademark-registration":
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop", // Success/achievement
    "importance-of-brand-protection":
      "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=600&h=400&fit=crop", // Shield/protection concept
    "trademark-registration-process": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop", // Process/steps
    "global-trademark-strategies":
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5de467a0b0a5ed5119a8eca3_65958bb3-07cb-4477-9d3365398a681c0a.jpg-yROVP2qd3234VhKJM93EW75IGSYbRA.jpeg", // Global brand logos
    "trademark-classification": "https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=600&h=400&fit=crop", // Organization/classification
    "trademark-registration-comparison":
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", // Comparison/analysis
  }

  // Blog post metadata
  const blogPostsData = {
    // Existing blog posts
    "hermes-metabirkins-trademark-battle": {
      title: "Virtual Handbags, Real Lawsuits: The Hermès MetaBirkins Trademark Battle",
      description:
        "Explore how the landmark Hermès vs. MetaBirkins case reshaped trademark law for the digital age, setting crucial precedents for brand protection in NFTs and the metaverse.",
      image: topicImages["hermes-metabirkins-trademark-battle"],
    },
    "meghan-markle-as-ever-trademark-challenges": {
      title: "Meghan Markle's 'As Ever' Trademark Challenges",
      description:
        "Explore the trademark challenges faced by Meghan Markle for her lifestyle brand 'As Ever' and the lessons businesses can learn about trademark protection.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20at%2010.46.10-WcVoyDMfkeWudzpXWjFbS3IN0btvA9.png",
    },
    "jiffy-bag-genericized-trademark": {
      title: "Jiffy Bag: How a Trademark Became Generic",
      description:
        "Explore how the Jiffy bag trademark became genericized and the lessons businesses can learn about protecting their trademarks from suffering the same fate.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20at%2010.38.01-SdyzlyLbKphtJeXRyUf0QhseC9xpuZ.png",
    },
    "registered-trademark-symbol-history": {
      title: "The History and Evolution of the Registered Trademark Symbol",
      description:
        "Discover the fascinating history behind the registered trademark symbol (®), its legal significance, and how its usage has evolved over time.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20at%2010.49.28-bfsG72VsP3CnndjNBK31ozzGhhFsCF.png",
    },
    "register-trademark-france": {
      title: "French Trademark Registration: Protecting Your Brand in the Heart of Europe",
      description:
        "Learn how to register your trademark in France with our comprehensive guide. Understand the INPI process, costs, and essential steps to protect your brand in this key European market.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-14%20at%2010.50.30-Fv0tNjrsFIFFm2pSKpej9W1d46TyIP.png",
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
    "trademark-priority-period": {
      title: "Understanding the Trademark Priority Period",
      description:
        "Learn how the 6-month trademark priority period can help you protect your brand across multiple countries while maintaining your original filing date.",
      image: topicImages["trademark-priority-period"],
    },
    "make-trademark-stand-out": {
      title: "How to Make Your Trademark Stand Out",
      description:
        "Discover practical tips to create a distinctive, memorable trademark that stands out in the marketplace and provides stronger legal protection for your brand.",
      image: topicImages["make-trademark-stand-out"],
    },
    "maximise-successful-trademark-registration": {
      title: "How to Maximise the Chances of a Successful Trademark Registration",
      description:
        "Learn expert strategies to increase your chances of successful trademark registration. Avoid common pitfalls and protect your brand effectively.",
      image: topicImages["maximise-successful-trademark-registration"],
    },
    "importance-of-brand-protection": {
      title: "The Importance of Brand Protection",
      description:
        "Discover why protecting your brand is crucial in today's competitive market and how trademark registration can safeguard your business interests.",
      image: topicImages["importance-of-brand-protection"],
    },
    "trademark-registration-process": {
      title: "Trademark Registration Process",
      description:
        "A step-by-step guide to the trademark registration process, from initial search to final registration and maintenance.",
      image: topicImages["trademark-registration-process"],
    },
    "global-trademark-strategies": {
      title: "Global Trademark Strategies",
      description:
        "Learn how to develop an effective global trademark strategy to protect your brand across international markets.",
      image: topicImages["global-trademark-strategies"],
    },

    // Additional blog posts with improved titles
    "register-trademark-usa": {
      title: "Securing Your Brand in America: US Trademark Guide (2024)",
      description:
        "Comprehensive guide to US trademark registration. Learn the step-by-step process, costs, timelines, and requirements to protect your brand in the United States.",
      image: countryImages["register-trademark-usa"],
    },
    "register-trademark-eu": {
      title: "Protecting Brands Across Europe: EU Trademark Essentials",
      description:
        "Complete guide to EU trademark registration through the EUIPO. Learn about the process, costs, and protection across all 27 member states.",
      image: countryImages["register-trademark-eu"],
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
        "Complete guide to trademark registration in Argentina. Learn about the INPI process, costs, and timeline for protecting your brand.",
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
      title: "Understanding Trademark Classification: A Complete Guide",
      description:
        "Learn about the 45 classes of the Nice Classification system and how to properly classify your goods and services for trademark registration.",
      image: topicImages["trademark-classification"],
    },
    "trademark-registration-comparison": {
      title: "Trademark Registration: Country-by-Country Comparison",
      description:
        "Compare trademark registration processes, costs, and timelines across major jurisdictions to develop your global brand protection strategy.",
      image: topicImages["trademark-registration-comparison"],
    },
    // Adding standardized titles for country articles
    "register-trademark-china": {
      title: "Navigating China's Trademark System: A Western Brand's Guide",
      description:
        "Learn how to register your trademark in China with our comprehensive guide. Understand the first-to-file system, costs, and essential steps to protect your brand.",
      image: countryImages["register-trademark-china"],
    },
    "register-trademark-india": {
      title: "Brand Protection in India's Booming Market: Trademark Strategies",
      description:
        "Expand your business to India with confidence. Our guide covers the trademark registration process, costs, and timeline for protecting your brand in this dynamic market.",
      image: countryImages["register-trademark-india"],
    },
    "register-trademark-germany": {
      title: "German Trademark Law: Protecting Your Brand in Europe's Largest Economy",
      description:
        "Navigate the trademark registration process in Europe's largest economy. Our guide covers everything you need to know about protecting your brand in Germany.",
      image: countryImages["register-trademark-germany"],
    },
    "register-trademark-united-kingdom": {
      title: "Post-Brexit Trademark Registration: UK Brand Protection",
      description:
        "Protect your brand in the UK market with our comprehensive guide to trademark registration. Learn about the process, costs, and timeline for securing your brand identity.",
      image: countryImages["register-trademark-united-kingdom"],
    },
    "register-trademark-california": {
      title: "How to Register a Trademark in California (2025) | Complete Guide",
      description:
        "Learn how to register a trademark in California with our step-by-step guide. Understand the process and benefits of trademark registration for California businesses.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8777996los-angeles-hollywood-sign.jpg-rLwjzZLJASUIniBUJeIU7NFLJiQuYO.jpeg",
    },
  }

  // Default images for different content types
  const defaultImages = {
    trademark: "https://images.unsplash.com/photo-1607703703674-df96941cfa24?w=600&h=400&fit=crop",
    brand: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=600&h=400&fit=crop",
    register: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    general: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=600&h=400&fit=crop",
  }

  // Map the unique slugs to blog post data
  const blogPosts = uniqueSlugs.map((slug) => {
    // Get the date for this slug from our date mapping
    const date = dateMap[slug] ? dateMap[slug] : new Date() // Fallback to today
    const formattedDate = formatDate(date)

    // First check if we have specific data for this slug
    if (blogPostsData[slug]) {
      return {
        ...blogPostsData[slug],
        slug,
        date: formattedDate,
      }
    }

    // If not, create default data
    // Create a title from the slug or use country-specific title
    const title =
      countryTitles[slug] ||
      slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    // Determine the appropriate image
    let image = countryImages[slug] || null

    if (!image) {
      // Assign more specific images based on slug keywords
      if (slug.includes("trademark")) {
        image = defaultImages.trademark
      } else if (slug.includes("brand")) {
        image = defaultImages.brand
      } else if (slug.includes("register")) {
        image = defaultImages.register
      } else {
        image = defaultImages.general
      }
    }

    return {
      title,
      description: `Learn more about ${slug.split("-").join(" ")} in our comprehensive guide.`,
      image,
      slug,
      date: formattedDate,
    }
  })

  // Sort by date (newest first)
  return blogPosts.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      <div className="pt-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-50 rounded-lg py-12 mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-6 text-blue-900">Trademark Registration Blog</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert insights, guides, and tips on trademark registration and brand protection strategies for
                businesses worldwide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostPreview
                key={index}
                title={post.title}
                excerpt={post.description}
                image={post.image}
                slug={post.slug}
                date={post.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
