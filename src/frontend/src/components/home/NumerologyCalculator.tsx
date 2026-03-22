import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface LifePathInfo {
  name: string;
  planet: string;
  planetEmoji: string;
  traits: string[];
  luckyColors: string[];
  compatible: number[];
  description: string;
}

interface MulankInfo {
  name: string;
  planet: string;
  planetEmoji: string;
  benefits: string[];
  luckyColors: string[];
  luckyDays: string;
  gemstone: string;
  description: string;
}

interface BhagyankInfo {
  name: string;
  planet: string;
  planetEmoji: string;
  description: string;
  benefits: string[];
  luckyColors: string[];
  destinyTheme: string;
}

const lifePathData: Record<number, LifePathInfo> = {
  1: {
    name: "The Leader",
    planet: "Sun (Surya)",
    planetEmoji: "☀️",
    traits: [
      "Natural-born leader",
      "Independent & pioneering",
      "Courageous innovator",
      "Strong willpower",
    ],
    luckyColors: ["Golden Yellow", "Orange", "Bright Red"],
    compatible: [1, 3, 5, 9],
    description:
      "You carry the solar energy of courage and originality. Destined to lead, you forge new paths with confidence and inspire all who follow.",
  },
  2: {
    name: "The Peacemaker",
    planet: "Moon (Chandra)",
    planetEmoji: "🌙",
    traits: [
      "Highly intuitive & empathetic",
      "Diplomatic mediator",
      "Sensitive & nurturing",
      "Seeks harmony",
    ],
    luckyColors: ["White", "Silver", "Soft Blue"],
    compatible: [2, 4, 6, 8],
    description:
      "Blessed with lunar sensitivity, you bridge worlds with grace. Your gift is harmony — in relationships, in work, in spirit.",
  },
  3: {
    name: "The Creative Soul",
    planet: "Jupiter (Guru)",
    planetEmoji: "✨",
    traits: [
      "Highly creative & expressive",
      "Joyful & optimistic",
      "Gifted communicator",
      "Magnetic charisma",
    ],
    luckyColors: ["Yellow", "Violet", "Purple"],
    compatible: [1, 3, 5, 9],
    description:
      "Jupiter blesses you with abundance and creative fire. Your voice, your art, your ideas — they carry divine inspiration that uplifts the world.",
  },
  4: {
    name: "The Builder",
    planet: "Rahu (North Node)",
    planetEmoji: "🏛️",
    traits: [
      "Disciplined & hard-working",
      "Practical visionary",
      "Reliable foundation-builder",
      "Methodical thinker",
    ],
    luckyColors: ["Blue", "Grey", "Dark Green"],
    compatible: [2, 4, 6, 8],
    description:
      "You build what lasts. Through patience and systematic effort, you create structures — physical, spiritual, and relational — that stand the test of time.",
  },
  5: {
    name: "The Freedom Seeker",
    planet: "Mercury (Budha)",
    planetEmoji: "💫",
    traits: [
      "Adventurous & versatile",
      "Quick intellectual mind",
      "Charismatic communicator",
      "Craves freedom",
    ],
    luckyColors: ["Light Green", "Sky Blue", "White"],
    compatible: [1, 3, 5, 7],
    description:
      "Mercury gifts you a quicksilver mind and restless spirit. You thrive in change, embrace diversity, and inspire others to break free from limitation.",
  },
  6: {
    name: "The Nurturer",
    planet: "Venus (Shukra)",
    planetEmoji: "💖",
    traits: [
      "Deeply loving & compassionate",
      "Responsible caretaker",
      "Artistic & aesthetically gifted",
      "Seeks beauty & balance",
    ],
    luckyColors: ["Rose Pink", "Indigo", "Turquoise"],
    compatible: [2, 4, 6, 9],
    description:
      "Venus blesses you with the gift of love and beauty. You heal through care, create through artistry, and build communities of warmth and belonging.",
  },
  7: {
    name: "The Mystic",
    planet: "Ketu (South Node)",
    planetEmoji: "🔮",
    traits: [
      "Deeply analytical & introspective",
      "Spiritual seeker",
      "Gifted researcher",
      "Philosophical wisdom",
    ],
    luckyColors: ["Violet", "Indigo", "Deep Purple"],
    compatible: [1, 3, 5, 7],
    description:
      "Ketu draws you into the veiled mysteries of existence. You are the seeker, the sage — your journey is inward, and your discoveries illuminate the world.",
  },
  8: {
    name: "The Powerhouse",
    planet: "Saturn (Shani)",
    planetEmoji: "⚖️",
    traits: [
      "Ambitious & goal-oriented",
      "Strong executive ability",
      "Master of manifestation",
      "Karmic wisdom",
    ],
    luckyColors: ["Black", "Dark Blue", "Charcoal Grey"],
    compatible: [2, 4, 6, 8],
    description:
      "Saturn tests you to forge your greatest power. Through discipline and perseverance, you master the material world and accumulate wisdom that commands respect.",
  },
  9: {
    name: "The Humanitarian",
    planet: "Mars (Mangal)",
    planetEmoji: "🌟",
    traits: [
      "Deeply compassionate",
      "Idealistic visionary",
      "Powerful healer",
      "Selfless & generous",
    ],
    luckyColors: ["Red", "Gold", "Crimson"],
    compatible: [1, 3, 6, 9],
    description:
      "Mars grants you fierce compassion and the power to transform. You complete cycles, serve humanity, and leave every situation better than you found it.",
  },
  11: {
    name: "The Spiritual Messenger",
    planet: "Moon + Sun",
    planetEmoji: "🌠",
    traits: [
      "Master intuition & psychic gifts",
      "Inspirational visionary",
      "Highly sensitive",
      "Spiritual illuminator",
    ],
    luckyColors: ["Platinum", "Silver", "Luminous White"],
    compatible: [2, 3, 11, 22],
    description:
      "11 is a Master Number — you carry the vibration of enlightened illumination. Your presence itself inspires, and your intuitive gifts can guide many souls to their truth.",
  },
  22: {
    name: "The Master Builder",
    planet: "Uranus + Saturn",
    planetEmoji: "🏗️",
    traits: [
      "Monumental vision",
      "Practical mystic",
      "Creates for humanity",
      "Master of manifestation",
    ],
    luckyColors: ["Gold", "Burnt Orange", "Royal Blue"],
    compatible: [4, 11, 22, 33],
    description:
      "22 is the most powerful Master Number. You are destined to build lasting institutions, movements, and systems that serve humanity for generations to come.",
  },
  33: {
    name: "The Master Teacher",
    planet: "Venus + Jupiter",
    planetEmoji: "🕉️",
    traits: [
      "Supreme compassionate healer",
      "Universal teacher",
      "Divine love embodied",
      "Spiritual mastery",
    ],
    luckyColors: ["Gold", "Crimson", "Violet"],
    compatible: [6, 11, 22, 33],
    description:
      "33 is the rarest Master Number — the Christ vibration. You are called to embody unconditional love and teach by living as a shining example of divine grace.",
  },
};

const mulankData: Record<number, MulankInfo> = {
  1: {
    name: "The Sun Child",
    planet: "Sun (Surya)",
    planetEmoji: "☀️",
    benefits: [
      "Natural authority and leadership qualities",
      "Excellent at starting new ventures and projects",
      "Gains name, fame and recognition easily",
      "Strong willpower overcomes all obstacles",
      "Success in government, politics, and administration",
      "Attracts wealth through independent endeavors",
    ],
    luckyColors: ["Gold", "Orange", "Bright Yellow"],
    luckyDays: "Sundays & Mondays",
    gemstone: "Ruby (Manik)",
    description:
      "Born under the Sun's radiance, you are meant to shine. The Mulank 1 blesses you with the energy to initiate, lead, and conquer. Your presence commands respect and your ambitions know no bounds.",
  },
  2: {
    name: "The Moon's Child",
    planet: "Moon (Chandra)",
    planetEmoji: "🌙",
    benefits: [
      "Exceptional emotional intelligence and empathy",
      "Natural talent in creative arts and music",
      "Strong intuition guides wise decisions",
      "Builds deep, lasting relationships",
      "Success in healing, counseling, and social work",
      "Blessed with inner peace and contentment",
    ],
    luckyColors: ["White", "Pearl", "Silver", "Soft Blue"],
    luckyDays: "Mondays & Fridays",
    gemstone: "Pearl (Moti)",
    description:
      "The Moon governs your soul. Your Mulank 2 brings the gifts of intuition, compassion, and gentle power. Like the moon that influences tides, your subtle influence shapes the world around you profoundly.",
  },
  3: {
    name: "Jupiter's Blessed Child",
    planet: "Jupiter (Guru)",
    planetEmoji: "✨",
    benefits: [
      "Exceptional communication and oratory skills",
      "Natural abundance and financial luck",
      "Talent in writing, teaching, and performing arts",
      "Joyful personality attracts positive opportunities",
      "Strong spiritual inclination and wisdom",
      "Success through creativity and self-expression",
    ],
    luckyColors: ["Yellow", "Golden", "Purple"],
    luckyDays: "Thursdays & Tuesdays",
    gemstone: "Yellow Sapphire (Pukhraj)",
    description:
      "Jupiter's blessings fill your life with joy, abundance, and wisdom. Mulank 3 individuals are natural communicators who inspire others. Your optimism and creativity open doors that remain closed for others.",
  },
  4: {
    name: "Rahu's Earthly Warrior",
    planet: "Rahu (North Node)",
    planetEmoji: "🏛️",
    benefits: [
      "Unmatched discipline and hard-working nature",
      "Excellence in building systems and structures",
      "Practical problem-solving abilities",
      "Trustworthy and dependable in all commitments",
      "Success through persistence and consistency",
      "Ability to achieve what others consider impossible",
    ],
    luckyColors: ["Blue", "Grey", "Dark Green", "Brown"],
    luckyDays: "Saturdays & Sundays",
    gemstone: "Hessonite (Gomed)",
    description:
      "Rahu grants you unconventional wisdom and extraordinary resilience. Mulank 4 individuals achieve great heights through sheer determination. You build lasting legacies that outlive generations.",
  },
  5: {
    name: "Mercury's Swift Soul",
    planet: "Mercury (Budha)",
    planetEmoji: "💫",
    benefits: [
      "Brilliant analytical and intellectual abilities",
      "Exceptional business acumen and trading skills",
      "Adaptability thrives in any situation",
      "Magnetic personality draws people and wealth",
      "Success in media, communication, and technology",
      "Quick recovery from setbacks and challenges",
    ],
    luckyColors: ["Green", "Light Blue", "White"],
    luckyDays: "Wednesdays & Fridays",
    gemstone: "Emerald (Panna)",
    description:
      "Mercury blesses you with a razor-sharp mind and quicksilver adaptability. Mulank 5 individuals excel in business, communication, and intellectual pursuits. Your versatility is your greatest superpower.",
  },
  6: {
    name: "Venus's Beloved Child",
    planet: "Venus (Shukra)",
    planetEmoji: "💖",
    benefits: [
      "Natural magnetism and physical attractiveness",
      "Exceptional artistic and creative talents",
      "Blessed with harmonious and loving relationships",
      "Financial abundance through beauty and arts",
      "Success in luxury, fashion, and hospitality",
      "Healing energy that comforts those around you",
    ],
    luckyColors: ["Pink", "Rose", "Indigo", "Turquoise"],
    luckyDays: "Fridays & Wednesdays",
    gemstone: "Diamond (Heera) or White Sapphire",
    description:
      "Venus bestows beauty, love, and abundance upon you. Mulank 6 individuals radiate warmth and attract love effortlessly. Your home is a sanctuary of beauty and your relationships are your greatest treasures.",
  },
  7: {
    name: "Ketu's Spiritual Sage",
    planet: "Ketu (South Node)",
    planetEmoji: "🔮",
    benefits: [
      "Deep spiritual wisdom and metaphysical insight",
      "Outstanding research and analytical abilities",
      "Strong psychic intuition and foresight",
      "Success in philosophy, spirituality, and sciences",
      "Natural healer and guide for others",
      "Ability to uncover hidden truths and secrets",
    ],
    luckyColors: ["Violet", "Indigo", "White", "Grey"],
    luckyDays: "Mondays & Sundays",
    gemstone: "Cat's Eye (Lehsunia)",
    description:
      "Ketu awakens your mystical nature. Mulank 7 individuals are born seekers of truth with powerful intuitive gifts. You see through illusions, access hidden knowledge, and your wisdom becomes a guiding light for many.",
  },
  8: {
    name: "Saturn's Disciplined Master",
    planet: "Saturn (Shani)",
    planetEmoji: "⚖️",
    benefits: [
      "Extraordinary capacity for hard work and perseverance",
      "Powerful manifestation abilities for wealth",
      "Strong sense of justice and moral authority",
      "Success in law, finance, and real estate",
      "Overcomes the greatest challenges triumphantly",
      "Karmic rewards multiply with righteous action",
    ],
    luckyColors: ["Black", "Dark Blue", "Dark Brown"],
    luckyDays: "Saturdays & Wednesdays",
    gemstone: "Blue Sapphire (Neelam)",
    description:
      "Saturn's energy makes you one of the most powerful numbers in numerology. Mulank 8 individuals face great trials but earn even greater rewards. Your karma is strong — live righteously and wealth, authority, and respect follow.",
  },
  9: {
    name: "Mars's Fearless Warrior",
    planet: "Mars (Mangal)",
    planetEmoji: "🌟",
    benefits: [
      "Courageous and fearless in all pursuits",
      "Passionate drive that achieves extraordinary goals",
      "Natural humanitarian and healer of society",
      "Success in armed forces, sports, and surgery",
      "Blessed with the number of completion and wisdom",
      "Powerful transformative energy heals communities",
    ],
    luckyColors: ["Red", "Gold", "Crimson", "Orange"],
    luckyDays: "Tuesdays & Thursdays",
    gemstone: "Red Coral (Moonga)",
    description:
      "Mars grants you the warrior's fire and the healer's heart. Mulank 9 is the most complete number — you have experienced all life has to offer and your wisdom serves humanity. Your courage inspires entire generations.",
  },
};

const bhagyankData: Record<number, BhagyankInfo> = {
  1: {
    name: "Destiny of the Trailblazer",
    planet: "Sun (Surya)",
    planetEmoji: "☀️",
    destinyTheme: "Leadership & Innovation",
    description:
      "Your destiny calls you to be first — to pioneer, to lead, to create. The universe has written a path of independence and achievement into your soul. You are here to make your unique mark on the world.",
    benefits: [
      "Destined for recognition, authority, and fame",
      "Fortune favors bold, independent decisions",
      "Career success through originality and initiative",
      "Karmic path: become a beacon of inspiration for others",
    ],
    luckyColors: ["Gold", "Sunrise Orange", "Bright White"],
  },
  2: {
    name: "Destiny of the Harmonizer",
    planet: "Moon (Chandra)",
    planetEmoji: "🌙",
    destinyTheme: "Cooperation & Sensitivity",
    description:
      "Your fate is woven through relationship and balance. You are meant to bridge, to heal, to unite. The highest expression of your destiny is building peace wherever you go — in family, society, and spirit.",
    benefits: [
      "Destined to build bridges and heal divisions",
      "Intuitive gifts guide you through life's crossroads",
      "Fortune comes through partnerships and collaboration",
      "Karmic path: embody compassion in every interaction",
    ],
    luckyColors: ["Pearl White", "Silver", "Ocean Blue"],
  },
  3: {
    name: "Destiny of the Creator",
    planet: "Jupiter (Guru)",
    planetEmoji: "✨",
    destinyTheme: "Expression & Joy",
    description:
      "You are destined to express, to create, to inspire joy. The cosmos has gifted you with creative fire and the magnetic ability to uplift others through your words, art, and presence. Your destiny shines bright.",
    benefits: [
      "Destined for creative success and public recognition",
      "Fortune multiplies when you express yourself freely",
      "Natural magnetism draws abundance and opportunity",
      "Karmic path: share your gifts to light up the world",
    ],
    luckyColors: ["Bright Yellow", "Lavender", "Golden"],
  },
  4: {
    name: "Destiny of the Architect",
    planet: "Rahu (North Node)",
    planetEmoji: "🏛️",
    destinyTheme: "Structure & Legacy",
    description:
      "Your destiny is to build — systems, families, institutions, and legacies. The universe has placed you here to create order from chaos, to lay foundations that generations will stand upon. You are the cosmic architect.",
    benefits: [
      "Destined to create lasting, generational achievements",
      "Fortune rewards discipline and consistent effort",
      "Karmic gifts: stability, trustworthiness, endurance",
      "Karmic path: be the unshakeable foundation others rely on",
    ],
    luckyColors: ["Forest Green", "Navy Blue", "Earthy Brown"],
  },
  5: {
    name: "Destiny of the Explorer",
    planet: "Mercury (Budha)",
    planetEmoji: "💫",
    destinyTheme: "Freedom & Transformation",
    description:
      "Change is your destiny. You are meant to explore every horizon — physical, intellectual, spiritual. The cosmos has given you wings; your purpose is to travel far and bring back wisdom that transforms those around you.",
    benefits: [
      "Destined for multi-faceted success across many fields",
      "Fortune comes through embracing change and adventure",
      "Natural adaptability turns every challenge into opportunity",
      "Karmic path: be the catalyst for positive transformation",
    ],
    luckyColors: ["Turquoise", "Electric Blue", "Bright Green"],
  },
  6: {
    name: "Destiny of the Healer",
    planet: "Venus (Shukra)",
    planetEmoji: "💖",
    destinyTheme: "Love, Service & Beauty",
    description:
      "Love is your destiny and your weapon. The universe has destined you to serve — through healing, through beauty, through devotion. Where others see problems, you bring harmony; where there is pain, you bring grace.",
    benefits: [
      "Destined for deep love, family harmony, and respect",
      "Fortune grows through service and acts of kindness",
      "Creative and healing talents attract abundance",
      "Karmic path: be a vessel of unconditional love",
    ],
    luckyColors: ["Rose Gold", "Soft Pink", "Teal"],
  },
  7: {
    name: "Destiny of the Sage",
    planet: "Ketu (South Node)",
    planetEmoji: "🔮",
    destinyTheme: "Wisdom & Spiritual Mastery",
    description:
      "You are destined for profound inner wisdom. The cosmos has set you on a path of spiritual discovery and deep understanding. Your soul carries ancient knowledge — your destiny is to access it, refine it, and share its light.",
    benefits: [
      "Destined for mastery in spiritual and esoteric sciences",
      "Fortune comes through solitude, study, and inner work",
      "Psychic gifts deepen with age and inner cultivation",
      "Karmic path: become a lamp of wisdom in a dark world",
    ],
    luckyColors: ["Deep Purple", "Midnight Blue", "Silver"],
  },
  8: {
    name: "Destiny of the Sovereign",
    planet: "Saturn (Shani)",
    planetEmoji: "⚖️",
    destinyTheme: "Power, Wealth & Justice",
    description:
      "Power and material mastery are written in your destiny. Saturn tests fiercely but rewards royally. You are destined to rise through every trial to command authority, accumulate wealth, and stand as a pillar of karmic justice.",
    benefits: [
      "Destined for financial sovereignty and worldly authority",
      "Fortune magnifies after age 35 — your best years lie ahead",
      "Karmic rewards come to those who act with integrity",
      "Karmic path: wield power with wisdom and righteousness",
    ],
    luckyColors: ["Midnight Black", "Royal Blue", "Iron Grey"],
  },
  9: {
    name: "Destiny of the Enlightened",
    planet: "Mars (Mangal)",
    planetEmoji: "🌟",
    destinyTheme: "Completion, Compassion & Universal Service",
    description:
      "You are the culmination of all numbers. Your destiny is the highest — to serve humanity, to complete what others begin, to love unconditionally. The universe has chosen you to be an agent of divine completion and transformation.",
    benefits: [
      "Destined to touch and transform countless lives",
      "Fortune comes through letting go and trusting the universe",
      "All nine numbers flow through you — infinite inner resource",
      "Karmic path: give without expectation and receive everything",
    ],
    luckyColors: ["Crimson", "Golden White", "Deep Magenta"],
  },
};

// Chaldean numerology chart (no 9 assignment)
const chaldeanChart: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
};

const chaldeanMeanings: Record<number, string> = {
  1: "Leadership and originality — your name radiates solar confidence and attracts authority",
  2: "Harmony and partnership — your name carries lunar energy that attracts cooperative relationships",
  3: "Creativity and joy — your name vibrates with Jupiterian abundance and self-expression",
  4: "Stability and structure — your name grounds you in practicality and steady progress",
  5: "Freedom and versatility — your name crackles with Mercurial energy and attracts change",
  6: "Love and nurturing — your name emanates Venusian warmth and attracts beauty and harmony",
  7: "Wisdom and mysticism — your name carries Ketu's depth and attracts spiritual insights",
  8: "Power and abundance — your name vibrates with Saturn's commanding force and material success",
};

const todayMeanings: Record<number, string> = {
  1: "New beginnings — plant seeds of intention and take bold first steps",
  2: "Cooperation — nurture relationships and seek diplomatic solutions",
  3: "Creativity — express yourself freely; art, words, and joy flow easily today",
  4: "Foundation — build, plan, and lay groundwork for future success",
  5: "Change — embrace the unexpected; adaptability brings great rewards",
  6: "Harmony — focus on home, family, and healing relationships",
  7: "Reflection — go within; meditation and study yield profound insights",
  8: "Abundance — take decisive action toward material and professional goals",
  9: "Completion — close old chapters with grace and release what no longer serves",
};

function reduceToSingleOrMaster(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n < 10) return n;
  const sum = String(n)
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
  return reduceToSingleOrMaster(sum);
}

function reduceToSingle(n: number): number {
  if (n < 10) return n;
  const sum = String(n)
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
  return reduceToSingle(sum);
}

function calculateLifePath(dob: string): number {
  const digits = dob.replace(/-/g, "").split("").map(Number);
  const total = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleOrMaster(total);
}

function calculateBhagyank(dob: string): number {
  const digits = dob.replace(/-/g, "").split("").map(Number);
  const total = digits.reduce((a, b) => a + b, 0);
  return reduceToSingle(total);
}

function calculateMulank(dob: string): number {
  const day = Number.parseInt(dob.split("-")[2] || "1", 10);
  let n = day;
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

function letterValue(c: string): number {
  const code = c.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  return code - 64;
}

function calculateExpression(name: string): number {
  const total = name.split("").reduce((acc, c) => acc + letterValue(c), 0);
  return reduceToSingleOrMaster(total);
}

function calculateChaldean(name: string): number {
  const total = name
    .toUpperCase()
    .split("")
    .reduce((acc, c) => acc + (chaldeanChart[c] || 0), 0);
  if (total === 0) return 0;
  let n = total;
  while (n > 8) {
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number(d), 0);
    if (n > 8) continue;
  }
  // Chaldean doesn't use 9; if we get 9, reduce again
  return n === 9 ? 9 : n;
}

function getTodayUniversalDay(): { number: number; meaning: string } {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const dateString = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  const total = dateString
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
  const num = reduceToSingle(total);
  return { number: num, meaning: todayMeanings[num] || "" };
}

export default function NumerologyCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [showNameCorrection, setShowNameCorrection] = useState(false);
  const [result, setResult] = useState<{
    lifePath: number;
    expression: number;
    mulank: number;
    bhagyank: number;
    chaldean: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    if (!name.trim() || !dob) {
      setError("Please enter both your full name and date of birth.");
      return;
    }
    setError("");
    const lifePath = calculateLifePath(dob);
    const expression = calculateExpression(name);
    const mulank = calculateMulank(dob);
    const bhagyank = calculateBhagyank(dob);
    const chaldean = calculateChaldean(name);
    setResult({ lifePath, expression, mulank, bhagyank, chaldean });
  };

  const lpInfo = result ? lifePathData[result.lifePath] : null;
  const exInfo = result ? lifePathData[result.expression] : null;
  const mulankInfo = result ? mulankData[result.mulank] : null;
  const bhagyankInfo = result ? bhagyankData[result.bhagyank] : null;
  const todayDay = getTodayUniversalDay();

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      data-ocid="numerology_calc.section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-950 via-cosmic-900/80 to-cosmic-950 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.75 0.15 85 / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, oklch(0.6 0.1 270 / 0.2) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold-400 font-cinzel text-xs tracking-[0.4em] uppercase block mb-3">
            Ancient Vedic Science
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white">
            Numerology <span className="text-gold-400">Complete Blueprint</span>{" "}
            Calculator
          </h2>
          <p className="text-cosmic-300 font-cormorant text-xl mt-3 max-w-xl mx-auto">
            Discover your Life Path, Expression, Mulank (Driver) & Bhagyank
            (Destiny) — your complete four-pillar cosmic blueprint.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-gold-400/30 bg-black backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="font-cinzel text-xs tracking-widest text-gold-400/80 uppercase block mb-2"
                htmlFor="calc-name"
              >
                Full Name
              </label>
              <input
                id="calc-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rupa Mishra"
                data-ocid="numerology_calc.input"
                className="w-full bg-black border border-gold-400/40 text-white placeholder-cosmic-500 rounded-lg px-4 py-3 font-cormorant text-lg focus:outline-none focus:border-gold-400/80 focus:ring-1 focus:ring-gold-400/40 transition-all"
              />
            </div>
            <div>
              <label
                className="font-cinzel text-xs tracking-widest text-gold-400/80 uppercase block mb-2"
                htmlFor="calc-dob"
              >
                Date of Birth
              </label>
              <input
                id="calc-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                data-ocid="numerology_calc.input"
                className="w-full bg-black border border-gold-400/40 text-white rounded-lg px-4 py-3 font-cormorant text-lg focus:outline-none focus:border-gold-400/80 focus:ring-1 focus:ring-gold-400/40 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Name Correction Toggle */}
          <div className="mb-6 border border-gold-400/20 rounded-xl p-4 bg-gold-400/5">
            <button
              type="button"
              onClick={() => setShowNameCorrection((v) => !v)}
              data-ocid="numerology_calc.toggle"
              className="flex items-center gap-3 w-full text-left"
            >
              <div
                className={`w-10 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
                  showNameCorrection ? "bg-gold-400" : "bg-cosmic-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    showNameCorrection ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
              <div>
                <p className="font-cinzel text-xs tracking-widest text-gold-400/80 uppercase">
                  ✍️ Name Correction Analysis (Chaldean)
                </p>
                <p className="text-cosmic-400 font-cormorant text-sm mt-0.5">
                  Reveal the vibrational number your current name carries
                </p>
              </div>
            </button>

            <AnimatePresence>
              {showNameCorrection && name.trim() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-gold-400/15">
                    {(() => {
                      const cv = calculateChaldean(name);
                      if (cv === 0)
                        return (
                          <p className="text-cosmic-400 font-cormorant text-sm italic">
                            Enter your name above to see the Chaldean analysis.
                          </p>
                        );
                      return (
                        <div className="flex items-start gap-4">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-gold-400/60 bg-gold-400/10 flex-shrink-0">
                            <span className="font-cinzel text-2xl font-bold text-gold-400">
                              {cv}
                            </span>
                          </div>
                          <div>
                            <p className="font-cinzel text-xs text-gold-400/70 uppercase tracking-widest mb-1">
                              Your Name Vibrates to Chaldean {cv}
                            </p>
                            <p className="text-cosmic-200 font-cormorant text-base leading-relaxed">
                              {chaldeanMeanings[cv] ||
                                "Your name carries a powerful numerological vibration."}
                            </p>
                            <p className="text-gold-400/60 font-cormorant text-sm mt-2 italic">
                              💡 A name correction consultation can align your
                              name's vibration with your destiny for maximum
                              fortune.
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
              {showNameCorrection && !name.trim() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-cosmic-500 font-cormorant text-sm italic">
                    Enter your full name above to activate Chaldean analysis.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <p
              className="text-rose-400 font-cormorant text-sm mb-4 text-center"
              data-ocid="numerology_calc.error_state"
            >
              {error}
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={handleCalculate}
              data-ocid="numerology_calc.primary_button"
              className="btn-gold px-10 py-3 rounded-lg font-cinzel text-sm tracking-widest uppercase"
            >
              ✨ Calculate My Complete Blueprint
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && lpInfo && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 space-y-6"
              data-ocid="numerology_calc.success_state"
            >
              {/* Top two cards: Life Path + Expression */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Life Path Card */}
                <div className="rounded-2xl border border-gold-400/40 bg-gradient-to-br from-cosmic-900 to-cosmic-950 p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold-400 bg-gold-400/10 shadow-[0_0_20px_rgba(212,175,55,0.3)] mb-3">
                      <span className="font-cinzel text-3xl font-bold text-gold-400">
                        {result.lifePath}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-xl font-bold text-white">
                      {lpInfo.name}
                    </h3>
                    <p className="text-gold-400/70 font-cormorant text-base mt-1">
                      {lpInfo.planetEmoji} {lpInfo.planet}
                    </p>
                    <span className="text-xs font-cinzel tracking-wider text-cosmic-400 uppercase">
                      Life Path Number
                    </span>
                  </div>
                  <p className="text-cosmic-200 font-cormorant text-lg italic leading-relaxed mb-4 text-center">
                    &ldquo;{lpInfo.description}&rdquo;
                  </p>
                  <div className="space-y-2 mb-4">
                    {lpInfo.traits.map((trait) => (
                      <div key={trait} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                        <span className="text-cosmic-200 font-cormorant text-base">
                          {trait}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gold-400/10 pt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                        Lucky Colors
                      </p>
                      <p className="text-cosmic-300 font-cormorant text-sm">
                        {lpInfo.luckyColors.join(" · ")}
                      </p>
                    </div>
                    <div>
                      <p className="font-cinzel text-xs text-gold-400/60 uppercase tracking-wider mb-1">
                        Compatible
                      </p>
                      <p className="text-cosmic-300 font-cormorant text-sm">
                        {lpInfo.compatible.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expression Card */}
                {exInfo && (
                  <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-cosmic-900 to-cosmic-950 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-purple-400/5 blur-3xl pointer-events-none" />
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-purple-400 bg-purple-400/10 shadow-[0_0_20px_rgba(167,139,250,0.3)] mb-3">
                        <span className="font-cinzel text-3xl font-bold text-purple-300">
                          {result.expression}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-xl font-bold text-white">
                        {exInfo.name}
                      </h3>
                      <p className="text-purple-300/70 font-cormorant text-base mt-1">
                        {exInfo.planetEmoji} {exInfo.planet}
                      </p>
                      <span className="text-xs font-cinzel tracking-wider text-cosmic-400 uppercase">
                        Expression Number
                      </span>
                    </div>
                    <p className="text-cosmic-200 font-cormorant text-lg italic leading-relaxed mb-4 text-center">
                      &ldquo;{exInfo.description}&rdquo;
                    </p>
                    <div className="space-y-2 mb-4">
                      {exInfo.traits.map((trait) => (
                        <div key={trait} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          <span className="text-cosmic-200 font-cormorant text-base">
                            {trait}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-purple-400/10 pt-4">
                      <p className="font-cinzel text-xs text-purple-400/60 uppercase tracking-wider mb-1">
                        Your Destiny Gifts
                      </p>
                      <p className="text-cosmic-300 font-cormorant text-sm">
                        {exInfo.traits.slice(0, 2).join(" · ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom two cards: Mulank + Bhagyank */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mulank Card */}
                {mulankInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-950/40 via-cosmic-900 to-cosmic-950 p-6 shadow-[0_0_40px_rgba(251,191,36,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
                    <div className="text-center mb-5">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.25)] mb-3">
                        <span className="font-cinzel text-3xl font-bold text-amber-400">
                          {result.mulank}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-xl font-bold text-white">
                        {mulankInfo.name}
                      </h3>
                      <p className="text-amber-300/70 font-cormorant text-base mt-1">
                        {mulankInfo.planetEmoji} {mulankInfo.planet}
                      </p>
                      <span className="text-xs font-cinzel tracking-wider text-cosmic-400 uppercase">
                        मूलांक · Mulank (Driver Number)
                      </span>
                    </div>
                    <p className="text-cosmic-200 font-cormorant text-base italic leading-relaxed mb-4 text-center border-l-2 border-amber-400/30 pl-3">
                      &ldquo;{mulankInfo.description}&rdquo;
                    </p>
                    <div className="space-y-2 mb-4">
                      {mulankInfo.benefits.slice(0, 4).map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-1 flex-shrink-0 text-xs">
                            ✦
                          </span>
                          <span className="text-cosmic-200 font-cormorant text-sm leading-snug">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-amber-400/10 pt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="font-cinzel text-xs text-amber-400/60 uppercase tracking-wider mb-1">
                          Lucky Days
                        </p>
                        <p className="text-cosmic-300 font-cormorant text-sm">
                          {mulankInfo.luckyDays}
                        </p>
                      </div>
                      <div>
                        <p className="font-cinzel text-xs text-amber-400/60 uppercase tracking-wider mb-1">
                          Gemstone
                        </p>
                        <p className="text-cosmic-300 font-cormorant text-sm">
                          {mulankInfo.gemstone}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Bhagyank Card */}
                {bhagyankInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="rounded-2xl border border-teal-400/40 bg-gradient-to-br from-teal-950/30 via-cosmic-900 to-cosmic-950 p-6 shadow-[0_0_40px_rgba(45,212,191,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-teal-400/5 blur-3xl pointer-events-none" />
                    <div className="text-center mb-5">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-teal-400 bg-teal-400/10 shadow-[0_0_20px_rgba(45,212,191,0.25)] mb-3">
                        <span className="font-cinzel text-3xl font-bold text-teal-300">
                          {result.bhagyank}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-xl font-bold text-white">
                        {bhagyankInfo.name}
                      </h3>
                      <p className="text-teal-300/70 font-cormorant text-base mt-1">
                        {bhagyankInfo.planetEmoji} {bhagyankInfo.planet}
                      </p>
                      <span className="text-xs font-cinzel tracking-wider text-cosmic-400 uppercase">
                        भाग्यांक · Bhagyank (Destiny Number)
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20 mb-4 mx-auto block text-center">
                      <span className="text-teal-300 font-cinzel text-xs tracking-widest">
                        {bhagyankInfo.destinyTheme}
                      </span>
                    </div>
                    <p className="text-cosmic-200 font-cormorant text-base italic leading-relaxed mb-4 text-center border-l-2 border-teal-400/30 pl-3">
                      &ldquo;{bhagyankInfo.description}&rdquo;
                    </p>
                    <div className="space-y-2 mb-4">
                      {bhagyankInfo.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2">
                          <span className="text-teal-400 mt-1 flex-shrink-0 text-xs">
                            ◆
                          </span>
                          <span className="text-cosmic-200 font-cormorant text-sm leading-snug">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-teal-400/10 pt-3">
                      <p className="font-cinzel text-xs text-teal-400/60 uppercase tracking-wider mb-2">
                        Lucky Colors
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {bhagyankInfo.luckyColors.map((color) => (
                          <span
                            key={color}
                            className="text-xs font-cinzel tracking-wide bg-teal-400/10 border border-teal-400/20 text-teal-300 rounded-full px-3 py-0.5"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Today's Universal Day Number Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xl border border-gold-400/30 bg-gradient-to-r from-gold-900/20 via-cosmic-900 to-gold-900/20 p-5 flex flex-col sm:flex-row items-center gap-5"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold-400/70 bg-gold-400/15 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex-shrink-0">
                  <span className="font-cinzel text-2xl font-bold text-gold-300">
                    {todayDay.number}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-cinzel text-xs tracking-[0.3em] text-gold-400/70 uppercase mb-1">
                    ✦ Today's Universal Day Number
                  </p>
                  <p className="text-white font-cormorant text-xl font-semibold">
                    {todayDay.meaning}
                  </p>
                  <p className="text-cosmic-400 font-cormorant text-sm mt-1 italic">
                    {new Date().toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <div className="rounded-xl border border-gold-400/20 bg-gold-400/5 p-6 text-center">
                <p className="font-cinzel text-sm text-gold-400/80 mb-1">
                  Want a Deeper Understanding?
                </p>
                <p className="text-cosmic-200 font-cormorant text-lg mb-4">
                  This is just the beginning of your cosmic blueprint. A
                  personalized reading at Omm Vedic Numerology reveals your
                  complete karmic journey — name corrections, auspicious dates,
                  and life guidance.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("booking")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-ocid="numerology_calc.primary_button"
                  className="btn-gold inline-block px-8 py-2.5 rounded-lg font-cinzel text-xs tracking-widest uppercase"
                >
                  Book a Detailed Reading · ₹400
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
