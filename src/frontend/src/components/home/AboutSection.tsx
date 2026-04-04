const features = [
  {
    icon: "🌟",
    title: "Ancient Wisdom",
    description:
      "Rooted in thousands of years of Vedic tradition and sacred knowledge",
  },
  {
    icon: "🔮",
    title: "Personalized Guidance",
    description:
      "Every reading is uniquely tailored to your birth chart and life path",
  },
  {
    icon: "🙏",
    title: "Trusted Practice",
    description:
      "Helping hundreds of seekers find clarity, purpose, and cosmic alignment",
  },
  {
    icon: "💫",
    title: "Holistic Approach",
    description:
      "Combining multiple Vedic sciences for comprehensive life guidance",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-cosmic-mid relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.78_0.14_75/0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Logo + Text */}
          <div>
            {/* OMM VEDIC Logo in Circle */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 blur-md opacity-40 scale-105" />
                <img
                  src="/assets/uploads/Screenshot_20260318_225730-1.jpg"
                  alt="Omm Vedic Numerology Logo"
                  className="relative w-28 h-28 rounded-full object-cover border-4 border-gold-400 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  loading="lazy"
                  width="112"
                  height="112"
                />
              </div>
            </div>

            <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
              ✦ About Us ✦
            </p>
            <h2 className="font-cinzel font-black text-3xl md:text-4xl text-foreground mb-6 tracking-wide leading-tight">
              Guided by the{" "}
              <span className="gold-text-gradient">Stars &amp; Numbers</span>
            </h2>
            <div className="divider-gold w-32 mb-6" />
            <p className="font-cormorant text-lg text-foreground/70 italic mb-4 leading-relaxed">
              &ldquo;The cosmos speaks in numbers, and every soul has a unique
              cosmic signature waiting to be decoded.&rdquo;
            </p>
            <p className="font-inter text-sm text-foreground/55 leading-relaxed mb-6">
              At Omm Vedic Numerology, we bridge the ancient wisdom of Vedic
              sciences with modern life&apos;s challenges. Our expert
              practitioners bring decades of experience in Tarot, Numerology,
              Vastu Shastra, and Pronology to help you navigate life&apos;s
              journey with clarity and confidence.
            </p>
            <p className="font-inter text-sm text-foreground/55 leading-relaxed">
              Located in the heart of Old Town, Bhubaneswar — exactly in front
              of Jagluck Office — we serve clients from across Odisha, both
              in-person and online.
            </p>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="card-cosmic rounded-xl p-6 border border-gold/10 hover:border-gold/25 transition-colors duration-300"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-cinzel font-bold text-sm text-gold-light mb-2 tracking-wide">
                  {f.title}
                </h3>
                <p className="font-inter text-xs text-foreground/50 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
