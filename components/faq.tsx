"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export function FAQ() {
  const faqItems = [
    {
      question: "Can I trademark my name as an influencer or athlete?",
      answer:
        "Yes — and you should do it as early as possible. Your name is your most valuable asset. Trademarking it gives you exclusive rights to use it commercially, prevents others from registering it first, and gives you legal standing to demand takedowns of AI-generated content, fake sponsorships, or anyone using your name without permission.",
    },
    {
      question: "What can I do if AI is using my voice or face without my permission?",
      answer:
        "A registered trademark is one of your strongest legal tools. It gives you grounds to file DMCA takedowns, demand platform removals, and pursue legal action against anyone commercially exploiting your identity. Without a trademark, your options are much more limited. We file within 24 hours so you're protected fast.",
    },
    {
      question: "What is NIL and why do athletes need trademark protection?",
      answer:
        "NIL stands for Name, Image & Likeness — the right to profit from your own identity. Since the NCAA changed its rules in 2021, college athletes can sign sponsorship deals, but those deals are only as strong as your legal protection. Trademarking your name means no one else can register it, monetize it, or use AI to fake endorsements in your name.",
    },
    {
      question: "How does trademark registration protect me from AI deepfakes?",
      answer:
        "When your name or brand is trademarked, any commercial use of it — including AI-generated videos, voice clones, or fake endorsements — constitutes trademark infringement. This gives you the legal basis to issue cease and desist letters, demand platform takedowns, and sue for damages. It's not a perfect shield, but it's the strongest legal tool available right now.",
    },
  ]

  return (
    <div className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <p className="label-caps text-accent text-center mb-5">Common questions</p>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-center mb-5 text-primary">
          Questions, answered.
        </h2>
        <p className="text-center text-gray-500 font-light mb-14 max-w-xl mx-auto">
          Everything creators, athletes, and artists need to know about protecting their identity.
        </p>
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
