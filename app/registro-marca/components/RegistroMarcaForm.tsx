"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Upload, X, Search, ChevronDown, CheckCircle, Clock } from "lucide-react"
import { CheckCircle2 } from "lucide-react"

interface FormData {
  // Plan selection
  selectedPlan: string

  // Trademark info
  trademarkName: string
  trademarkType: string
  description: string
  logo: File | null

  // Classification
  selectedClasses: string[]

  // Owner info
  ownerType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  dni: string

  // Company info (if applicable)
  companyName: string
  cuit: string
  legalRepresentative: string
}

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: 150000,
    description: "Solicitud express sin complicaciones",
    features: [
      "Presentación de la solicitud ante INPI (honorarios + tasa oficial)",
      "Envío digital del comprobante de presentación",
    ],
  },
  {
    id: "estandar",
    name: "Estándar",
    price: 200000,
    description: "Protección básica con revisión profesional",
    features: [
      "Revisión del formulario de presentación (datos y clasificación) para minimizar errores",
      "Presentación con tasas incluidas",
      "Envío digital del comprobante de presentación",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: 220000,
    description: "Nuestro plan elite.",
    features: [
      "Revisión del formulario de presentación (datos y clasificación)",
      "Presentación con tasas incluidas",
      "Envío digital del comprobante de presentación",
      "Contestación gratuita de vistas de admisión",
      "Envío gratuito del título de marca una vez concedido",
    ],
  },
]

const trademarkClasses = [
  {
    id: "1",
    name: "Clase 1",
    title:
      "Productos químicos para la industria, la ciencia y la fotografía, así como para la agricultura, la horticultura y la silvicultura",
    description:
      "Fertilizantes, pesticidas, productos químicos industriales, reactivos de laboratorio, abonos, productos para curtir",
  },
  {
    id: "2",
    name: "Clase 2",
    title: "Pinturas, barnices, lacas; productos contra la herrumbre y el deterioro de la madera; colorantes, tintes",
    description:
      "Pinturas para casas, barnices, esmaltes, tintes para cabello, colorantes alimentarios, tintas de imprenta",
  },
  {
    id: "3",
    name: "Clase 3",
    title:
      "Productos cosméticos y preparaciones de tocador no medicinales; dentífricos no medicinales; productos de perfumería, aceites esenciales",
    description: "Maquillaje, cremas, perfumes, shampoo, jabones, pasta dental, desodorantes, productos de belleza",
  },
  {
    id: "4",
    name: "Clase 4",
    title:
      "Aceites y grasas para uso industrial, ceras; lubricantes; productos para absorber, rociar y asentar el polvo; combustibles y materias de alumbrado",
    description: "Aceites de motor, lubricantes, ceras, combustibles, velas, carbón, gas natural, petróleo",
  },
  {
    id: "5",
    name: "Clase 5",
    title:
      "Productos farmacéuticos, preparaciones médicas y veterinarias; productos higiénicos y sanitarios para uso médico",
    description:
      "Medicamentos, vitaminas, suplementos, vendas, productos veterinarios, anticonceptivos, desinfectantes médicos",
  },
  {
    id: "6",
    name: "Clase 6",
    title:
      "Metales comunes y sus aleaciones, minerales metalíferos; materiales de construcción metálicos; construcciones transportables metálicas",
    description:
      "Hierro, acero, aluminio, estructuras metálicas, clavos, tornillos, contenedores metálicos, cables metálicos",
  },
  {
    id: "7",
    name: "Clase 7",
    title:
      "Máquinas, máquinas herramientas, herramientas mecánicas; motores, excepto los motores para vehículos terrestres",
    description:
      "Máquinas industriales, herramientas eléctricas, motores marinos, generadores, bombas, robots industriales",
  },
  {
    id: "8",
    name: "Clase 8",
    title:
      "Herramientas e instrumentos de mano, accionados manualmente; artículos de cuchillería, tenedores y cucharas",
    description: "Martillos, destornilladores, cuchillos, tijeras, cubiertos, navajas, herramientas de jardín manuales",
  },
  {
    id: "9",
    name: "Clase 9",
    title:
      "Aparatos e instrumentos científicos, de investigación, de navegación, geodésicos, fotográficos, cinematográficos, audiovisuales, ópticos, de pesaje, de medición, de señalización, de detección, de control, de inspección, de salvamento y de enseñanza",
    description:
      "Computadoras, celulares, software, cámaras, anteojos, balanzas, GPS, aplicaciones móviles, equipos electrónicos",
  },
  {
    id: "10",
    name: "Clase 10",
    title:
      "Aparatos e instrumentos quirúrgicos, médicos, odontológicos y veterinarios; miembros, ojos y dientes artificiales; artículos ortopédicos",
    description: "Equipos médicos, prótesis, sillas de ruedas, instrumentos dentales, marcapasos, aparatos ortopédicos",
  },
  {
    id: "11",
    name: "Clase 11",
    title:
      "Aparatos e instalaciones de alumbrado, de calefacción, de refrigeración, de secado, de ventilación, de distribución de agua y sanitarios",
    description:
      "Lámparas, calefactores, aires acondicionados, heladeras, ventiladores, inodoros, sistemas de iluminación",
  },
  {
    id: "12",
    name: "Clase 12",
    title: "Vehículos; aparatos de locomoción terrestre, aérea o acuática",
    description: "Autos, motos, bicicletas, aviones, barcos, trenes, neumáticos, repuestos para vehículos",
  },
  {
    id: "13",
    name: "Clase 13",
    title: "Armas de fuego; municiones y proyectiles; explosivos; fuegos artificiales",
    description: "Pistolas, rifles, balas, explosivos, pirotecnia, fuegos artificiales, armas deportivas",
  },
  {
    id: "14",
    name: "Clase 14",
    title:
      "Metales preciosos y sus aleaciones; artículos de joyería, piedras preciosas y semipreciosas; artículos de relojería e instrumentos cronométricos",
    description: "Oro, plata, anillos, collares, relojes, diamantes, joyas, bijouterie, cronómetros",
  },
  {
    id: "15",
    name: "Clase 15",
    title:
      "Instrumentos de música; atriles para partituras y soportes para instrumentos de música; batutas de director de orquesta",
    description: "Guitarras, pianos, violines, baterías, micrófonos, atriles musicales, instrumentos de viento",
  },
  {
    id: "16",
    name: "Clase 16",
    title:
      "Papel y cartón; productos de imprenta; material de encuadernación; fotografías; artículos de papelería y artículos de oficina, excepto muebles",
    description: "Libros, revistas, cuadernos, bolígrafos, papel, cartón, fotografías, material escolar, impresiones",
  },
  {
    id: "17",
    name: "Clase 17",
    title:
      "Caucho, gutapercha, goma, amianto, mica en bruto o semielaborados, así como sucedáneos de todas estas materias; productos en materias plásticas y en resina en forma extrudida para su utilización en la fabricación",
    description: "Goma, caucho, plásticos industriales, materiales aislantes, mangueras, juntas, sellos",
  },
  {
    id: "18",
    name: "Clase 18",
    title:
      "Cuero y cuero de imitación; pieles de animales; artículos de equipaje y bolsas de transporte; paraguas y sombrillas; bastones",
    description: "Carteras, mochilas, valijas, paraguas, cinturones de cuero, bolsos, maletas, marroquinería",
  },
  {
    id: "19",
    name: "Clase 19",
    title:
      "Materiales de construcción no metálicos; tubos rígidos no metálicos para la construcción; asfalto, pez, alquitrán y betún",
    description: "Cemento, ladrillos, tejas, madera para construcción, vidrio, asfalto, materiales de pavimentación",
  },
  {
    id: "20",
    name: "Clase 20",
    title:
      "Muebles, espejos, marcos; contenedores no metálicos para almacenamiento o transporte; hueso, cuerno, ballena o nácar, en bruto o semielaborados",
    description: "Sillas, mesas, camas, espejos, marcos para cuadros, muebles de oficina, estanterías",
  },
  {
    id: "21",
    name: "Clase 21",
    title:
      "Utensilios y recipientes para el hogar o la cocina; peines y esponjas; cepillos, excepto pinceles; material para fabricar cepillos",
    description: "Platos, vasos, ollas, cepillos de dientes, peines, esponjas, utensilios de cocina, vajilla",
  },
  {
    id: "22",
    name: "Clase 22",
    title:
      "Cuerdas y cordeles; redes; tiendas de campaña y lonas; toldos de materias textiles o sintéticas; velas para la navegación",
    description: "Sogas, redes, carpas, toldos, velas de barco, cordones, cables no metálicos",
  },
  {
    id: "23",
    name: "Clase 23",
    title: "Hilos para uso textil",
    description: "Hilos de coser, hilos de bordar, lanas para tejer, hilos industriales, fibras textiles",
  },
  {
    id: "24",
    name: "Clase 24",
    title: "Tejidos y sus sucedáneos; ropa de hogar; cortinas de materias textiles o de materias plásticas",
    description: "Telas, sábanas, cortinas, manteles, toallas, tejidos para tapicería, ropa de cama",
  },
  {
    id: "25",
    name: "Clase 25",
    title: "Prendas de vestir, calzado, artículos de sombrerería",
    description:
      "Remeras, pantalones, vestidos, zapatos, zapatillas, gorras, sombreros, ropa interior, accesorios de vestir",
  },
  {
    id: "26",
    name: "Clase 26",
    title:
      "Encajes, galones y bordados, cintas y lazos; botones, ganchos y ojetes, alfileres y agujas; flores artificiales",
    description: "Botones, cierres, agujas, alfileres, flores artificiales, cintas decorativas, adornos para ropa",
  },
  {
    id: "27",
    name: "Clase 27",
    title:
      "Alfombras, felpudos, esteras, linóleo y otros revestimientos de suelos; tapicería mural que no sea de materias textiles",
    description: "Alfombras, felpudos, pisos laminados, revestimientos para pisos, tapices, moquetas",
  },
  {
    id: "28",
    name: "Clase 28",
    title:
      "Juegos, juguetes; aparatos de videojuegos; artículos de gimnasia y deporte; decoraciones para árboles de Navidad",
    description: "Juguetes, pelotas, equipos deportivos, videojuegos, decoraciones navideñas, artículos de fitness",
  },
  {
    id: "29",
    name: "Clase 29",
    title:
      "Carne, pescado, carne de ave y caza; extractos de carne; frutas y verduras, hortalizas y legumbres en conserva, congeladas, secas y cocidas",
    description: "Carne, pescado, pollo, frutas enlatadas, verduras congeladas, fiambres, quesos, productos lácteos",
  },
  {
    id: "30",
    name: "Clase 30",
    title:
      "Café, té, cacao y sucedáneos del café; arroz, pasta alimenticia y fideos; tapioca y sagú; harinas y preparaciones a base de cereales",
    description: "Café, té, chocolate, pan, galletas, cereales, pasta, arroz, harinas, productos de panadería",
  },
  {
    id: "31",
    name: "Clase 31",
    title:
      "Productos agrícolas, acuícolas, hortícolas y forestales en bruto y sin procesar; granos y semillas en bruto y sin procesar",
    description: "Frutas frescas, verduras frescas, granos, semillas, plantas, flores naturales, productos agrícolas",
  },
  {
    id: "32",
    name: "Clase 32",
    title:
      "Cervezas; bebidas sin alcohol; aguas minerales y gaseosas; bebidas a base de frutas y zumos de frutas; siropes y otras preparaciones sin alcohol para elaborar bebidas",
    description: "Cerveza, gaseosas, jugos, agua mineral, bebidas energéticas, siropes, bebidas deportivas",
  },
  {
    id: "33",
    name: "Clase 33",
    title: "Bebidas alcohólicas, excepto cervezas; preparaciones alcohólicas para elaborar bebidas",
    description: "Vino, whisky, vodka, licores, bebidas alcohólicas destiladas, aperitivos alcohólicos",
  },
  {
    id: "34",
    name: "Clase 34",
    title: "Tabaco y sucedáneos del tabaco; cigarrillos y puros; pipas y boquillas para fumadores; fósforos",
    description: "Cigarrillos, puros, tabaco, pipas, encendedores, fósforos, productos para fumadores",
  },
  {
    id: "35",
    name: "Clase 35",
    title: "Publicidad; gestión de negocios comerciales; administración comercial; trabajos de oficina",
    description:
      "Servicios de marketing, publicidad, consultoría empresarial, administración, contabilidad, recursos humanos",
  },
  {
    id: "36",
    name: "Clase 36",
    title: "Servicios de seguros; asuntos financieros; asuntos monetarios; negocios inmobiliarios",
    description: "Bancos, seguros, servicios financieros, inmobiliarias, inversiones, créditos, servicios bancarios",
  },
  {
    id: "37",
    name: "Clase 37",
    title:
      "Servicios de construcción; servicios de instalación y reparación; extracción minera, perforación petrolífera y gaseosa",
    description:
      "Construcción, reparaciones, instalaciones, plomería, electricidad, pintura, servicios de mantenimiento",
  },
  {
    id: "38",
    name: "Clase 38",
    title: "Servicios de telecomunicaciones",
    description: "Telefonía, internet, servicios de comunicación, transmisión de datos, servicios de telefonía móvil",
  },
  {
    id: "39",
    name: "Clase 39",
    title: "Servicios de transporte; embalaje y almacenamiento de mercancías; organización de viajes",
    description: "Transporte, logística, mudanzas, almacenamiento, agencias de viaje, delivery, servicios de courier",
  },
  {
    id: "40",
    name: "Clase 40",
    title: "Tratamiento de materiales; reciclado de desechos y basuras; purificación del aire y tratamiento del agua",
    description:
      "Reciclaje, tratamiento de residuos, purificación de agua, procesamiento de materiales, servicios ambientales",
  },
  {
    id: "41",
    name: "Clase 41",
    title: "Educación; formación; servicios de entretenimiento; actividades deportivas y culturales",
    description:
      "Escuelas, cursos, entretenimiento, eventos, deportes, espectáculos, capacitación, servicios educativos",
  },
  {
    id: "42",
    name: "Clase 42",
    title:
      "Servicios científicos y tecnológicos, así como servicios de investigación y diseño en estos ámbitos; servicios de análisis e investigación industriales",
    description:
      "Desarrollo de software, investigación, diseño, servicios tecnológicos, análisis técnicos, consultoría IT",
  },
  {
    id: "43",
    name: "Clase 43",
    title: "Servicios de restauración (alimentación); hospedaje temporal",
    description: "Restaurantes, bares, hoteles, catering, servicios de comida, alojamiento, servicios gastronómicos",
  },
  {
    id: "44",
    name: "Clase 44",
    title: "Servicios médicos; servicios veterinarios; cuidados de higiene y de belleza para personas o animales",
    description: "Médicos, dentistas, veterinarios, peluquerías, spas, servicios de belleza, servicios de salud",
  },
  {
    id: "45",
    name: "Clase 45",
    title:
      "Servicios jurídicos; servicios de seguridad para la protección física de bienes materiales y personas; servicios personales y sociales prestados por terceros destinados a satisfacer necesidades individuales",
    description: "Abogados, servicios legales, seguridad, vigilancia, servicios personales, servicios sociales",
  },
]

export function RegistroMarcaForm({ selectedPlan }: { selectedPlan?: string }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    selectedPlan: selectedPlan || "",
    trademarkName: "",
    trademarkType: "",
    description: "",
    logo: null,
    selectedClasses: [],
    ownerType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    dni: "",
    companyName: "",
    cuit: "",
    legalRepresentative: "",
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  const VALID_PROMO_CODES: { [key: string]: { discount: number; type: "percentage" | "fixed" } } = {
    trademarks26: { discount: 15, type: "percentage" }, // 15% off
  }

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedPlan !== ""
      case 2:
        const requiresLogo = formData.trademarkType === "figurativa" || formData.trademarkType === "mixta"
        return (
          formData.trademarkName && formData.trademarkType && formData.description && (!requiresLogo || formData.logo)
        )
      case 3:
        return formData.selectedClasses.length > 0
      case 4:
        if (formData.ownerType === "persona") {
          return formData.firstName && formData.lastName && formData.email && formData.phone && formData.dni
        } else {
          return (
            formData.companyName && formData.cuit && formData.legalRepresentative && formData.email && formData.phone
          )
        }
      default:
        return true
    }
  }

  const handleClassToggle = (classId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter((id) => id !== classId)
        : [...prev.selectedClasses, classId],
    }))
    setDropdownOpen(false)
  }

  const getSelectedPlan = () => {
    return plans.find((plan) => plan.id === formData.selectedPlan)
  }

  const getTotalPrice = () => {
    const selectedPlan = getSelectedPlan()
    const numberOfClasses = Math.max(1, formData.selectedClasses.length)
    let total = selectedPlan ? selectedPlan.price * numberOfClasses : 0

    if (promoApplied && promoCode.trim().toLowerCase() in VALID_PROMO_CODES) {
      const promo = VALID_PROMO_CODES[promoCode.trim().toLowerCase()]
      if (promo.type === "percentage") {
        total = total * (1 - promo.discount / 100)
      } else {
        total = Math.max(0, total - promo.discount)
      }
    }

    return Math.round(total)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }))
    }
  }

  const applyPromoCode = () => {
    const code = promoCode.trim().toLowerCase()
    if (VALID_PROMO_CODES[code]) {
      setPromoApplied(true)
      setPromoError("")
    } else {
      setPromoError("Código promocional inválido")
      setPromoApplied(false)
    }
  }

  const filteredClasses = trademarkClasses.filter(
    (clase) =>
      clase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)

    try {
      // Convert logo to base64 if present
      let logoBase64 = null
      if (formData.logo) {
        logoBase64 = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result)
          reader.readAsDataURL(formData.logo!)
        })
      }

      // Prepare the data to send to the API
      const submissionData = {
        // Plan info
        plan: formData.selectedPlan,

        // Trademark info
        nombreMarca: formData.trademarkName,
        tipoMarca: formData.trademarkType,
        descripcion: formData.description,
        productosServicios: formData.description,
        logo: logoBase64,
        logoFileName: formData.logo?.name || null,

        // Classification
        clasesSeleccionadas: formData.selectedClasses,

        // Owner info
        tipoTitular: formData.ownerType,
        nombre: formData.ownerType === "persona" ? formData.firstName : formData.companyName,
        apellido: formData.ownerType === "persona" ? formData.lastName : "",
        email: formData.email,
        telefono: formData.phone,
        direccion: formData.address,
        ciudad: formData.city,
        provincia: formData.province,
        codigoPostal: formData.postalCode,
        dni: formData.dni,

        // Company info (if applicable)
        razonSocial: formData.companyName,
        cuit: formData.cuit,
        representanteLegal: formData.legalRepresentative,

        // Additional info
        empresa: formData.companyName || "",
      }

      console.log("Submitting trademark application:", submissionData)

      const response = await fetch("/api/submit-registro-marca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        const totalPrice = getTotalPrice()
        const selectedPlan = getSelectedPlan()
        const params = new URLSearchParams({
          plan: selectedPlan?.name || "",
          total: totalPrice.toString(),
          classes: formData.selectedClasses.length.toString(),
          email: formData.email,
          trademarkName: formData.trademarkName,
        })

        window.location.href = `/gracias-registro-marca?${params.toString()}`
      } else {
        throw new Error(result.error || "Error enviando solicitud")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      // You might want to show an error toast here
      alert("Error enviando la solicitud. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    const selectedPlan = getSelectedPlan()
    const totalPrice = getTotalPrice()
    const numberOfClasses = formData.selectedClasses.length

    const queryParams = new URLSearchParams({
      plan: selectedPlan?.name || "",
      total: totalPrice.toString(),
      classes: numberOfClasses.toString(),
    })

    window.location.href = `/gracias-registro-marca?${queryParams.toString()}`
    return null
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Selecciona tu Plan</h2>
              <p className="text-gray-600 mb-6">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    formData.selectedPlan === plan.id ? "ring-2 ring-blue-500 border-blue-500" : "hover:shadow-lg"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, selectedPlan: plan.id }))}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="text-3xl font-bold text-blue-600">${plan.price.toLocaleString()}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Información de la Marca</h2>
              <p className="text-gray-600 mb-6">Proporciona los detalles de tu marca</p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="trademarkName">Nombre de la Marca *</Label>
                <Input
                  id="trademarkName"
                  value={formData.trademarkName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, trademarkName: e.target.value }))}
                  placeholder="Ingresa el nombre de tu marca"
                />
              </div>

              <div>
                <Label htmlFor="trademarkType">Tipo de Marca *</Label>
                <Select
                  value={formData.trademarkType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, trademarkType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="denominativa">Denominativa (solo texto)</SelectItem>
                    <SelectItem value="figurativa">Figurativa (solo imagen)</SelectItem>
                    <SelectItem value="mixta">Mixta (texto + imagen)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descripción de la Marca *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu marca y los productos/servicios que representa"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="logo">
                  Logo de la Marca{" "}
                  {formData.trademarkType === "figurativa" || formData.trademarkType === "mixta" ? "*" : "(opcional)"}
                </Label>
                <div className="mt-2">
                  <input type="file" id="logo" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("logo")?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {formData.logo ? formData.logo.name : "Subir Logo"}
                  </Button>
                  {formData.logo && (
                    <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-600">{formData.logo.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, logo: null }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {(formData.trademarkType === "figurativa" || formData.trademarkType === "mixta") &&
                    !formData.logo && (
                      <p className="text-sm text-red-600 mt-2">
                        * El logo es obligatorio para marcas figurativas y mixtas
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Clasificación de la Marca</h2>
              <p className="text-gray-600 mb-6">
                Selecciona las clases que corresponden a tu marca. Cada clase protege diferentes tipos de productos o
                servicios.
              </p>
            </div>

            {/* Campo de búsqueda */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Buscar clases por producto o servicio
              </Label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ej: 'ropa', 'software', 'restaurante', '25'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>

            {/* Selector de clases */}
            <div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 border-gray-300 hover:border-blue-400 text-gray-700 bg-transparent"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {searchTerm ? `Mostrando ${filteredClasses.length} clases` : "Ver todas las clases disponibles"}
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto">
                    {filteredClasses.length > 0 ? (
                      filteredClasses.map((clase) => (
                        <button
                          key={clase.id}
                          className="w-full px-4 py-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => handleClassToggle(clase.id)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">{clase.name}</Badge>
                              </div>
                              <div className="text-sm text-gray-900 mb-1 font-medium">{clase.title}</div>
                              <div className="text-xs text-gray-600">
                                <strong>Ejemplos:</strong> {clase.description}
                              </div>
                            </div>
                            <div className="text-xs text-blue-600 font-medium whitespace-nowrap">+ Agregar</div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-center text-gray-500">
                        No se encontraron clases que coincidan con tu búsqueda
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Clases seleccionadas */}
            {formData.selectedClasses.length > 0 && (
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Clases seleccionadas ({formData.selectedClasses.length}):
                </Label>
                <div className="space-y-3">
                  {formData.selectedClasses.map((classId) => {
                    const tmClass = trademarkClasses.find((c) => c.id === classId)
                    return (
                      <div key={classId} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">{tmClass?.name}</Badge>
                            </div>
                            <div className="text-sm text-gray-900 mb-1 font-medium">{tmClass?.title}</div>
                            <div className="text-xs text-gray-600">
                              <strong>Ejemplos:</strong> {tmClass?.description}
                            </div>
                          </div>
                          <button
                            onClick={() => handleClassToggle(classId)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <p className="text-sm text-amber-800">
                <strong>Importante:</strong> Elegir las clases correctas es crucial para la protección de tu marca.
                Puedes seleccionar múltiples clases sin costo adicional.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Datos del Titular</h2>
              <p className="text-gray-600 mb-6">Información del propietario de la marca</p>
            </div>

            <div>
              <Label>Tipo de Titular *</Label>
              <Select
                value={formData.ownerType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ownerType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de titular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persona">Persona Física</SelectItem>
                  <SelectItem value="empresa">Empresa/Sociedad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.ownerType === "persona" ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dni: e.target.value }))}
                  />
                </div>
              </div>
            ) : formData.ownerType === "empresa" ? (
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="companyName">Razón Social *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cuit">CUIT *</Label>
                  <Input
                    id="cuit"
                    value={formData.cuit}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cuit: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="legalRepresentative">Representante Legal *</Label>
                  <Input
                    id="legalRepresentative"
                    value={formData.legalRepresentative}
                    onChange={(e) => setFormData((prev) => ({ ...prev, legalRepresentative: e.target.value }))}
                  />
                </div>
              </div>
            ) : null}

            {formData.ownerType && (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Provincia</Label>
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => setFormData((prev) => ({ ...prev, province: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        const selectedPlan = getSelectedPlan()
        const totalPrice = getTotalPrice()

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Confirmación de Solicitud</h2>
              <p className="text-gray-600 mb-6">Revisa tu información antes de enviar la solicitud</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold">Plan Seleccionado</h3>
                    <p>
                      {selectedPlan?.name} - ${selectedPlan?.price.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Marca</h3>
                    <p>{formData.trademarkName}</p>
                    <p className="text-sm text-gray-600">{formData.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">Clases Seleccionadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedClasses.map((classId) => {
                        const tmClass = trademarkClasses.find((c) => c.id === classId)
                        return (
                          <Badge key={classId} variant="secondary">
                            {tmClass?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold">Titular</h3>
                    {formData.ownerType === "persona" ? (
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                    ) : (
                      <p>{formData.companyName}</p>
                    )}
                    <p className="text-sm text-gray-600">{formData.email}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Código Promocional</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ingresa tu código"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value)
                          setPromoError("")
                          setPromoApplied(false)
                        }}
                        disabled={promoApplied}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={applyPromoCode}
                        disabled={!promoCode.trim() || promoApplied}
                        variant={promoApplied ? "default" : "outline"}
                      >
                        {promoApplied ? "✓ Aplicado" : "Aplicar"}
                      </Button>
                    </div>
                    {promoError && <p className="text-sm text-red-600 mt-1">{promoError}</p>}
                    {promoApplied && (
                      <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Descuento del 15% aplicado
                      </p>
                    )}
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Subtotal:</span>
                      <span className="line-through">${(totalPrice / 0.85).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total a Pagar:</span>
                      <span className="text-blue-600">${totalPrice.toLocaleString()}</span>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 text-right mt-1">
                        Ahorraste ${Math.round((totalPrice / 0.85) * 0.15).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Solicitar Marca</h1>
          <div className="text-sm text-gray-600">
            Paso {currentStep} de {totalSteps}
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext} disabled={!validateCurrentStep()}>
            Siguiente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmitApplication}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Enviar Solicitud
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
