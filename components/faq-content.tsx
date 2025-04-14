"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Find answers to common questions about trademark registration
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a trademark?</AccordionTrigger>
            <AccordionContent>
              A trademark is a distinctive sign, symbol, word, or combination thereof that identifies and distinguishes
              the goods or services of one business from those of others. It can include names, logos, slogans, and even
              sounds or colors in some cases.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How long does trademark registration take?</AccordionTrigger>
            <AccordionContent>
              The trademark registration process typically takes 8-12 months from filing to registration, assuming there
              are no objections or complications. However, you gain certain rights as soon as you file your application.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What can I trademark?</AccordionTrigger>
            <AccordionContent>
              You can trademark various elements of your brand, including company names, product names, logos, slogans,
              and in some cases, sounds, colors, or packaging designs. The key requirement is that the mark must be
              distinctive and not confusingly similar to existing trademarks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How much does trademark registration cost?</AccordionTrigger>
            <AccordionContent>
              The cost varies depending on factors such as the number of classes, countries, and whether you face any
              objections. Basic registration starts from $199 for one class in one country. View our detailed pricing
              page for specific costs in different jurisdictions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>What is the difference between ™ and ®?</AccordionTrigger>
            <AccordionContent>
              The ™ symbol can be used with any trademark, whether registered or not. The ® symbol can only be used with
              trademarks that have been officially registered with the trademark office. Using ® with an unregistered
              trademark is illegal in most countries.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>What happens after I register my trademark?</AccordionTrigger>
            <AccordionContent>
              After registration, you have exclusive rights to use your trademark for the registered goods and services.
              You'll need to actively monitor and enforce your rights, and renew your registration periodically (usually
              every 10 years). Our service includes monitoring and renewal reminders.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Can I register my trademark internationally?</AccordionTrigger>
            <AccordionContent>
              Yes, you can register your trademark in multiple countries. This can be done through individual country
              applications or through international systems like the Madrid Protocol. We offer global trademark
              registration services and can help you develop an international protection strategy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
