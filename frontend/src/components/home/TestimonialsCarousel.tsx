import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  clientName: string;
  city: string;
  serviceUsed: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    clientName: 'Priya Sharma',
    city: 'Bhubaneswar',
    serviceUsed: 'Numerology',
    rating: 5,
    quote: 'Omm Vedic Numerloggy completely transformed my understanding of my life path. The numerology reading was incredibly accurate and gave me clarity I had been seeking for years.',
  },
  {
    clientName: 'Rajesh Pattnaik',
    city: 'Cuttack',
    serviceUsed: 'Vastu Shastra',
    rating: 5,
    quote: 'After the Vastu consultation, we rearranged our home and the positive energy shift was immediate. Our family harmony improved and business started flourishing. Highly recommended!',
  },
  {
    clientName: 'Sunita Mohanty',
    city: 'Puri',
    serviceUsed: 'Tarot Card Reading',
    rating: 5,
    quote: 'The tarot reading was so precise it gave me goosebumps. Every card drawn resonated deeply with my current situation. I now have a clear direction for my future.',
  },
  {
    clientName: 'Amit Kumar Das',
    city: 'Rourkela',
    serviceUsed: 'Pronology',
    rating: 5,
    quote: 'I changed my name spelling based on the pronology guidance and within months my career took off. The science behind name vibrations is real and powerful!',
  },
  {
    clientName: 'Deepika Nayak',
    city: 'Sambalpur',
    serviceUsed: 'Numerology',
    rating: 5,
    quote: 'Best spiritual consultation I have ever had. The numerologist explained everything so clearly and the predictions have been coming true one by one. Truly gifted!',
  },
  {
    clientName: 'Suresh Behera',
    city: 'Berhampur',
    serviceUsed: 'Vastu Shastra',
    rating: 5,
    quote: 'Our new office was struggling until we got the Vastu done. The changes suggested were simple but the results were dramatic. Revenue doubled in three months!',
  },
  {
    clientName: 'Ananya Mishra',
    city: 'Bhubaneswar',
    serviceUsed: 'Tarot Card Reading',
    rating: 5,
    quote: 'I was skeptical at first but the reading was so accurate about my past that I had to believe in the future guidance too. Life-changing experience!',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i} className="text-gold-400 text-lg">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex(i => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;
    if (diff === 0) return 'scale-100 opacity-100 z-20';
    if (diff === 1 || diff === testimonials.length - 1) return 'scale-90 opacity-40 z-10';
    return 'scale-75 opacity-0 z-0 pointer-events-none';
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/generated/testimonials-bg.dim_1920x600.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-cosmic-950/85" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">Sacred Voices</span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">
            Client <span className="text-gold-400">Testimonials</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center min-h-[320px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute w-full max-w-2xl transition-all duration-500 ${getCardStyle(i)}`}
            >
              <div
                className={`rounded-2xl p-8 border ${
                  i === activeIndex
                    ? 'border-gold-400/60 bg-cosmic-900/90 shadow-gold'
                    : 'border-cosmic-700/30 bg-cosmic-900/50'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-cosmic-950 font-cinzel font-bold text-lg shrink-0">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold font-cinzel">{t.clientName}</h3>
                    <p className="text-cosmic-400 text-sm">{t.city} · {t.serviceUsed}</p>
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                <blockquote className="text-cosmic-200 font-cormorant text-lg leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => { prev(); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); }}
            className="w-10 h-10 rounded-full border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? 'bg-gold-400 w-6' : 'bg-cosmic-600 hover:bg-cosmic-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); }}
            className="w-10 h-10 rounded-full border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all flex items-center justify-center"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
