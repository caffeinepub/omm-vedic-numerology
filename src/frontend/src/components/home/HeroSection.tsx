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
    top: "7%",
    left: "55%",
    size: 2,
    delay: "2.2s",
    dur: "2.6s",
    gold: false,
  },
  {
    id: "s24",
    top: "33%",
    left: "40%",
    size: 1,
    delay: "0.3s",
    dur: "4.0s",
    gold: false,
  },
  {
    id: "s25",
    top: "47%",
    left: "18%",
    size: 2,
    delay: "1.0s",
    dur: "3.5s",
    gold: true,
  },
  {
    id: "s26",
    top: "58%",
    left: "48%",
    size: 1,
    delay: "2.4s",
    dur: "2.9s",
    gold: false,
  },
  {
    id: "s27",
    top: "75%",
    left: "30%",
    size: 2,
    delay: "0.5s",
    dur: "3.8s",
    gold: false,
  },
  {
    id: "s28",
    top: "85%",
    left: "95%",
    size: 1,
    delay: "1.3s",
    dur: "3.1s",
    gold: false,
  },
  {
    id: "s29",
    top: "95%",
    left: "8%",
    size: 2,
    delay: "2.7s",
    dur: "4.4s",
    gold: false,
  },
  {
    id: "s30",
    top: "20%",
    left: "75%",
    size: 1,
    delay: "0.6s",
    dur: "2.7s",
    gold: true,
  },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { data: totalCount, isLoading: countLoading } =
    useGetTotalBookingCount();

  // Parallax effect
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop || !bgRef.current) return;

    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      opacity: number;
      opacityDir: number;
      speed: number;
      angle: number;
      type: "orb" | "star";
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        opacity: Math.random(),
        opacityDir: Math.random() > 0.5 ? 0.005 : -0.005,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        type: Math.random() > 0.4 ? "star" : "orb",
      });
    }

    const mandalas: Array<{
      x: number;
      y: number;
      r: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }> = [];
    for (let i = 0; i < 4; i++) {
      mandalas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 60 + Math.random() * 80,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        opacity: 0.08 + Math.random() * 0.1,
      });
    }

    function drawMandala(
      cx: number,
      cy: number,
      r: number,
      rotation: number,
      opacity: number,
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "#d4a017";
      ctx.lineWidth = 0.8;

      for (let ring = 1; ring <= 3; ring++) {
        const rr = r * (ring / 3);
        ctx.beginPath();
        ctx.arc(0, 0, rr, 0, Math.PI * 2);
        ctx.stroke();

        const petals = 8 * ring;
        for (let p = 0; p < petals; p++) {
          const angle = (p / petals) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rr, Math.sin(angle) * rr);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const m of mandalas) {
        m.rotation += m.rotSpeed;
        m.x += 0.1;
        m.y -= 0.05;
        if (m.x > width + m.r) m.x = -m.r;
        if (m.y < -m.r) m.y = height + m.r;
        drawMandala(m.x, m.y, m.r, m.rotation, m.opacity);
      }

      for (const p of particles) {
        p.opacity += p.opacityDir;
        if (p.opacity >= 1 || p.opacity <= 0) p.opacityDir *= -1;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity * 0.8;

        if (p.type === "orb") {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          grad.addColorStop(0, "#ffd700");
          grad.addColorStop(0.5, "#d4a017");
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#fffde7";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const countDisplay = () => {
    if (countLoading) return null;
    if (!totalCount || totalCount === BigInt(0)) {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/50 bg-black/30 backdrop-blur-sm text-gold-300 text-sm font-medium mb-6 animate-pulse-slow">
          <span>✨</span>
          <span>Be the first to book!</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-400/60 bg-gradient-to-r from-gold-900/60 via-gold-800/40 to-gold-900/60 backdrop-blur-sm text-gold-200 text-sm font-semibold mb-6 shadow-gold">
        <span className="text-lg">✨</span>
        <span>{totalCount.toString()} Happy Clients Served</span>
        <span className="text-lg">✨</span>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ top: "-20%", height: "140%" }}
        >
          <img
            src="/assets/generated/hero-banner.dim_1440x600.png"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-950/80 via-cosmic-900/70 to-cosmic-950/90" />
      </div>

      {/* CSS Star field — subtle twinkling dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {STARS.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: star.gold ? "#d4af37" : "#ffffff",
              animation: `twinkle ${star.dur} ${star.delay} ease-in-out infinite`,
              boxShadow:
                star.size >= 2
                  ? `0 0 ${star.size * 2}px ${star.gold ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.5)"}`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-24">
        {/* Booking count badge */}
        {countDisplay()}

        <div className="mb-4">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">
            ॐ Sacred Wisdom ॐ
          </span>
        </div>

        <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-2 leading-tight">
          <span className="text-white">Omm Vedic</span>
        </h1>
        <h2 className="font-cinzel text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
            Numerloggy
          </span>
        </h2>

        <p className="text-cosmic-200 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-cormorant leading-relaxed">
          Unlock the secrets of the universe through ancient Vedic wisdom.
          Expert guidance in Tarot Card Reading, Numerology, Vastu Shastra,
          Pronology &amp; Watch Analysis.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[
            { icon: "🃏", label: "Best Tarot Card Reader" },
            { icon: "✍️", label: "Top Pronologist" },
            { icon: "⌚", label: "Expert Watch Analyst" },
            { icon: "🔮", label: "Vedic Numerologist" },
          ].map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400/30 bg-black/30 text-gold-300 text-xs font-cinzel tracking-wide"
            >
              {badge.icon} {badge.label}
            </span>
          ))}
        </div>

        <p className="text-gold-400/80 text-sm mb-10 tracking-wide">
          📍 Bhubaneswar, Odisha · Serving all of India
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={scrollToBooking}
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-cosmic-950 font-cinzel font-bold rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg transform hover:-translate-y-1 text-lg"
          >
            Book Consultation · ₹400
          </button>
          <button
            type="button"
            onClick={scrollToServices}
            className="px-8 py-4 border-2 border-gold-400/60 hover:border-gold-400 text-gold-300 hover:text-gold-200 font-cinzel font-semibold rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-gold-400/10 text-lg"
          >
            Explore Services
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-cosmic-400 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Scroll down"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
