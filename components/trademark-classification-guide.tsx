"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const niceClasses = [
  {
    number: 1,
    title: "Chemicals",
    description:
      "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry.",
    examples: ["Unprocessed artificial resins", "Unprocessed plastics", "Manures", "Fire extinguishing compositions"],
  },
  {
    number: 2,
    title: "Paints",
    description:
      "Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants, dyes.",
    examples: ["Raw natural resins", "Metals in foil and powder form for use in painting"],
  },
  {
    number: 3,
    title: "Cosmetics and cleaning preparations",
    description:
      "Non-medicated cosmetics and toiletry preparations; non-medicated dentifrices; perfumery, essential oils.",
    examples: ["Bleaching preparations", "Cleaning, polishing, scouring and abrasive preparations"],
  },
  {
    number: 4,
    title: "Industrial oils and greases",
    description: "Industrial oils and greases, wax; lubricants; dust absorbing, wetting and binding compositions.",
    examples: ["Fuels and illuminants", "Candles and wicks for lighting"],
  },
  {
    number: 5,
    title: "Pharmaceuticals",
    description: "Pharmaceuticals, medical and veterinary preparations; sanitary preparations for medical purposes.",
    examples: ["Dietetic food and substances adapted for medical use", "Food for babies", "Dietary supplements"],
  },
  {
    number: 6,
    title: "Common metals",
    description: "Common metals and their alloys, ores; metal materials for building and construction.",
    examples: [
      "Transportable buildings of metal",
      "Non-electric cables and wires of common metal",
      "Small items of metal hardware",
    ],
  },
  {
    number: 7,
    title: "Machines and machine tools",
    description: "Machines, machine tools, power-operated tools; motors and engines (except for land vehicles).",
    examples: [
      "Machine coupling and transmission components",
      "Agricultural implements, other than hand-operated hand tools",
    ],
  },
  {
    number: 8,
    title: "Hand tools and implements",
    description: "Hand tools and implements, hand-operated; cutlery; side arms, except firearms; razors.",
    examples: ["Hand-operated hand tools", "Cutlery", "Razors"],
  },
  {
    number: 9,
    title: "Electrical and scientific apparatus",
    description:
      "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments.",
    examples: [
      "Apparatus for recording, transmission or reproduction of sound or images",
      "Computers",
      "Computer software",
    ],
  },
  {
    number: 10,
    title: "Medical apparatus",
    description:
      "Surgical, medical, dental and veterinary apparatus and instruments; artificial limbs, eyes and teeth.",
    examples: [
      "Orthopedic articles",
      "Suture materials",
      "Therapeutic and assistive devices adapted for persons with disabilities",
    ],
  },
  {
    number: 11,
    title: "Lighting and heating equipment",
    description:
      "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes.",
    examples: ["Air conditioning apparatus", "Refrigerators", "Fireplaces"],
  },
  {
    number: 12,
    title: "Vehicles",
    description: "Vehicles; apparatus for locomotion by land, air or water.",
    examples: ["Cars", "Bicycles", "Ships", "Airplanes"],
  },
  {
    number: 13,
    title: "Firearms",
    description: "Firearms; ammunition and projectiles; explosives; fireworks.",
    examples: ["Guns", "Rifles", "Fireworks", "Explosive powders"],
  },
  {
    number: 14,
    title: "Precious metals and jewelry",
    description:
      "Precious metals and their alloys; jewellery, precious and semi-precious stones; horological and chronometric instruments.",
    examples: ["Watches", "Jewelry", "Precious stones", "Cufflinks"],
  },
  {
    number: 15,
    title: "Musical instruments",
    description: "Musical instruments; music stands and stands for musical instruments; conductors' batons.",
    examples: ["Pianos", "Guitars", "Drums", "Electronic musical instruments"],
  },
  {
    number: 16,
    title: "Paper and printed matter",
    description:
      "Paper and cardboard; printed matter; bookbinding material; photographs; stationery and office requisites, except furniture.",
    examples: ["Books", "Magazines", "Posters", "Stationery"],
  },
  {
    number: 17,
    title: "Rubber and plastics",
    description:
      "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials.",
    examples: ["Plastic films", "Rubber sheets", "Insulating materials", "Flexible pipes, not of metal"],
  },
  {
    number: 18,
    title: "Leather goods",
    description:
      "Leather and imitations of leather; animal skins and hides; luggage and carrying bags; umbrellas and parasols; walking sticks.",
    examples: ["Handbags", "Wallets", "Suitcases", "Leather straps"],
  },
  {
    number: 19,
    title: "Non-metallic building materials",
    description: "Materials, not of metal, for building and construction; rigid pipes, not of metal, for building.",
    examples: ["Wood", "Stone", "Cement", "Glass for building"],
  },
  {
    number: 20,
    title: "Furniture",
    description: "Furniture, mirrors, picture frames; containers, not of metal, for storage or transport.",
    examples: ["Chairs", "Tables", "Beds", "Shelves"],
  },
  {
    number: 21,
    title: "Household utensils",
    description:
      "Household or kitchen utensils and containers; cookware and tableware, except forks, knives and spoons; combs and sponges.",
    examples: ["Cooking pots", "Plates", "Glasses", "Cleaning instruments"],
  },
  {
    number: 22,
    title: "Ropes and textile materials",
    description: "Ropes and string; nets; tents and tarpaulins; awnings of textile or synthetic materials; sails.",
    examples: ["Ropes", "Nets", "Tents", "Sails"],
  },
  {
    number: 23,
    title: "Yarns and threads",
    description: "Yarns and threads for textile use.",
    examples: ["Cotton thread", "Sewing thread", "Elastic thread", "Woolen thread"],
  },
  {
    number: 24,
    title: "Textiles",
    description: "Textiles and substitutes for textiles; household linen; curtains of textile or plastic.",
    examples: ["Bed linen", "Table cloths", "Curtains", "Towels"],
  },
  {
    number: 25,
    title: "Clothing",
    description: "Clothing, footwear, headwear.",
    examples: ["Shirts", "Shoes", "Hats", "Dresses"],
  },
  {
    number: 26,
    title: "Lace and embroidery",
    description:
      "Lace, braid and embroidery, and haberdashery ribbons and bows; buttons, hooks and eyes, pins and needles.",
    examples: ["Lace trimmings", "Embroidery", "Buttons", "Zippers"],
  },
  {
    number: 27,
    title: "Carpets and floor coverings",
    description:
      "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings, not of textile.",
    examples: ["Carpets", "Rugs", "Floor mats", "Wallpaper"],
  },
  {
    number: 28,
    title: "Games and sporting articles",
    description: "Games, toys and playthings; video game apparatus; gymnastic and sporting articles.",
    examples: ["Board games", "Dolls", "Sports balls", "Fishing tackle"],
  },
  {
    number: 29,
    title: "Meat, fish, poultry",
    description:
      "Meat, fish, poultry and game; meat extracts; preserved, frozen, dried and cooked fruits and vegetables.",
    examples: ["Canned meat", "Frozen fish", "Dried fruit", "Jams"],
  },
  {
    number: 30,
    title: "Coffee, tea, cocoa",
    description:
      "Coffee, tea, cocoa and artificial coffee; rice, pasta and noodles; tapioca and sago; flour and preparations made from cereals.",
    examples: ["Coffee", "Tea", "Bread", "Pastries"],
  },
  {
    number: 31,
    title: "Agricultural products",
    description:
      "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products; raw and unprocessed grains and seeds.",
    examples: ["Fresh fruits", "Fresh vegetables", "Seeds", "Natural plants"],
  },
  {
    number: 32,
    title: "Beers and beverages",
    description: "Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages and fruit juices.",
    examples: ["Beer", "Soft drinks", "Fruit juices", "Mineral water"],
  },
  {
    number: 33,
    title: "Alcoholic beverages",
    description: "Alcoholic beverages, except beers; alcoholic preparations for making beverages.",
    examples: ["Wine", "Spirits", "Liqueurs", "Alcoholic cocktails"],
  },
  {
    number: 34,
    title: "Tobacco",
    description:
      "Tobacco and tobacco substitutes; cigarettes and cigars; electronic cigarettes and oral vaporizers for smokers.",
    examples: ["Cigarettes", "Cigars", "Tobacco", "Lighters for smokers"],
  },
  {
    number: 35,
    title: "Advertising and business management",
    description: "Advertising; business management, organization and administration; office functions.",
    examples: ["Marketing services", "Business consultancy", "Office management", "Retail services"],
  },
  {
    number: 36,
    title: "Financial services",
    description: "Financial, monetary and banking services; insurance services; real estate affairs.",
    examples: ["Banking", "Insurance", "Real estate management", "Financial analysis"],
  },
  {
    number: 37,
    title: "Building construction",
    description: "Construction services; installation and repair services; mining extraction, oil and gas drilling.",
    examples: ["Building construction", "Repair of electronics", "Installation of machinery", "Vehicle maintenance"],
  },
  {
    number: 38,
    title: "Telecommunications",
    description: "Telecommunications services.",
    examples: ["Telephone services", "Email services", "Television broadcasting", "Internet service provider services"],
  },
  {
    number: 39,
    title: "Transport",
    description: "Transport; packaging and storage of goods; travel arrangement.",
    examples: ["Air transport", "Delivery of goods", "Travel reservation", "Storage of goods"],
  },
  {
    number: 40,
    title: "Material treatment",
    description: "Treatment of materials; recycling of waste and trash; air purification and treatment of water.",
    examples: ["Metal treating", "Textile treating", "Waste recycling", "Water treating"],
  },
  {
    number: 41,
    title: "Education and entertainment",
    description: "Education; providing of training; entertainment; sporting and cultural activities.",
    examples: ["Teaching", "Organizing sports competitions", "Film production", "Publishing books"],
  },
  {
    number: 42,
    title: "Scientific and technological services",
    description:
      "Scientific and technological services and research and design relating thereto; industrial analysis, industrial research and industrial design services; quality control and authentication services; design and development of computer hardware and software.",
    examples: ["Scientific research", "Software development", "Industrial design", "Cloud computing"],
  },
  {
    number: 43,
    title: "Services for providing food and drink",
    description: "Services for providing food and drink; temporary accommodation.",
    examples: ["Restaurant services", "Catering", "Hotel services", "Bar services"],
  },
  {
    number: 44,
    title: "Medical services",
    description:
      "Medical services; veterinary services; hygienic and beauty care for human beings or animals; agriculture, aquaculture, horticulture and forestry services.",
    examples: ["Medical clinic services", "Veterinary assistance", "Beauty salon services", "Gardening"],
  },
  {
    number: 45,
    title: "Legal and security services",
    description:
      "Legal services; security services for the physical protection of tangible property and individuals; personal and social services rendered by others to meet the needs of individuals.",
    examples: ["Legal advice", "Security guard services", "Dating services", "Funeral services"],
  },
]

export function TrademarkClassificationGuide() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClasses = niceClasses.filter(
    (niceClass) =>
      niceClass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      niceClass.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      niceClass.examples.some((example) => example.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Complete Guide to Trademark Classification</h1>
      <p className="text-xl text-center mb-12 text-gray-600">
        Understand the Nice Classification system to successfully register your trademark
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">What is the Nice Classification System?</h2>
        <p className="mb-4">
          The Nice Classification System is an international classification of goods and services applied to the
          registration of trademarks. Established by the Nice Agreement in 1957, this system is used in over 150
          countries to categorize goods and services for trademark registration purposes.
        </p>
        <p className="mb-4">
          The system consists of 45 classes: classes 1-34 are for goods, and classes 35-45 are for services. Each class
          has a heading that broadly indicates the goods or services included, but it's important to review the
          explanatory notes and alphabetical list for precise classification.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Why is Correct Classification Important?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Determines the scope of your trademark protection</li>
          <li>Affects registration costs (fees are typically charged per class)</li>
          <li>Can influence the search for prior marks and potential oppositions</li>
          <li>Crucial for international trademark protection strategy</li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Search Nice Classes</h2>
        <Input
          type="text"
          placeholder="Search by product, service, or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />

        <Accordion type="single" collapsible className="w-full">
          {filteredClasses.map((niceClass) => (
            <AccordionItem key={niceClass.number} value={`item-${niceClass.number}`}>
              <AccordionTrigger className="text-lg">
                Class {niceClass.number}: {niceClass.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">{niceClass.description}</p>
                <h4 className="font-semibold mt-4 mb-2">Examples:</h4>
                <ul className="list-disc pl-6">
                  {niceClass.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Tips for Effective Classification</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Make a detailed list of all your goods or services</li>
          <li>Use specific terms and avoid overly broad descriptions</li>
          <li>Consider potential future expansions of your business</li>
          <li>Consult the latest version of the Nice Classification, as it's updated periodically</li>
          <li>When in doubt, consider seeking professional advice</li>
        </ul>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Ready to protect your trademark?</CardTitle>
          <CardDescription>
            Start with our free trademark check to ensure your brand is available for registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/free-search">Start Free Check</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

