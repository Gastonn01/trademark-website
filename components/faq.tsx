"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export function FAQ() {
  const faqItems = [
    {
      question: "What is a trademark?",
      answer:
        "A trademark is a recognizable sign, design, or expression that identifies products or services from a particular source.",
    },
    {
      question: "How long does trademark registration take?",
      answer: "The process typically takes 6-12 months, depending on the country and complexity of the application.",
    },
    {
      question: "What can I trademark?",
      answer:
        "You can trademark various elements of your brand, including company names, product names, logos, slogans, and in some cases, sounds, colors, or packaging designs. The key requirement is that the mark must be distinctive and not confusingly similar to existing trademarks.",
    },
    {
      question: "How much does trademark registration cost?",
      answer:
        "The cost varies depending on factors such as the number of classes, countries, and whether you face any objections. Basic registration starts from $199 for one class in one country. View our detailed pricing page for specific costs in different jurisdictions.",
    },
  ]

  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-blue-700">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
