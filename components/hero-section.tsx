import { HeroNameSearch } from "@/components/hero-name-search"

export function HeroSection() {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <nav aria-label="Who we protect" className="label-caps text-accent mb-8">
              <a href="/for-athletes" className="hover:underline">
                Athletes
              </a>
              <span aria-hidden="true">&ensp;&middot;&ensp;</span>
              <a href="/for-creators" className="hover:underline">
                Creators
              </a>
              <span aria-hidden="true">&ensp;&middot;&ensp;</span>
              <a href="/for-musicians" className="hover:underline">
                Musicians
              </a>
              <span aria-hidden="true">&ensp;&middot;&ensp;</span>
              <a href="/for-businesses" className="hover:underline">
                Businesses
              </a>
            </nav>

            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-8">
              AI is using your name.
              <br />
              <span className="italic text-accent">Time to fight back.</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Deepfakes. Voice cloning. Fake sponsorships. A registered trademark gives you
              the legal power to demand takedowns and own your identity — filed in 24 hours.
            </p>

            <HeroNameSearch />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-14 mt-16 border-t border-white/10">
            {[
              { label: "Identities protected", value: "10,000+" },
              { label: "Approval rate", value: "95%" },
              { label: "years of experience", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl text-white mb-2">{stat.value}</div>
                <div className="label-caps text-[0.65rem] text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
