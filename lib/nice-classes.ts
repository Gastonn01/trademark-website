// Nice Classification (the 45 international trademark classes) translated
// into plain language, plus a small set of everyday business categories that
// map to the classes actually relevant to them. Lets the report say "this
// registration is in a different category than yours" without ever asking
// a non-expert to pick a class number themselves.

export const NICE_CLASS_LABELS: Record<number, string> = {
  1: "Chemicals",
  2: "Paints & coatings",
  3: "Cosmetics & cleaning products",
  4: "Industrial oils & fuels",
  5: "Pharmaceuticals & health products",
  6: "Metal goods",
  7: "Machines",
  8: "Hand tools",
  9: "Electronics & software",
  10: "Medical devices",
  11: "Appliances & lighting",
  12: "Vehicles",
  13: "Firearms",
  14: "Jewelry & watches",
  15: "Musical instruments",
  16: "Paper goods & printing",
  17: "Rubber & insulating materials",
  18: "Leather goods & bags",
  19: "Building materials",
  20: "Furniture",
  21: "Household & kitchen goods",
  22: "Ropes & raw textile fibers",
  23: "Yarns & threads",
  24: "Fabrics & textiles",
  25: "Clothing & footwear",
  26: "Lace, ribbons & fasteners",
  27: "Carpets & flooring",
  28: "Games & toys",
  29: "Meat, dairy & prepared foods",
  30: "Coffee, bread & staple foods",
  31: "Fresh produce & live plants",
  32: "Non-alcoholic beverages & beer",
  33: "Wines & spirits",
  34: "Tobacco & smokers' articles",
  35: "Advertising & retail services",
  36: "Finance & insurance",
  37: "Construction & repair services",
  38: "Telecommunications",
  39: "Transport & storage",
  40: "Material treatment",
  41: "Education & entertainment",
  42: "Software & tech services",
  43: "Food & accommodation services",
  44: "Medical & beauty services",
  45: "Legal & personal services",
}

export function classLabel(n: number): string {
  return NICE_CLASS_LABELS[n] ?? `Class ${n}`
}

export type BusinessCategory = {
  value: string
  labelEn: string
  labelEs: string
  classes: number[]
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { value: "clothing", labelEn: "Clothing & fashion accessories", labelEs: "Ropa y accesorios de moda", classes: [25, 18, 35] },
  { value: "food", labelEn: "Food & beverages", labelEs: "Comida y bebidas", classes: [29, 30, 32, 43] },
  { value: "tech", labelEn: "Apps, software & tech products", labelEs: "Apps, software y tecnología", classes: [9, 42] },
  { value: "beauty", labelEn: "Beauty & cosmetics", labelEs: "Belleza y cosmética", classes: [3, 44] },
  { value: "health", labelEn: "Health, wellness & supplements", labelEs: "Salud, bienestar y suplementos", classes: [5, 44] },
  { value: "education", labelEn: "Courses, coaching & education", labelEs: "Cursos, coaching y educación", classes: [41] },
  { value: "entertainment", labelEn: "Media, entertainment & music", labelEs: "Medios, entretenimiento y música", classes: [9, 41] },
  { value: "sports", labelEn: "Sports & fitness", labelEs: "Deportes y fitness", classes: [25, 28, 41] },
  { value: "home", labelEn: "Home, furniture & décor", labelEs: "Hogar, muebles y decoración", classes: [20, 21, 24] },
  { value: "jewelry", labelEn: "Jewelry & watches", labelEs: "Joyería y relojes", classes: [14] },
  { value: "services", labelEn: "Professional or consulting services", labelEs: "Servicios profesionales o de consultoría", classes: [35, 36, 45] },
  { value: "other", labelEn: "Something else / not sure", labelEs: "Otro / no estoy seguro", classes: [] },
]

export function classesForCategory(value?: string | null): number[] {
  if (!value) return []
  return BUSINESS_CATEGORIES.find((c) => c.value === value)?.classes ?? []
}
