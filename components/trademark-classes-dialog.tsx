"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info } from "lucide-react"

const trademarkClasses = [
  {
    class: 1,
    description:
      "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry",
  },
  {
    class: 2,
    description:
      "Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants, dyes",
  },
  {
    class: 3,
    description:
      "Non-medicated cosmetics and toiletry preparations; non-medicated dentifrices; perfumery, essential oils",
  },
  {
    class: 4,
    description: "Industrial oils and greases, wax; lubricants; dust absorbing, wetting and binding compositions",
  },
  {
    class: 5,
    description: "Pharmaceuticals, medical and veterinary preparations; sanitary preparations for medical purposes",
  },
  { class: 6, description: "Common metals and their alloys, ores; metal materials for building and construction" },
  {
    class: 7,
    description: "Machines, machine tools, power-operated tools; motors and engines (except for land vehicles)",
  },
  { class: 8, description: "Hand tools and implements, hand-operated; cutlery; side arms, except firearms; razors" },
  {
    class: 9,
    description:
      "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments",
  },
  {
    class: 10,
    description: "Surgical, medical, dental and veterinary apparatus and instruments; artificial limbs, eyes and teeth",
  },
  {
    class: 11,
    description:
      "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes",
  },
  { class: 12, description: "Vehicles; apparatus for locomotion by land, air or water" },
  { class: 13, description: "Firearms; ammunition and projectiles; explosives; fireworks" },
  {
    class: 14,
    description:
      "Precious metals and their alloys; jewellery, precious and semi-precious stones; horological and chronometric instruments",
  },
  {
    class: 15,
    description: "Musical instruments; music stands and stands for musical instruments; conductors' batons",
  },
  {
    class: 16,
    description:
      "Paper and cardboard; printed matter; bookbinding material; photographs; stationery and office requisites, except furniture",
  },
  {
    class: 17,
    description:
      "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials",
  },
  {
    class: 18,
    description:
      "Leather and imitations of leather; animal skins and hides; luggage and carrying bags; umbrellas and parasols; walking sticks",
  },
  {
    class: 19,
    description: "Materials, not of metal, for building and construction; rigid pipes, not of metal, for building",
  },
  { class: 20, description: "Furniture, mirrors, picture frames; containers, not of metal, for storage or transport" },
  {
    class: 21,
    description:
      "Household or kitchen utensils and containers; cookware and tableware, except forks, knives and spoons; combs and sponges",
  },
  {
    class: 22,
    description: "Ropes and string; nets; tents and tarpaulins; awnings of textile or synthetic materials; sails",
  },
  { class: 23, description: "Yarns and threads for textile use" },
  { class: 24, description: "Textiles and substitutes for textiles; household linen; curtains of textile or plastic" },
  { class: 25, description: "Clothing, footwear, headwear" },
  {
    class: 26,
    description:
      "Lace, braid and embroidery, and haberdashery ribbons and bows; buttons, hooks and eyes, pins and needles",
  },
  {
    class: 27,
    description:
      "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings, not of textile",
  },
  { class: 28, description: "Games, toys and playthings; video game apparatus; gymnastic and sporting articles" },
  {
    class: 29,
    description:
      "Meat, fish, poultry and game; meat extracts; preserved, frozen, dried and cooked fruits and vegetables",
  },
  {
    class: 30,
    description:
      "Coffee, tea, cocoa and substitutes therefor; rice, pasta and noodles; tapioca and sago; flour and preparations made from cereals",
  },
  { class: 31, description: "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products" },
  {
    class: 32,
    description: "Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages and fruit juices",
  },
  { class: 33, description: "Alcoholic beverages, except beers; alcoholic preparations for making beverages" },
  {
    class: 34,
    description:
      "Tobacco and tobacco substitutes; cigarettes and cigars; electronic cigarettes and oral vaporizers for smokers",
  },
  { class: 35, description: "Advertising; business management, organization and administration; office functions" },
  { class: 36, description: "Financial, monetary and banking services; insurance services; real estate affairs" },
  {
    class: 37,
    description: "Construction services; installation and repair services; mining extraction, oil and gas drilling",
  },
  { class: 38, description: "Telecommunications services" },
  { class: 39, description: "Transport; packaging and storage of goods; travel arrangement" },
  {
    class: 40,
    description: "Treatment of materials; recycling of waste and trash; air purification and treatment of water",
  },
  { class: 41, description: "Education; providing of training; entertainment; sporting and cultural activities" },
  { class: 42, description: "Scientific and technological services and research and design relating thereto" },
  { class: 43, description: "Services for providing food and drink; temporary accommodation" },
  {
    class: 44,
    description: "Medical services; veterinary services; hygienic and beauty care for human beings or animals",
  },
  {
    class: 45,
    description: "Legal services; security services for the physical protection of tangible property and individuals",
  },
]

interface TrademarkClassesDialogProps {
  selectedClasses: number[]
  setSelectedClasses: (classes: number[]) => void
}

export function TrademarkClassesDialog({ selectedClasses, setSelectedClasses }: TrademarkClassesDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const toggleClass = (classNumber: number) => {
    setSelectedClasses(
      selectedClasses.includes(classNumber)
        ? selectedClasses.filter((c) => c !== classNumber)
        : [...selectedClasses, classNumber],
    )
  }

  const filteredClasses = trademarkClasses.filter((c) => c.description.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search classes..."
          className="flex-grow p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" size="sm" className="flex items-center">
          <Info className="w-4 h-4 mr-2" />
          Class Info
        </Button>
      </div>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((c) => (
            <div key={c.class} className="flex items-start space-x-2">
              <Checkbox
                id={`class-${c.class}`}
                checked={selectedClasses.includes(c.class)}
                onCheckedChange={() => toggleClass(c.class)}
              />
              <label
                htmlFor={`class-${c.class}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="font-medium">Class {c.class}</span>
                <p className="text-xs text-gray-500 mt-1">{c.description}</p>
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Selected classes: {selectedClasses.length}</p>
        <Button onClick={() => setSelectedClasses([])}>Clear All</Button>
      </div>
    </div>
  )
}

