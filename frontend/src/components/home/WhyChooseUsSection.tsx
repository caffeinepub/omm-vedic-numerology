const benefits = [
  {
    emoji: '🔮',
    title: 'Best Numerology Consultant in Bhubaneswar',
    description:
      'Trusted by hundreds of clients across Odisha, our numerology readings decode your life path, destiny number, and soul urge to guide your most important decisions.',
  },
  {
    emoji: '🏠',
    title: 'Expert Vastu Shastra Guidance',
    description:
      'Our vastu shastra expert brings decades of Vedic knowledge to harmonize your home and office spaces for prosperity, health, and positive energy flow.',
  },
  {
    emoji: '🃏',
    title: 'Tarot Card Reading Online & In-Person',
    description:
      'Gain intuitive clarity on relationships, career, and life decisions through our personalized tarot card reading sessions — available both online and at our Bhubaneswar centre.',
  },
  {
    emoji: '✍️',
    title: 'Pronology Name Correction Specialist',
    description:
      'Our pronology name correction service analyzes the sound vibrations of your name and suggests corrections to align your identity with your highest potential.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-20 bg-cosmic-deep relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.14_75/0.05)_0%,transparent_60%)]" />

      {/* Decorative stars */}
      <div className="absolute top-10 left-8 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" />
      <div className="absolute top-20 right-12 w-1.5 h-1.5 rounded-full bg-gold/30 animate-twinkle" style={{ animationDelay: '0.8s' }} />
      <div className="absolute bottom-12 right-1/4 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" style={{ animationDelay: '1.6s' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
            ✦ Our Expertise ✦
          </p>
          <h2 className="font-cinzel font-black text-3xl md:text-5xl text-foreground mb-4 tracking-wide">
            Why Choose <span className="gold-text-gradient">Omm Vedic</span>
          </h2>
          <p className="font-cormorant text-lg text-foreground/60 italic max-w-2xl mx-auto">
            Rooted in ancient Vedic wisdom, trusted by modern seekers — discover why we are Bhubaneswar's most sought-after spiritual guidance centre.
          </p>
          <div className="divider-gold w-48 mx-auto mt-6" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-cosmic rounded-xl p-6 md:p-8 border border-gold/15 hover:border-gold/40 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-gold/15 transition-colors">
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

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="font-cormorant text-lg text-foreground/50 italic">
            All consultations available at a single flat rate of{' '}
            <span className="text-gold font-semibold not-italic">₹400</span> — no hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
}
