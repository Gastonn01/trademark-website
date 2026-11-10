"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#F7F5F1]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <p className="label-caps text-accent mb-6">Before someone else does</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 max-w-2xl mx-auto">
              Your name is your brand. <span className="italic text-accent">File it.</span>
            </h2>
            <p className="text-white/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              AI doesn&apos;t ask permission. A trademark is the claim to that name as a brand.
              Attorneys usually file within 24 hours. Registration takes months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/free-search"
                className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
              >
                Check if you&apos;re protected
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/detailed-pricelist#top"
                className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-white/80 border border-white/25 hover:border-white/60 hover:text-white rounded-full transition-all duration-300"
              >
                See pricing
              </Link>
            </div>

            <p className="label-caps text-[0.65rem] text-white/35">
              Usually filed within 24 hours&ensp;&middot;&ensp;Licensed attorneys&ensp;&middot;&ensp;15+ years of experience
            </p>
            <p className="text-xs text-white/40 mt-4">General information, not legal advice.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
