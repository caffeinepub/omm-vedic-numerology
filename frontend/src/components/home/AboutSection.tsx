export default function AboutSection() {
  const features = [
    {
      icon: '🌟',
      title: 'Ancient Wisdom',
      description: 'Rooted in thousands of years of Vedic tradition and sacred knowledge',
    },
    {
      icon: '🔮',
      title: 'Personalized Guidance',
      description: 'Every reading is uniquely tailored to your birth chart and life path',
    },
    {
      icon: '🙏',
      title: 'Trusted Practice',
      description: 'Helping hundreds of seekers find clarity, purpose, and cosmic alignment',
    },
    {
      icon: '💫',
      title: 'Holistic Approach',
      description: 'Combining multiple Vedic sciences for comprehensive life guidance',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-cosmic-mid relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.78_0.14_75/0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
              ✦ About Us ✦
            </p>
            <h2 className="font-cinzel font-black text-3xl md:text-4xl text-foreground mb-6 tracking-wide leading-tight">
              Guided by the <span className="gold-text-gradient">Stars & Numbers</span>
            </h2>
            <div className="divider-gold w-32 mb-6" />
            <p className="font-cormorant text-lg text-foreground/70 italic mb-4 leading-relaxed">
              "The cosmos speaks in numbers, and every soul has a unique cosmic signature waiting to be decoded."
            </p>
            <p className="font-inter text-sm text-foreground/55 leading-relaxed mb-6">
              At Omm Vedic Numerology, we bridge the ancient wisdom of Vedic sciences with modern life's challenges.
              Our expert practitioners bring decades of experience in Tarot, Numerology, Vastu Shastra, and Pronology
              to help you navigate life's journey with clarity and confidence.
            </p>
            <p className="font-inter text-sm text-foreground/55 leading-relaxed">
              Whether you seek guidance on relationships, career, home energy, or the power of your name —
              we offer personalized sessions that illuminate your path forward.
            </p>
          </div>

          {/* Right: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-cosmic rounded-lg p-5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-cinzel font-semibold text-sm text-gold-light mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-inter text-xs text-foreground/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
