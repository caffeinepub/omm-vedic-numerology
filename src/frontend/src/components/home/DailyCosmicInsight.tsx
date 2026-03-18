import React from "react";

const cosmicTips = [
  "🔢 Your life path number holds the key to your purpose. Add the digits of your birthdate to discover your cosmic blueprint today.",
  "🃏 The Tarot's High Priestess reminds you: trust your intuition above all else. Your inner voice knows the path forward.",
  "🏠 Vastu wisdom: Place a bowl of sea salt in the northeast corner of your home to absorb negative energies and invite clarity.",
  "🔤 The vibration of your name shapes your destiny. Every letter carries a frequency that influences your life's journey.",
  "🌟 Numerology reveals: Days that match your personal year number are your most powerful days for new beginnings.",
  "🃏 The Wheel of Fortune turns — what you send out returns threefold. Today, focus on gratitude to attract abundance.",
  "🏠 Vastu principle: A clutter-free entrance invites prosperity. Clear your doorway to open the flow of positive energy.",
  "🔢 Master numbers 11, 22, and 33 carry heightened spiritual significance. If these appear in your life today, pay attention.",
  "🔤 Pronology teaches that changing even one letter in your name can shift your vibrational frequency and alter your destiny.",
  "🌙 The moon's phase affects your numerological energy. New moon days amplify intentions set with your life path number.",
  "🃏 The Star card in Tarot signals hope and renewal. Even in darkness, your guiding light is always present within you.",
  "🏠 Vastu Shastra: The center of your home (Brahmasthan) should remain open and uncluttered to allow cosmic energy to flow freely.",
  "🔢 Your expression number (derived from your full birth name) reveals your natural talents and the gifts you bring to the world.",
  "✨ Ancient Vedic wisdom teaches that the universe speaks in numbers, symbols, and vibrations. Learn its language to unlock your potential.",
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export default function DailyCosmicInsight() {
  const dayOfYear = getDayOfYear();
  const tip = cosmicTips[dayOfYear % cosmicTips.length];

  return (
    <section className="py-16 px-4 bg-cosmic-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">
            Daily Wisdom
          </span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-gold-400/30 shadow-gold">
          {/* Mandala decorative background */}
          <div className="absolute inset-0 opacity-10">
            <img
              src="/assets/generated/mandala-insight-border.dim_600x600.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-900/95 via-cosmic-900/90 to-cosmic-800/95" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 mb-6">
              <span className="text-gold-400 text-xs font-cinzel tracking-widest uppercase">
                Today&apos;s Cosmic Insight
              </span>
            </div>

            <div className="text-5xl mb-6">✨</div>

            <blockquote className="font-cormorant text-xl md:text-2xl text-cosmic-100 leading-relaxed italic">
              &ldquo;{tip}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/50" />
              <span className="text-gold-400/60 text-xs font-cinzel tracking-widest">
                ॐ
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/50" />
            </div>

            <p className="mt-4 text-cosmic-500 text-xs font-cinzel tracking-wide">
              Insight #{(dayOfYear % cosmicTips.length) + 1} of{" "}
              {cosmicTips.length} · Refreshes daily
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
