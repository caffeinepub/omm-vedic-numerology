import React, { useState, useEffect, useCallback } from "react";

interface Testimonial {
  clientName: string;
  city: string;
  serviceUsed: string;
  rating: number;
  quote: string;
  source?: string;
}

const testimonials: Testimonial[] = [
  {
    clientName: "Mamata Pradhan",
    city: "Bhubaneswar",
    serviceUsed: "Numerology",
    rating: 5,
    quote:
      "Excellent service! Got my numerology done and the predictions were spot on. Very professional and knowledgeable. Highly recommended in Bhubaneswar.",
    source: "JustDial",
  },
  {
    clientName: "Subhashree Panda",
    city: "Bhubaneswar",
    serviceUsed: "Tarot Card Reading",
    rating: 5,
    quote:
      "Amazing experience with tarot card reading. Everything she said was true and coming to pass. Best numerologist in Odisha!",
    source: "JustDial",
  },
  {
    clientName: "Ranjit Sahoo",
    city: "Bhubaneswar",
    serviceUsed: "Vastu Shastra",
    rating: 5,
    quote:
      "Very good vastu consultation. After following the advice our home energy completely changed. Trusted and reliable service.",
    source: "JustDial",
  },
  {
    clientName: "Priya Sharma",
    city: "Bhubaneswar",
    serviceUsed: "Numerology",
    rating: 5,
    quote:
      "Omm Vedic Numerloggy completely transformed my understanding of my life path. The numerology reading was incredibly accurate and gave me clarity I had been seeking for years.",
  },
  {
    clientName: "Rajesh Pattnaik",
    city: "Cuttack",
    serviceUsed: "Vastu Shastra",
    rating: 5,
    quote:
      "After the Vastu consultation, we rearranged our home and the positive energy shift was immediate. Our family harmony improved and business started flourishing. Highly recommended!",
  },
  {
    clientName: "Sunita Mohanty",
    city: "Puri",
    serviceUsed: "Tarot Card Reading",
    rating: 5,
    quote:
      "The tarot reading was so precise it gave me goosebumps. Every card drawn resonated deeply with my current situation. I now have a clear direction for my future.",
  },
  {
    clientName: "Amit Kumar Das",
    city: "Rourkela",
    serviceUsed: "Pronology",
    rating: 5,
    quote:
      "I changed my name spelling based on the pronology guidance and within months my career took off. The science behind name vibrations is real and powerful!",
  },
  {
    clientName: "Deepika Nayak",
    city: "Sambalpur",
    serviceUsed: "Numerology",
    rating: 5,
    quote:
      "Best spiritual consultation I have ever had. The numerologist explained everything so clearly and the predictions have been coming true one by one. Truly gifted!",
  },
  {
    clientName: "Suresh Behera",
    city: "Berhampur",
    serviceUsed: "Vastu Shastra",
    rating: 5,
    quote:
      "Our new office was struggling until we got the Vastu done. The changes suggested were simple but the results were dramatic. Revenue doubled in three months!",
  },
  {
    clientName: "Ananya Mishra",
    city: "Bhubaneswar",
    serviceUsed: "Tarot Card Reading",
    rating: 5,
    quote:
      "I was skeptical at first but the reading was so accurate about my past that I had to believe in the future guidance too. Life-changing experience!",
  },
];

const STARS = [1, 2, 3, 4, 5];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {STARS.slice(0, rating).map((s) => (
        <span key={s} className="text-yellow-400 text-xl">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const t = testimonials[activeIndex];

  return (
    <section
      className="relative py-20 overflow-hidden content-visibility-auto"
      style={{
        backgroundImage:
          "url(/assets/generated/testimonials-bg.dim_1920x600.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Darker overlay for maximum text readability */}
      <div className="absolute inset-0 bg-cosmic-950/95" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">
            Sacred Voices
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">
            Client <span className="text-gold-400">Testimonials</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Single active card - fully visible, no clipping */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            key={activeIndex}
            className="rounded-2xl p-8 border-2 border-gold-400/80 bg-cosmic-950 shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-500"
          >
            <div className="text-gold-400 text-6xl font-cinzel leading-none mb-2 select-none">
              &ldquo;
            </div>

            <blockquote className="text-white font-cormorant text-xl font-semibold leading-relaxed mb-6">
              {t.quote}
            </blockquote>

            <div className="border-t-2 border-gold-400/30 pt-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center text-cosmic-950 font-cinzel font-bold text-xl shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                {t.clientName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-gold-300 font-bold font-cinzel text-base">
                    {t.clientName}
                  </h3>
                  {t.source === "JustDial" && (
                    <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-cinzel font-bold">
                      JustDial
                    </span>
                  )}
                </div>
                <p className="text-cosmic-200 text-sm mt-0.5">
                  {t.city} &middot; {t.serviceUsed}
                </p>
                <StarRating rating={t.rating} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            data-ocid="testimonials.pagination_prev"
            onClick={() => {
              prev();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 8000);
            }}
            className="w-10 h-10 rounded-full border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all flex items-center justify-center text-xl"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
                key={i}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 8000);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-gold-400 w-6"
                    : "bg-cosmic-600 hover:bg-cosmic-400 w-2"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            data-ocid="testimonials.pagination_next"
            onClick={() => {
              next();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 8000);
            }}
            className="w-10 h-10 rounded-full border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all flex items-center justify-center text-xl"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <p className="text-center text-cosmic-300 text-sm mt-3">
          {activeIndex + 1} / {testimonials.length}
        </p>
      </div>
    </section>
  );
}
