import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ZodiacSign {
  symbol: string;
  name: string;
  sanskrit: string;
  dates: string;
  element: string;
  elementEmoji: string;
  planet: string;
  traits: string[];
  luckyNumber: number;
  numerologyConnection: string;
  color: string;
  borderColor: string;
  glowColor: string;
  cosmicMessage: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    symbol: "♈",
    name: "Aries",
    sanskrit: "मेष",
    dates: "Mar 21 – Apr 19",
    element: "Fire",
    elementEmoji: "🔥",
    planet: "Mars",
    traits: [
      "Bold & Courageous",
      "Natural Pioneer",
      "Energetic & Passionate",
      "Independent Spirit",
    ],
    luckyNumber: 9,
    numerologyConnection:
      "Ruled by Mars (9) — courage, initiation, and transformative power.",
    color: "text-red-300",
    borderColor: "border-red-400/40",
    glowColor: "rgba(248,113,113,0.2)",
    cosmicMessage:
      "Bold action taken today returns tenfold — trust your impulse and lead.",
  },
  {
    symbol: "♉",
    name: "Taurus",
    sanskrit: "वृषभ",
    dates: "Apr 20 – May 20",
    element: "Earth",
    elementEmoji: "🌿",
    planet: "Venus",
    traits: [
      "Patient & Persistent",
      "Sensual & Grounded",
      "Lover of Beauty",
      "Deeply Loyal",
    ],
    luckyNumber: 6,
    numerologyConnection:
      "Ruled by Venus (6) — beauty, love, and harmonious abundance.",
    color: "text-emerald-300",
    borderColor: "border-emerald-400/40",
    glowColor: "rgba(52,211,153,0.2)",
    cosmicMessage:
      "The universe rewards patience; your steady effort blooms into abundance.",
  },
  {
    symbol: "♊",
    name: "Gemini",
    sanskrit: "मिथुन",
    dates: "May 21 – Jun 20",
    element: "Air",
    elementEmoji: "💨",
    planet: "Mercury",
    traits: [
      "Witty & Versatile",
      "Curious Intellect",
      "Social Butterfly",
      "Adaptable",
    ],
    luckyNumber: 5,
    numerologyConnection:
      "Ruled by Mercury (5) — communication, wit, and quicksilver change.",
    color: "text-yellow-300",
    borderColor: "border-yellow-400/40",
    glowColor: "rgba(250,204,21,0.2)",
    cosmicMessage:
      "Two paths merge today — let your curiosity guide you to the right one.",
  },
  {
    symbol: "♋",
    name: "Cancer",
    sanskrit: "कर्क",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    elementEmoji: "💧",
    planet: "Moon",
    traits: [
      "Deeply Intuitive",
      "Nurturing Heart",
      "Emotionally Rich",
      "Protective",
    ],
    luckyNumber: 2,
    numerologyConnection:
      "Ruled by the Moon (2) — intuition, emotions, and sacred nurturing.",
    color: "text-blue-300",
    borderColor: "border-blue-400/40",
    glowColor: "rgba(147,197,253,0.2)",
    cosmicMessage:
      "Your deepest intuition carries a message from the cosmos — listen within.",
  },
  {
    symbol: "♌",
    name: "Leo",
    sanskrit: "सिंह",
    dates: "Jul 23 – Aug 22",
    element: "Fire",
    elementEmoji: "🔥",
    planet: "Sun",
    traits: [
      "Radiant & Majestic",
      "Natural Leader",
      "Generous Heart",
      "Creative Force",
    ],
    luckyNumber: 1,
    numerologyConnection:
      "Ruled by the Sun (1) — leadership, glory, and divine radiance.",
    color: "text-gold-300",
    borderColor: "border-gold-400/40",
    glowColor: "rgba(212,175,55,0.25)",
    cosmicMessage:
      "Your light is needed today; step forward and let your radiance inspire all.",
  },
  {
    symbol: "♍",
    name: "Virgo",
    sanskrit: "कन्या",
    dates: "Aug 23 – Sep 22",
    element: "Earth",
    elementEmoji: "🌿",
    planet: "Mercury",
    traits: [
      "Analytical & Precise",
      "Service-Oriented",
      "Health-Conscious",
      "Practical Healer",
    ],
    luckyNumber: 5,
    numerologyConnection:
      "Ruled by Mercury (5) — discernment, analysis, and sacred service.",
    color: "text-teal-300",
    borderColor: "border-teal-400/40",
    glowColor: "rgba(94,234,212,0.2)",
    cosmicMessage:
      "Sacred order brings sacred results — organize your space to clear your mind.",
  },
  {
    symbol: "♎",
    name: "Libra",
    sanskrit: "तुला",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    elementEmoji: "💨",
    planet: "Venus",
    traits: [
      "Seeker of Balance",
      "Charming Diplomat",
      "Justice & Fairness",
      "Aesthetic Soul",
    ],
    luckyNumber: 6,
    numerologyConnection:
      "Ruled by Venus (6) — harmony, partnership, and divine justice.",
    color: "text-rose-300",
    borderColor: "border-rose-400/40",
    glowColor: "rgba(251,113,133,0.2)",
    cosmicMessage:
      "Balance restored is fortune earned; seek harmony in all your interactions today.",
  },
  {
    symbol: "♏",
    name: "Scorpio",
    sanskrit: "वृश्चिक",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    elementEmoji: "💧",
    planet: "Mars & Pluto",
    traits: [
      "Intensely Perceptive",
      "Transformative Power",
      "Deeply Magnetic",
      "Fearless Truth-Seeker",
    ],
    luckyNumber: 9,
    numerologyConnection:
      "Co-ruled by Mars (9) — death, rebirth, and sacred transformation.",
    color: "text-red-400",
    borderColor: "border-red-500/40",
    glowColor: "rgba(239,68,68,0.2)",
    cosmicMessage:
      "What transforms today prepares you for a breakthrough beyond imagination.",
  },
  {
    symbol: "♐",
    name: "Sagittarius",
    sanskrit: "धनु",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    elementEmoji: "🔥",
    planet: "Jupiter",
    traits: [
      "Philosophical Explorer",
      "Freedom-Loving",
      "Eternal Optimist",
      "Seeker of Truth",
    ],
    luckyNumber: 3,
    numerologyConnection:
      "Ruled by Jupiter (3) — wisdom, expansion, and divine adventure.",
    color: "text-orange-300",
    borderColor: "border-orange-400/40",
    glowColor: "rgba(251,146,60,0.2)",
    cosmicMessage:
      "Adventure calls — the farthest horizon holds your greatest truth.",
  },
  {
    symbol: "♑",
    name: "Capricorn",
    sanskrit: "मकर",
    dates: "Dec 22 – Jan 19",
    element: "Earth",
    elementEmoji: "🌿",
    planet: "Saturn",
    traits: [
      "Disciplined & Ambitious",
      "Master of Karma",
      "Responsible Builder",
      "Patient Achiever",
    ],
    luckyNumber: 8,
    numerologyConnection:
      "Ruled by Saturn (8) — karmic mastery, discipline, and lasting achievement.",
    color: "text-slate-300",
    borderColor: "border-slate-400/40",
    glowColor: "rgba(148,163,184,0.2)",
    cosmicMessage:
      "Every disciplined step taken today is a brick in your eternal legacy.",
  },
  {
    symbol: "♒",
    name: "Aquarius",
    sanskrit: "कुम्भ",
    dates: "Jan 20 – Feb 18",
    element: "Air",
    elementEmoji: "💨",
    planet: "Saturn & Uranus",
    traits: [
      "Visionary Innovator",
      "Humanitarian Heart",
      "Eccentric Original",
      "Future-Oriented",
    ],
    luckyNumber: 4,
    numerologyConnection:
      "Co-ruled by Saturn/Rahu (4) — unconventional wisdom and radical innovation.",
    color: "text-cyan-300",
    borderColor: "border-cyan-400/40",
    glowColor: "rgba(103,232,249,0.2)",
    cosmicMessage:
      "Your unique vision is your greatest gift — dare to share it boldly today.",
  },
  {
    symbol: "♓",
    name: "Pisces",
    sanskrit: "मीन",
    dates: "Feb 19 – Mar 20",
    element: "Water",
    elementEmoji: "💧",
    planet: "Jupiter & Neptune",
    traits: [
      "Deeply Empathic",
      "Mystical Dreamer",
      "Spiritual Artist",
      "Compassionate Healer",
    ],
    luckyNumber: 3,
    numerologyConnection:
      "Co-ruled by Jupiter (3) — infinite compassion, divine imagination, and spiritual union.",
    color: "text-purple-300",
    borderColor: "border-purple-400/40",
    glowColor: "rgba(192,132,252,0.2)",
    cosmicMessage:
      "Dreams carry divine blueprints; record your visions before they fade.",
  },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function getDailyLuckyNumber(signIndex: number): number {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const seed = (dayOfYear * 7 + signIndex * 13 + now.getFullYear() * 3) % 9;
  return seed === 0 ? 9 : seed;
}

export default function ZodiacSection() {
  const [selected, setSelected] = useState<ZodiacSign | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const dayOfYear = getDayOfYear();
  const todaySign = zodiacSigns[dayOfYear % 12];
  const todaySignIndex = dayOfYear % 12;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className="py-20 px-4 relative overflow-hidden content-visibility-auto"
      data-ocid="zodiac.section"
    >
      {/* Deep cosmic gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.2 0.04 270 / 0.6) 0%, oklch(0.06 0.01 270) 70%)",
        }}
      />
      {/* Mandala-like overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold-400 font-cinzel text-xs tracking-[0.4em] uppercase block mb-3">
            Vedic Astrology
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white">
            Explore Your <span className="text-gold-400">Zodiac Sign</span>
          </h2>
          <p className="text-cosmic-300 font-cormorant text-xl mt-3 max-w-2xl mx-auto">
            The ancient Vedic seers mapped the heavens to decode your soul.
            Discover the cosmic forces written in your stars.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
        </motion.div>

        {/* ✦ TODAY'S DAILY LUCKY NUMBERS BANNER ✦ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
          data-ocid="zodiac.lucky.panel"
        >
          {/* Banner container with animated gradient border */}
          <div
            className="relative rounded-2xl p-[1.5px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.1) 40%, rgba(212,175,55,0.6) 70%, rgba(212,175,55,0.9) 100%)",
            }}
          >
            <div
              className="rounded-2xl px-5 py-6 md:px-8 md:py-7"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.1 0.03 270) 0%, oklch(0.07 0.025 260) 100%)",
              }}
            >
              {/* Title */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-gold-400/40" />
                <h3 className="font-cinzel text-base md:text-lg font-bold text-gold-400 tracking-[0.2em] uppercase text-center">
                  🔢 Today&apos;s Daily Lucky Numbers
                </h3>
                <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-gold-400/40" />
              </div>
              <p className="text-center font-cinzel text-xs text-cosmic-400 tracking-wider mb-5">
                {today}
              </p>

              {/* Horizontal scrollable row of all 12 signs */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-3 min-w-max mx-auto px-1">
                  {zodiacSigns.map((sign, i) => {
                    const dailyNum = getDailyLuckyNumber(i);
                    const isToday = i === todaySignIndex;
                    return (
                      <motion.div
                        key={sign.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isToday
                            ? "border-gold-400/70 bg-gold-400/10"
                            : "border-cosmic-700/50 bg-cosmic-900/40 hover:border-gold-400/40 hover:bg-cosmic-800/50"
                        }`}
                        style={{
                          minWidth: "72px",
                          boxShadow: isToday
                            ? "0 0 20px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1)"
                            : undefined,
                        }}
                        onClick={() => {
                          setSelected(sign);
                          setSelectedIndex(i);
                        }}
                      >
                        <span className="text-2xl leading-none">
                          {sign.symbol}
                        </span>
                        <span
                          className={`font-cinzel text-[10px] font-semibold tracking-wide ${
                            isToday ? "text-gold-300" : "text-cosmic-300"
                          }`}
                        >
                          {sign.name}
                        </span>
                        {/* Glowing lucky number */}
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-full font-cinzel text-lg font-bold text-gold-400"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.04) 100%)",
                            border: "1px solid rgba(212,175,55,0.35)",
                            textShadow:
                              "0 0 12px rgba(212,175,55,0.9), 0 0 24px rgba(212,175,55,0.5)",
                            boxShadow:
                              "0 0 10px rgba(212,175,55,0.2), inset 0 0 8px rgba(212,175,55,0.05)",
                          }}
                        >
                          {dailyNum}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer note */}
              <p className="text-center font-cinzel text-[10px] text-cosmic-500 tracking-widest uppercase mt-4">
                ✦ Numbers refresh every day at midnight ✦
              </p>
            </div>
          </div>
        </motion.div>

        {/* ✦ TODAY'S FEATURED SIGN ✦ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
          data-ocid="zodiac.featured.card"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-400/40" />
            <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-gold-400">
              ✦ Today&apos;s Featured Sign ✦
            </span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-400/40" />
          </div>

          <div
            className={`relative rounded-2xl border-2 ${todaySign.borderColor} overflow-hidden`}
            style={{
              background:
                "linear-gradient(135deg, oklch(0.13 0.025 270 / 0.97) 0%, oklch(0.09 0.02 270 / 0.99) 100%)",
              boxShadow: `0 0 60px ${todaySign.glowColor}, 0 0 120px ${todaySign.glowColor}, 0 8px 32px oklch(0 0 0 / 0.5)`,
            }}
          >
            {/* Animated shimmer top border */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, ${todaySign.glowColor.replace("0.2", "0.8").replace("0.25", "0.9")}, transparent)`,
              }}
            />

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                {/* Symbol + Name */}
                <div className="text-center md:text-left flex-shrink-0">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="text-8xl md:text-9xl leading-none mb-3"
                  >
                    {todaySign.symbol}
                  </motion.div>
                  <h3
                    className={`font-cinzel text-3xl md:text-4xl font-bold ${todaySign.color} mb-1`}
                  >
                    {todaySign.name}
                  </h3>
                  <p className="text-cosmic-300 font-cormorant text-2xl">
                    {todaySign.sanskrit}
                  </p>
                  <p className="text-cosmic-500 font-cinzel text-xs tracking-wider mt-1">
                    {todaySign.dates}
                  </p>
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  {/* Date badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 mb-5">
                    <span className="text-gold-400 text-xs">📅</span>
                    <span className="font-cinzel text-xs text-gold-300 tracking-wider">
                      {today}
                    </span>
                  </div>

                  {/* Stats grid — 4 columns now including Daily Lucky No. */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="bg-cosmic-900/60 rounded-xl p-3 text-center">
                      <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                        Element
                      </p>
                      <p className="text-cosmic-100 font-cormorant text-base">
                        {todaySign.element} {todaySign.elementEmoji}
                      </p>
                    </div>
                    <div className="bg-cosmic-900/60 rounded-xl p-3 text-center">
                      <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                        Planet
                      </p>
                      <p className="text-cosmic-100 font-cormorant text-base">
                        {todaySign.planet}
                      </p>
                    </div>
                    <div className="bg-cosmic-900/60 rounded-xl p-3 text-center">
                      <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                        Numerology No.
                      </p>
                      <p
                        className={`font-cinzel text-xl font-bold ${todaySign.color}`}
                      >
                        {todaySign.luckyNumber}
                      </p>
                    </div>
                    {/* Daily Lucky Number — highlighted */}
                    <div
                      className="rounded-xl p-3 text-center border border-gold-400/40"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 100%)",
                        boxShadow:
                          "0 0 20px rgba(212,175,55,0.15), inset 0 0 15px rgba(212,175,55,0.04)",
                      }}
                    >
                      <p className="font-cinzel text-xs text-gold-400 uppercase tracking-wider mb-1">
                        Daily Lucky No.
                      </p>
                      <p
                        className="font-cinzel text-2xl font-bold text-gold-400"
                        style={{
                          textShadow:
                            "0 0 12px rgba(212,175,55,0.9), 0 0 30px rgba(212,175,55,0.5)",
                        }}
                      >
                        {getDailyLuckyNumber(todaySignIndex)}
                      </p>
                    </div>
                  </div>

                  {/* Cosmic message */}
                  <div
                    className="rounded-xl p-4 mb-5 border border-gold-400/20"
                    style={{
                      background: `linear-gradient(135deg, ${todaySign.glowColor} 0%, oklch(0.1 0.015 270 / 0.5) 100%)`,
                    }}
                  >
                    <p className="font-cinzel text-xs text-gold-400/70 uppercase tracking-wider mb-2">
                      ✨ Today&apos;s Cosmic Message
                    </p>
                    <p className="text-cosmic-100 font-cormorant text-lg italic leading-relaxed">
                      &ldquo;{todaySign.cosmicMessage}&rdquo;
                    </p>
                  </div>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {todaySign.traits.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-cosmic-900/60 border border-cosmic-700/50 font-cormorant text-sm text-cosmic-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("booking")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="zodiac.featured.primary_button"
                    className="btn-gold px-8 py-3 rounded-xl font-cinzel text-sm tracking-widest uppercase"
                  >
                    Get Your Personal Reading · ₹400
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/20" />
          <span className="font-cinzel text-xs text-gold-400/50 tracking-[0.3em] uppercase">
            All 12 Signs
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/20" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {zodiacSigns.map((sign, i) => {
            const isToday = sign.name === todaySign.name;
            const dailyLucky = getDailyLuckyNumber(i);
            return (
              <motion.button
                key={sign.name}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  setSelected(sign);
                  setSelectedIndex(i);
                }}
                data-ocid={`zodiac.item.${i + 1}`}
                className={`group relative rounded-xl border ${
                  isToday
                    ? `border-2 ${sign.borderColor.replace("/40", "/80")}`
                    : sign.borderColor
                } bg-cosmic-900/60 backdrop-blur-sm p-5 text-center cursor-pointer transition-all duration-300 hover:bg-cosmic-800/60`}
                style={{
                  boxShadow: isToday
                    ? `0 0 25px ${sign.glowColor}, 0 0 50px ${sign.glowColor}`
                    : "0 0 0 transparent",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 25px ${sign.glowColor}, 0 0 50px ${sign.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = isToday
                    ? `0 0 25px ${sign.glowColor}, 0 0 50px ${sign.glowColor}`
                    : "0 0 0 transparent";
                }}
              >
                {isToday && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-400 text-cosmic-950 font-cinzel text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase">
                      Today
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-2 leading-none">{sign.symbol}</div>
                <h3 className={`font-cinzel font-bold text-base ${sign.color}`}>
                  {sign.name}
                </h3>
                <p className="text-cosmic-400 text-lg font-cormorant leading-none mb-1">
                  {sign.sanskrit}
                </p>
                <p className="text-cosmic-500 font-cinzel text-[10px] tracking-wider">
                  {sign.dates}
                </p>
                <div className="mt-2 text-xs font-cormorant text-cosmic-400">
                  {sign.element} {sign.elementEmoji}
                </div>
                {/* Daily Lucky Number badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gold-400/35 bg-gold-400/8">
                  <span className="text-[11px]">🍀</span>
                  <span className="font-cinzel text-[11px] text-cosmic-400">
                    Lucky:
                  </span>
                  <span
                    className="font-cinzel text-sm font-bold text-gold-400"
                    style={{
                      textShadow:
                        "0 0 8px rgba(212,175,55,0.8), 0 0 16px rgba(212,175,55,0.4)",
                    }}
                  >
                    {dailyLucky}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-950/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
            data-ocid="zodiac.modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-md w-full rounded-2xl border ${selected.borderColor} bg-gradient-to-br from-cosmic-900 to-cosmic-950 p-8 overflow-y-auto max-h-[90vh]`}
              style={{
                boxShadow: `0 0 60px ${selected.glowColor}, 0 0 100px ${selected.glowColor}`,
              }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                data-ocid="zodiac.close_button"
                className="absolute top-4 right-4 text-cosmic-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="text-6xl mb-2">{selected.symbol}</div>
                <h3
                  className={`font-cinzel text-2xl font-bold ${selected.color}`}
                >
                  {selected.name}
                </h3>
                <p className="text-cosmic-400 text-2xl font-cormorant">
                  {selected.sanskrit}
                </p>
                <p className="text-cosmic-500 font-cinzel text-xs tracking-wider mt-1">
                  {selected.dates}
                </p>
              </div>

              {/* Daily Lucky Number — prominent in modal */}
              <div
                className="rounded-xl p-4 mb-5 border border-gold-400/50 text-center"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.03) 100%)",
                  boxShadow:
                    "0 0 30px rgba(212,175,55,0.12), inset 0 0 20px rgba(212,175,55,0.04)",
                }}
              >
                <p className="font-cinzel text-xs text-gold-400 uppercase tracking-[0.3em] mb-2">
                  🍀 Today&apos;s Lucky Number
                </p>
                <p
                  className="font-cinzel text-5xl font-bold text-gold-400"
                  style={{
                    textShadow:
                      "0 0 20px rgba(212,175,55,1), 0 0 40px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)",
                  }}
                >
                  {getDailyLuckyNumber(selectedIndex)}
                </p>
                <p className="font-cinzel text-[10px] text-cosmic-500 tracking-wider mt-2 uppercase">
                  Refreshes daily at midnight
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-cosmic-900/60 rounded-lg p-3 text-center">
                  <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                    Element
                  </p>
                  <p className="text-cosmic-100 font-cormorant text-base">
                    {selected.element} {selected.elementEmoji}
                  </p>
                </div>
                <div className="bg-cosmic-900/60 rounded-lg p-3 text-center">
                  <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                    Ruling Planet
                  </p>
                  <p className="text-cosmic-100 font-cormorant text-base">
                    {selected.planet}
                  </p>
                </div>
                <div className="bg-cosmic-900/60 rounded-lg p-3 text-center">
                  <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                    Numerology No.
                  </p>
                  <p
                    className={`font-cinzel text-xl font-bold ${selected.color}`}
                  >
                    {selected.luckyNumber}
                  </p>
                </div>
                <div className="bg-cosmic-900/60 rounded-lg p-3 text-center">
                  <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                    Personality
                  </p>
                  <p className="text-cosmic-100 font-cormorant text-sm">
                    {selected.traits[0]}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-2">
                  Key Traits
                </p>
                <div className="space-y-1">
                  {selected.traits.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${selected.color.replace("text-", "bg-")} flex-shrink-0`}
                      />
                      <span className="text-cosmic-200 font-cormorant text-base">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gold-400/5 border border-gold-400/20 rounded-lg p-3 mb-4">
                <p className="font-cinzel text-xs text-gold-400/70 uppercase tracking-wider mb-1">
                  Numerology Connection
                </p>
                <p className="text-cosmic-200 font-cormorant text-sm italic">
                  {selected.numerologyConnection}
                </p>
              </div>

              <div className="bg-cosmic-900/60 border border-cosmic-700/40 rounded-lg p-3 mb-5">
                <p className="font-cinzel text-xs text-gold-400/70 uppercase tracking-wider mb-1">
                  ✨ Cosmic Message
                </p>
                <p className="text-cosmic-200 font-cormorant text-sm italic">
                  &ldquo;{selected.cosmicMessage}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setTimeout(
                    () =>
                      document
                        .getElementById("booking")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    100,
                  );
                }}
                data-ocid="zodiac.primary_button"
                className="btn-gold w-full block text-center py-3 rounded-lg font-cinzel text-xs tracking-widest uppercase"
              >
                Get Personal Reading · ₹400
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
