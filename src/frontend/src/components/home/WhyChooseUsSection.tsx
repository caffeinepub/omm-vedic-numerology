const benefits = [
  {
    emoji: "🃏",
    title: "Best Tarot Card Reader in Bhubaneswar & Odisha",
    description:
      "Omm Vedic Numerloggy is the best tarot card reader in Bhubaneswar and the most trusted tarot card reader in Odisha. Our expert tarot card reader provides accurate, intuitive sessions revealing deep insights into your relationships, career, and life decisions — available at just ₹400 for all of Odisha.",
  },
  {
    emoji: "✍️",
    title: "Top Pronologist in Bhubaneswar & Odisha",
    description:
      "As Odisha's top pronologist, our expert pronologist analyzes the precise sound vibrations in your name and recommends powerful name corrections to align your identity with your highest destiny. Trusted as the best pronologist in Bhubaneswar for name correction and sound vibration guidance.",
  },
  {
    emoji: "⌚",
    title: "Expert Watch Analyst in Bhubaneswar",
    description:
      "Our expert watch analyst in Bhubaneswar applies advanced Vedic numerology to analyze the numbers on your watch — identifying your most auspicious watch numbers for luck, success, and positive energy. The best watch analyst in Odisha for watch number analysis and lucky timepiece guidance.",
  },
  {
    emoji: "🔮",
    title: "Best Numerologist & Vastu Expert in Odisha",
    description:
      "Trusted by hundreds across Bhubaneswar and all of Odisha, our numerology readings decode your life path, destiny number, and soul urge. Our vastu shastra expert harmonizes your home and office for prosperity and positive energy. Widely regarded as the top Vedic numerologist in Bhubaneswar.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-20 bg-cosmic-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.14_75/0.05)_0%,transparent_60%)]" />

      <div className="absolute top-10 left-8 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" />
      <div
        className="absolute top-20 right-12 w-1.5 h-1.5 rounded-full bg-gold/30 animate-twinkle"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-12 right-1/4 w-1 h-1 rounded-full bg-gold/40 animate-twinkle"
        style={{ animationDelay: "1.6s" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
            ✦ Our Expertise ✦
          </p>
          <h2 className="font-cinzel font-black text-3xl md:text-5xl text-foreground mb-4 tracking-wide">
            Why Choose <span className="gold-text-gradient">Omm Vedic</span>
          </h2>
          <p className="font-cormorant text-lg text-foreground/60 italic max-w-2xl mx-auto">
            Bhubaneswar&apos;s best tarot card reader, top pronologist, expert
            watch analyst, and most trusted numerology consultant — all under
            one roof in Odisha.
          </p>
          <div className="divider-gold w-48 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="card-cosmic rounded-xl p-6 md:p-8 border border-gold/15 hover:border-gold/40 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0 text-2xl group-hover:bg-gold/15 transition-colors">
                  {benefit.emoji}
                </div>
                <div>
                  <h3 className="font-cinzel text-sm md:text-base font-bold text-gold-light mb-2 tracking-wide leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="font-inter text-sm text-foreground/55 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-cormorant text-lg text-foreground/50 italic">
            All consultations available at a single flat rate of{" "}
            <span className="text-gold font-semibold not-italic">₹400</span> —
            no hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
}
