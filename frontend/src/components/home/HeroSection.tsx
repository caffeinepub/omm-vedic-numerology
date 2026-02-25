interface HeroSectionProps {
  onBookNow: () => void;
  onExploreServices: () => void;
}

export default function HeroSection({ onBookNow, onExploreServices }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1440x600.png')" }}
      />

      {/* Cosmic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep/70 via-cosmic-deep/50 to-cosmic-deep/90" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_75/0.08)_0%,transparent_70%)]" />

      {/* Floating stars decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 6}px`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Om Symbol */}
        <div className="mb-6 animate-float">
          <span className="text-6xl md:text-8xl text-gold/80 font-cormorant" style={{ textShadow: '0 0 40px oklch(0.78 0.14 75 / 0.5)' }}>
            ॐ
          </span>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold/60 text-xs tracking-[0.4em] font-cinzel uppercase">Est. Since Ancient Times</span>
          <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Main Heading */}
        <h1 className="font-cinzel font-black text-4xl sm:text-5xl md:text-7xl tracking-wider mb-4 leading-tight">
          <span className="gold-text-gradient">Omm Vedic</span>
          <br />
          <span className="text-foreground/90">Numerology</span>
        </h1>

        {/* Tagline */}
        <p className="font-cormorant text-xl md:text-2xl text-foreground/70 italic mb-3 tracking-wide">
          Unveiling the Sacred Wisdom of Numbers, Stars & Space
        </p>

        {/* Sub tagline */}
        <p className="font-inter text-sm md:text-base text-foreground/50 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover your life's divine blueprint through Tarot, Numerology, Vastu & Pronology.
          Each session priced at just <span className="text-gold font-semibold">₹400</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onBookNow}
            className="btn-gold px-8 py-3 rounded text-sm w-full sm:w-auto"
          >
            Book Your Session — ₹400
          </button>
          <button
            onClick={onExploreServices}
            className="btn-gold-outline px-8 py-3 rounded text-sm w-full sm:w-auto"
          >
            Explore Services
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-gold/40">
          <span className="font-cinzel text-xs tracking-widest uppercase">Scroll to Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
