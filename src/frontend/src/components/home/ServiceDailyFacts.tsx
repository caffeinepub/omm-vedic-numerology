import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

interface ServiceData {
  id: string;
  label: string;
  icon: string;
  color: string;
  borderColor: string;
  glowColor: string;
  facts: string[];
}

const services: ServiceData[] = [
  {
    id: "tarot",
    label: "Tarot Card Reading",
    icon: "🃏",
    color: "text-purple-300",
    borderColor: "border-purple-400/50",
    glowColor: "rgba(168,85,247,0.25)",
    facts: [
      "The Major Arcana's 22 cards map the soul's complete journey from innocence (The Fool) to mastery (The World).",
      "The Death card never means physical death — it signifies powerful transformation and the end of old cycles.",
      "Tarot originated in 15th-century northern Italy as playing cards before becoming divination tools in the 18th century.",
      "The High Priestess represents your inner knowing — when she appears, trust your intuition over logic.",
      "There are 78 cards in a tarot deck: 22 Major Arcana and 56 Minor Arcana across four suits.",
      "The Chariot card signals victory through willpower — your determination will overcome any obstacle today.",
      "Reversed cards in tarot show blocked energy or an internalized version of the card's meaning.",
      "The Tower card is not bad luck — it reveals false structures that must fall to build something true.",
      "The Empress card represents fertility, abundance, and the creative power of the divine feminine.",
      "Your birth card (Life Path reduced to Major Arcana number) reveals your soul's deepest lesson this lifetime.",
    ],
  },
  {
    id: "numerology",
    label: "Numerology",
    icon: "🔢",
    color: "text-gold-300",
    borderColor: "border-gold-400/50",
    glowColor: "rgba(212,175,55,0.25)",
    facts: [
      "Pythagoras, the father of mathematics, believed numbers were the essence of all reality and divine order.",
      "Your Life Path number is the most important number in Vedic numerology — it defines your soul's mission.",
      "Master numbers 11, 22, and 33 carry double power and double responsibility — they are never reduced.",
      "The number 8 turned sideways becomes infinity (∞) — in numerology it represents limitless karmic potential.",
      "Your personal year number cycles from 1 to 9, each bringing a distinct theme to navigate each year.",
      "In Vedic numerology, every planet rules a number: Sun=1, Moon=2, Jupiter=3, Rahu=4, Mercury=5, Venus=6, Ketu=7, Saturn=8, Mars=9.",
      "Name numerology calculates the vibration of your full birth name to reveal your natural talents and destiny.",
      "The number 9 is universal — multiply any number by 9 and reduce the digits; you always return to 9.",
      "Chaldean numerology (4000+ years old) is considered more accurate than Pythagorean by Vedic practitioners.",
      "Your soul urge number, derived from the vowels in your name, reveals your deepest heart's desire.",
    ],
  },
  {
    id: "vastu",
    label: "Vastu Shastra",
    icon: "🏠",
    color: "text-emerald-300",
    borderColor: "border-emerald-400/50",
    glowColor: "rgba(52,211,153,0.25)",
    facts: [
      "Vastu Shastra is over 5,000 years old and is mentioned in the Vedas, Puranas, and Mahabharata.",
      "The northeast direction (Ishan) is the most sacred — it should be open, light, and free of heavy objects.",
      "Sleeping with your head pointing south aligns your body with Earth's magnetic field for deeper, healing sleep.",
      "A kitchen in the southeast (Agni corner) aligns with fire energy, bringing prosperity and digestive health.",
      "The Brahmasthan (center of home) must remain open and uncluttered — it is the energy heart of your space.",
      "Running water features like fountains in the north or northeast attract financial abundance per Vastu principles.",
      "Vastu-compliant homes reduce stress, improve relationships, and amplify positive cosmic energy flow.",
      "The main entrance should face north, northeast, or east to welcome the sun's life-giving morning energy.",
      "Purple or violet in the south corner of your office activates fame and recognition energies.",
      "Salt water bowls placed in corners absorb negative energies — replace them every 48 hours for maximum effect.",
    ],
  },
  {
    id: "pronology",
    label: "Pronology",
    icon: "🔤",
    color: "text-cyan-300",
    borderColor: "border-cyan-400/50",
    glowColor: "rgba(34,211,238,0.25)",
    facts: [
      "Pronology is the advanced Vedic science of sound vibrations in names and how they shape your destiny.",
      "Every letter in your name carries a unique cosmic frequency that either harmonizes or conflicts with your birth number.",
      "Changing a single letter in your name can shift your numerological vibration and alter the course of your life.",
      "Ancient Sanskrit scholars understood that sound (Naad) was the first creation — Pronology honors this truth.",
      "A name correction in Pronology aligns your identity's vibration with your Life Path for maximum harmony.",
      "Business names corrected through Pronology have shown measurable improvements in success and cash flow.",
      "In Pronology, vowels carry soul energy while consonants carry physical world energy in your name's frequency.",
      "The founder's name vibration directly influences a company's market performance according to Pronology principles.",
      "Children named with Pronology-corrected names tend to face fewer obstacles and achieve goals more naturally.",
      "Even pronunciation matters in Pronology — how others speak your name affects the vibrations you receive daily.",
    ],
  },
  {
    id: "watch",
    label: "Expert Watch Analysis",
    icon: "⌚",
    color: "text-amber-300",
    borderColor: "border-amber-400/50",
    glowColor: "rgba(251,191,36,0.25)",
    facts: [
      "In Vedic numerology, your watch number should vibrate harmoniously with your Life Path for maximum luck.",
      "The numbers on your watch face interact with your personal aura — a misaligned watch can drain your energy.",
      "Gifting a watch is considered auspicious in many cultures — choose a number that aligns with the recipient's Mulank.",
      "Watch number 8 worn by a Life Path 8 person can amplify ambition but may also intensify karmic lessons.",
      "Luxury watches with serial numbers ending in your lucky number are said to bring accelerated success.",
      "A watch worn on the left wrist receives energy; on the right wrist it projects energy — choose wisely.",
      "The time you look at your watch most frequently carries a numerological message from the universe for you.",
      "Antique watches carry the energetic imprints of previous owners — have them analyzed before wearing.",
      "The shape of a watch face also carries energy: circular (Moon), square (Saturn), oval (Venus).",
      "Watch gifting on auspicious dates multiplied by the right number creates lasting prosperity for the recipient.",
    ],
  },
];

export default function ServiceDailyFacts() {
  const dayOfYear = getDayOfYear();
  const [activeTab, setActiveTab] = useState(0);

  const activeService = services[activeTab];
  const todayFact = activeService.facts[dayOfYear % activeService.facts.length];
  const factIndex = (dayOfYear % activeService.facts.length) + 1;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className="py-16 px-4 relative overflow-hidden"
      data-ocid="service_facts.section"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.08 0.015 270) 0%, oklch(0.06 0.01 270) 100%)",
      }}
    >
      {/* Subtle starfield dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.85 0.18 85) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-gold-400 font-cinzel text-xs tracking-[0.4em] uppercase block mb-3">
            Sacred Knowledge · Refreshes Daily
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white">
            Today&apos;s <span className="text-gold-400">Cosmic Fact</span>
          </h2>
          <p className="text-cosmic-400 font-cormorant text-lg mt-2 italic">
            {today}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Service Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          data-ocid="service_facts.tab"
        >
          {services.map((svc, i) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => setActiveTab(i)}
              data-ocid={`service_facts.tab.${i + 1}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-xs tracking-wider uppercase transition-all duration-300 border ${
                activeTab === i
                  ? "bg-gold-400/20 border-gold-400/60 text-gold-300 shadow-lg"
                  : "bg-cosmic-900/40 border-cosmic-700/50 text-cosmic-400 hover:border-gold-400/30 hover:text-cosmic-200"
              }`}
              style={{
                boxShadow:
                  activeTab === i ? `0 0 16px ${svc.glowColor}` : "none",
              }}
            >
              <span className="text-base">{svc.icon}</span>
              <span className="hidden sm:inline">{svc.label}</span>
            </button>
          ))}
        </div>

        {/* Fact Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`relative rounded-2xl border ${activeService.borderColor} overflow-hidden`}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.12 0.02 270 / 0.95) 0%, oklch(0.09 0.015 270 / 0.98) 100%)",
                boxShadow: `0 0 40px ${activeService.glowColor}, 0 4px 24px oklch(0 0 0 / 0.4)`,
              }}
            >
              {/* Top badge strip */}
              <div
                className="flex items-center justify-between px-6 py-3 border-b border-white/5"
                style={{
                  background: `linear-gradient(90deg, ${activeService.glowColor} 0%, transparent 100%)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeService.icon}</span>
                  <span
                    className={`font-cinzel text-xs tracking-[0.3em] uppercase ${activeService.color}`}
                  >
                    {activeService.label}
                  </span>
                </div>
                <span className="font-cinzel text-xs text-cosmic-500">
                  Day {factIndex} of {activeService.facts.length}
                </span>
              </div>

              {/* Fact content */}
              <div className="p-8 md:p-10 text-center">
                <div className="text-4xl mb-6">{activeService.icon}</div>

                <blockquote
                  className="font-cormorant text-xl md:text-2xl text-cosmic-100 leading-relaxed italic"
                  data-ocid="service_facts.panel"
                >
                  &ldquo;{todayFact}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/40" />
                  <span className="text-gold-400/60 text-xs font-cinzel tracking-widest">
                    ✦ ॐ ✦
                  </span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/40" />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <p className="text-cosmic-500 text-xs font-cinzel tracking-wide">
                    Refreshes tomorrow with a new sacred insight
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("booking")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="service_facts.primary_button"
                    className="btn-gold px-6 py-2 rounded-full font-cinzel text-xs tracking-widest uppercase whitespace-nowrap"
                  >
                    Learn More · Book ₹400
                  </button>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-30">
                {activeService.facts.map((_fact, fi) => (
                  <div
                    key={`dot-${activeService.id}-${fi}`}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      fi === factIndex - 1
                        ? `${activeService.color.replace("text-", "bg-")} opacity-100`
                        : "bg-cosmic-600 opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile label under tabs */}
        <p className="sm:hidden text-center text-cosmic-500 font-cinzel text-xs mt-4 tracking-wider">
          Tap a service to see today&apos;s fact
        </p>
      </div>
    </section>
  );
}
