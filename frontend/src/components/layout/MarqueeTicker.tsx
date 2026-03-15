import React from 'react';

const tickerText = '✨ Tarot Card Reading · 🔢 Numerology · 🏠 Vastu Shastra · 🔤 Pronology · 📍 Bhubaneswar, Odisha · ₹400 per session · Book Now · ';

export default function MarqueeTicker() {
  return (
    <div
      className="relative overflow-hidden py-2.5 z-40"
      style={{
        background: 'linear-gradient(90deg, #92400e, #d97706, #fbbf24, #d97706, #92400e)',
      }}
      aria-label="Services ticker"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-cosmic-950 font-semibold text-sm tracking-wide mx-4">
          {tickerText}{tickerText}{tickerText}{tickerText}
        </span>
        <span className="text-cosmic-950 font-semibold text-sm tracking-wide mx-4" aria-hidden="true">
          {tickerText}{tickerText}{tickerText}{tickerText}
        </span>
      </div>
    </div>
  );
}
