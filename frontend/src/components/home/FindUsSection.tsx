import { MapPin, ExternalLink, Star } from 'lucide-react';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=6RRQ%2B93M+Jagluck+services+pvt+ltd,+Kotitirtha+Ln,+Old+Town,+Bhubaneswar,+Odisha+751002';

const EXACT_ADDRESS =
  'In front of Jagluck Services Pvt Ltd, 3269, Kotitirtha Ln, near Sampurna Jaleswar Temple, Gouri Nagar, Old Town, Bhubaneswar, Odisha 751002';

export default function FindUsSection() {
  return (
    <section className="py-16 md:py-20 bg-cosmic-deep relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_75/0.07)_0%,transparent_60%)]" />

      {/* Decorative stars */}
      <div className="absolute top-6 left-10 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" />
      <div className="absolute top-12 right-16 w-1.5 h-1.5 rounded-full bg-gold/30 animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 left-1/4 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" style={{ animationDelay: '2s' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-cosmic rounded-2xl p-8 md:p-12 cosmic-glow border border-gold/20 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
          </div>

          {/* Label */}
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">
            ✦ Visit Us ✦
          </p>

          {/* Heading */}
          <h2 className="font-cinzel font-black text-2xl md:text-4xl text-foreground mb-4 tracking-wide">
            Find Us on <span className="gold-text-gradient">Google Maps</span>
          </h2>

          {/* Divider */}
          <div className="divider-gold w-40 mx-auto mb-6" />

          {/* Exact Address Block */}
          <div className="bg-gold/8 border border-gold/30 rounded-xl px-6 py-5 mb-6 max-w-2xl mx-auto">
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">
              Our Exact Address
            </p>
            <address className="not-italic font-cormorant text-lg md:text-xl text-gold-light leading-relaxed font-semibold">
              {EXACT_ADDRESS}
            </address>
            <div className="mt-3 pt-3 border-t border-gold/20">
              <p className="font-inter text-xs text-foreground/50 tracking-wide">
                Plus Code: <span className="text-gold/70 font-semibold">6RRQ+93M</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="font-cormorant text-lg md:text-xl text-foreground/70 italic max-w-2xl mx-auto mb-3 leading-relaxed">
            We are located <strong className="text-gold/90 not-italic font-semibold">in front of Jagluck Services Pvt Ltd</strong> in Old Town, Bhubaneswar. Use the Plus Code <strong className="text-gold/90 not-italic font-semibold">6RRQ+93M</strong> on Google Maps for precise navigation.
          </p>
          <p className="font-inter text-sm text-foreground/50 max-w-xl mx-auto mb-8">
            Your reviews and check-ins help others discover authentic Vedic guidance. We'd love to see you there!
          </p>

          {/* CTA Button */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold/10 border border-gold/40 text-gold font-cinzel text-sm tracking-widest uppercase hover:bg-gold/20 hover:border-gold/70 hover:shadow-gold transition-all duration-300 group"
          >
            <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Open in Google Maps
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Tip */}
          <div className="mt-8 flex items-center justify-center gap-2 text-foreground/30">
            <Star className="w-3 h-3 text-gold/40" fill="currentColor" />
            <p className="font-inter text-xs">
              Search <span className="text-gold/50">"Omm Vedic Numerology"</span> on Google to find and review our business
            </p>
            <Star className="w-3 h-3 text-gold/40" fill="currentColor" />
          </div>
        </div>
      </div>
    </section>
  );
}
