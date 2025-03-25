import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function DetailedPricelistFAQ() {
  const faqs = [
    {
      question: "How are the prices for each country determined?",
      answer:
        "Prices are based on the complexity of the registration process, official fees, and the level of legal work required in each jurisdiction. Factors such as the number of trademark classes and potential office actions are also considered.",
    },
    {
      question: "Can I register my trademark in multiple countries at once?",
      answer:
        "Yes, you can select multiple countries for trademark registration. This is often recommended for businesses operating or planning to expand internationally. We offer package deals for multi-country registrations.",
    },
    {
      question: "How long does the registration process take in different countries?",
      answer:
        "The duration varies by country, typically ranging from 6 months to 2 years. Factors such as the complexity of the application and potential oppositions can affect the timeline. We provide estimated timeframes for each country during the registration process.",
    },
    {
      question: "What's included in the price for each country?",
      answer:
        "The price includes the official filing fees, our legal services for preparing and submitting the application, and basic handling of office actions. Additional services such as extensive office action responses or oppositions may incur extra fees.",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-indigo-900">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

