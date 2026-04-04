import React, { useEffect, useRef } from "react";
import { useGetTotalBookingCount } from "../../hooks/useQueries";

type Star = {
  id: string;
  top: string;
  left: string;
  size: number;
  delay: string;
  dur: string;
  gold: boolean;
};

// Hardcoded star field — 30 twinkling stars with fixed positions
const STARS: Star[] = [
  {
    id: "s1",
    top: "5%",
    left: "8%",
    size: 2,
    delay: "0s",
    dur: "3.2s",
    gold: true,
  },
  {
    id: "s2",
    top: "12%",
    left: "22%",
    size: 1,
    delay: "0.5s",
    dur: "2.8s",
    gold: false,
  },
  {
    id: "s3",
    top: "8%",
    left: "45%",
    size: 2,
    delay: "1.1s",
    dur: "4.0s",
    gold: false,
  },
  {
    id: "s4",
    top: "3%",
    left: "70%",
    size: 1,
    delay: "0.2s",
    dur: "3.5s",
    gold: false,
  },
  {
    id: "s5",
    top: "15%",
    left: "88%",
    size: 2,
    delay: "1.8s",
    dur: "2.6s",
    gold: true,
  },
  {
    id: "s6",
    top: "22%",
    left: "5%",
    size: 1,
    delay: "0.7s",
    dur: "3.8s",
    gold: false,
  },
  {
    id: "s7",
    top: "18%",
    left: "35%",
    size: 2,
    delay: "2.1s",
    dur: "3.0s",
    gold: false,
  },
  {
    id: "s8",
    top: "25%",
    left: "60%",
    size: 1,
    delay: "0.4s",
    dur: "4.2s",
    gold: false,
  },
  {
    id: "s9",
    top: "30%",
    left: "80%",
    size: 2,
    delay: "1.5s",
    dur: "2.9s",
    gold: false,
  },
  {
    id: "s10",
    top: "35%",
    left: "15%",
    size: 1,
    delay: "0.9s",
    dur: "3.6s",
    gold: true,
  },
  {
    id: "s11",
    top: "40%",
    left: "92%",
    size: 2,
    delay: "2.3s",
    dur: "3.1s",
    gold: false,
  },
  {
    id: "s12",
    top: "42%",
    left: "50%",
    size: 1,
    delay: "1.2s",
    dur: "2.7s",
    gold: false,
  },
  {
    id: "s13",
    top: "50%",
    left: "3%",
    size: 2,
    delay: "0.3s",
    dur: "4.1s",
    gold: false,
  },
  {
    id: "s14",
    top: "55%",
    left: "28%",
    size: 1,
    delay: "1.7s",
    dur: "3.3s",
    gold: false,
  },
  {
    id: "s15",
    top: "60%",
    left: "72%",
    size: 2,
    delay: "0.6s",
    dur: "2.5s",
    gold: true,
  },
  {
    id: "s16",
    top: "65%",
    left: "90%",
    size: 1,
    delay: "2.0s",
    dur: "3.9s",
    gold: false,
  },
  {
    id: "s17",
    top: "70%",
    left: "10%",
    size: 2,
    delay: "1.4s",
    dur: "3.4s",
    gold: false,
  },
  {
    id: "s18",
    top: "72%",
    left: "42%",
    size: 1,
    delay: "0.8s",
    dur: "2.4s",
    gold: false,
  },
  {
    id: "s19",
    top: "78%",
    left: "65%",
    size: 2,
    delay: "1.9s",
    dur: "4.3s",
    gold: false,
  },
  {
    id: "s20",
    top: "82%",
    left: "20%",
    size: 1,
    delay: "2.5s",
    dur: "3.7s",
    gold: true,
  },
  {
    id: "s21",
    top: "88%",
    left: "78%",
    size: 2,
    delay: "0.1s",
    dur: "2.8s",
    gold: false,
  },
  {
    id: "s22",
    top: "92%",
    left: "55%",
    size: 1,
    delay: "1.6s",
    dur: "3.2s",
    gold: false,
  },
  {
    id: "s23",
    top: "95%",
    left: "32%",
    size: 2,
    delay: "2.2s",
    dur: "3.8s",
    gold: false,
  },
  {
    id: "s24",
    top: "10%",
    left: "95%",
    size: 1,
    delay: "0.6s",
    dur: "4.0s",
    gold: false,
  },
  {
    id: "s25",
    top: "45%",
    left: "25%",
    size: 2,
    delay: "1.3s",
    dur: "3.5s",
    gold: true,
  },
  {
    id: "s26",
    top: "58%",
    left: "48%",
    size: 1,
    delay: "0.9s",
    dur: "2.6s",
    gold: false,
  },
  {
    id: "s27",
    top: "75%",
    left: "85%",
    size: 2,
    delay: "1.8s",
    dur: "3.9s",
    gold: false,
  },
  {
    id: "s28",
    top: "28%",
    left: "75%",
    size: 1,
    delay: "2.4s",
    dur: "2.8s",
    gold: false,
  },
  {
    id: "s29",
    top: "85%",
    left: "40%",
    size: 2,
    delay: "0.5s",
    dur: "4.2s",
    gold: false,
  },
  {
    id: "s30",
    top: "20%",
    left: "55%",
    size: 1,
    delay: "1.0s",
    dur: "3.0s",
    gold: true,
  },
];

interface HeroSectionProps {
  onBookNow?: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const { data: totalBookings } = useGetTotalBookingCount();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax effect on scroll — batch reads before writes
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      // Read phase — all DOM reads first
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      // Write phase — all DOM writes after reads
      const bgEl = hero.querySelector<HTMLElement>(".hero-bg-parallax");
      if (bgEl && scrollY < heroHeight) {
        bgEl.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background image layer with parallax */}
      <div className="absolute inset-0 hero-bg-parallax">
        <img
          src="/assets/generated/hero-banner.dim_1440x600.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          fetchPriority="high"
          width="1440"
          height="600"
        />
      </div>

      {/* Stars */}
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.gold
              ? "oklch(0.78 0.14 75)"
              : "oklch(0.95 0 0 / 0.8)",
            animation: `twinkle ${star.dur} ${star.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0.02 265 / 0.55) 0%, oklch(0.08 0.02 265 / 0.75) 60%, oklch(0.08 0.02 265 / 0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-24">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-cinzel text-xs tracking-[0.25em] uppercase mb-8">
          <span>✦</span>
          <span>Trusted by 500+ Clients Across Odisha</span>
          <span>✦</span>
        </div>

        {/* Main heading */}
        <h1 className="font-cinzel font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-wide">
          <span className="block">Omm Vedic</span>
          <span className="block gold-text-gradient mt-1">Numerology</span>
        </h1>

        {/* Keyword badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            "🔢 Best Numerologist in Odisha",
            "🃏 Best Tarot Card Reader",
            "✍️ Top Pronologist",
            "⌚ Expert Watch Analyst",
            "🏠 Vastu Expert",
          ].map((kw) => (
            <span
              key={kw}
              className="inline-block px-3 py-1 rounded-full text-xs font-cinzel tracking-wider bg-gold-400/10 border border-gold-400/25 text-gold-300"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Sub-heading */}
        <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-white/80 italic mb-4 max-w-2xl mx-auto leading-relaxed">
          Unlock the ancient secrets of Vedic numerology, tarot, vastu, and
          pronology
        </p>
        <p className="font-inter text-sm text-white/55 mb-10 max-w-xl mx-auto">
          Bhubaneswar&apos;s most trusted spiritual consultant · Old Town ·
          Serving all of Odisha
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={onBookNow}
            data-ocid="hero.book.primary_button"
            className="btn-gold px-10 py-4 text-base font-cinzel tracking-wider rounded"
          >
            Book Consultation · ₹400
          </button>
          <a
            href="https://wa.me/918689838590?text=I%20want%20to%20book%20a%20consultation"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.whatsapp.button"
            className="flex items-center gap-2 px-8 py-3.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white font-cinzel text-sm tracking-wider rounded transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {[
            {
              value:
                totalBookings && Number(totalBookings) > 0
                  ? `${Number(totalBookings)}+`
                  : "500+",
              label: "Happy Clients",
            },
            { value: "10+", label: "Years Experience" },
            { value: "5", label: "Sacred Services" },
            { value: "₹400", label: "Per Session" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-cinzel text-2xl font-bold text-gold">
                {stat.value}
              </div>
              <div className="font-inter text-xs text-white/40 tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-cinzel text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
