import { PublishedFaq } from "@/components/published-faq"
import type { FaqItem } from "@/lib/seo"

const faqItems: FaqItem[] = [
  {
    question: "Can I trademark my name as an influencer or athlete?",
    answer:
      "Yes, if the name functions as a brand for goods or services — merch, media, a camp, a sponsorship. A trademark protects that name as a brand used in commerce and can help platforms and courts act against impersonation. It is not ownership of your face or voice. Publicity and likeness rights are separate. Filing early matters because rights date from the filing date, and registration typically takes months.",
  },
  {
    question: "What can I do if AI is using my voice or face without my permission?",
    answer:
      "A trademark helps when someone uses your name as a brand, including a fake sponsorship that trades on that name. A cloned voice or a generated face is not automatically trademark infringement. Those claims sit in publicity and likeness law, plus whatever the platform's rules allow. Licensed attorneys usually file within 24 hours. Registration typically takes months — about 8–12 months in the United States. Your rights date from the filing date.",
  },
  {
    question: "What is NIL and why do athletes need trademark protection?",
    answer:
      "NIL stands for Name, Image & Likeness — being paid for your identity. Since the NCAA changed its rules in 2021, college athletes can sign sponsorship deals. An NIL deal is a contract. A trademark is a brand right in a name used with specific goods or services. They are not the same, and a trademark does not replace publicity rights.",
  },
  {
    question: "How does trademark registration protect me from AI deepfakes?",
    answer:
      "A registration helps when a deepfake or a fake endorsement uses your name or logo as a brand. It does not turn every AI video or voice clone into trademark infringement, and it is not ownership of your face or voice. It is one tool platforms and courts can act on. It is not a shield against every misuse.",
  },
]

export function FAQ() {
  return (
    <div className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <p className="label-caps text-accent text-center mb-5">Common questions</p>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-center mb-5 text-primary">
          Questions, answered.
        </h2>
        <p className="text-center text-gray-500 font-light mb-14 max-w-xl mx-auto">
          Everything creators, athletes, and artists need to know about protecting their name as a brand.
        </p>
        <div className="w-full max-w-2xl mx-auto">
          <PublishedFaq items={faqItems} />
        </div>
      </div>
    </div>
  )
}
