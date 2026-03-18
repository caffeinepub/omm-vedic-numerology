export interface ServiceData {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  iconPath: string;
  symbol: string;
}

export const services: ServiceData[] = [
  {
    id: "tarotCardReading",
    name: "Tarot Card Reading",
    description: "Intuitive card-based guidance for life decisions",
    longDescription:
      "Unlock the mysteries of your past, present, and future through the ancient art of Tarot. Each card drawn reveals hidden truths, guiding you toward clarity, purpose, and spiritual alignment.",
    price: 400,
    iconPath: "/assets/generated/tarot-icon.dim_256x256.png",
    symbol: "🃏",
  },
  {
    id: "numerology",
    name: "Numerology",
    description: "Life path and sacred number analysis",
    longDescription:
      "Discover the cosmic blueprint encoded in your birth date and name. Vedic numerology reveals your life path number, destiny, and the divine patterns that shape your journey through this lifetime.",
    price: 400,
    iconPath: "/assets/generated/numerology-icon.dim_256x256.png",
    symbol: "🔢",
  },
  {
    id: "vastu",
    name: "Vastu Shastra",
    description: "Space energy and home alignment consultation",
    longDescription:
      "Harmonize your living and working spaces with the ancient science of Vastu Shastra. Align your home or office with cosmic energies to attract prosperity, health, and positive vibrations.",
    price: 400,
    iconPath: "/assets/generated/vastu-icon.dim_256x256.png",
    symbol: "🏠",
  },
  {
    id: "pronology",
    name: "Pronology",
    description: "Name and sound vibration analysis",
    longDescription:
      "Every name carries a unique vibrational frequency that influences your destiny. Pronology analyzes the sacred sounds of your name to reveal its cosmic impact and guide transformative name changes.",
    price: 400,
    iconPath: "/assets/generated/pronology-icon.dim_256x256.png",
    symbol: "🔊",
  },
];
