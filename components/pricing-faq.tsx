import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFAQ() {
  const faqs = [
    {
      question: "What's included in the trademark registration process?",
      answer:
        "Our trademark registration process includes a comprehensive search, application preparation and filing, responses to office actions, and registration certificate delivery. We handle all the paperwork and communication with the trademark office.",
    },
    {
      question: "How long does the trademark registration process take?",
      answer:
        "The trademark registration process typically takes 8-12 months. However, this can vary depending on the complexity of your application and any potential office actions or oppositions.",
    },
    {
      question: "Do you offer refunds if my trademark application is rejected?",
      answer:
        "We offer a money-back guarantee if your trademark application is rejected due to an error on our part. However, we cannot guarantee approval as final decisions are made by the trademark office.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time. We offer flexible options to accommodate your growing business needs. Simply contact our support team, and they'll guide you through the upgrade process.",
    },
    {
      question: "Do you offer international trademark registration?",
      answer:
        "Yes, we offer international trademark registration services. Our global network allows us to help you protect your brand in multiple countries. The costs and processes may vary depending on the specific countries you're interested in.",
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

