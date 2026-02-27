const WHATSAPP_URL = 'https://wa.me/918689838590';
const WHATSAPP_DISPLAY = '+91 8689838590';

export default function ContactUsSection() {
  return (
    <section className="py-16 md:py-20 bg-cosmic-deep relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_75/0.06)_0%,transparent_65%)]" />

      {/* Decorative stars */}
      <div className="absolute top-8 left-12 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" />
      <div className="absolute top-16 right-20 w-1.5 h-1.5 rounded-full bg-gold/30 animate-twinkle" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-10 left-1/3 w-1 h-1 rounded-full bg-gold/40 animate-twinkle" style={{ animationDelay: '2.4s' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-cosmic rounded-2xl p-8 md:p-12 cosmic-glow border border-gold/20 text-center">

          {/* WhatsApp icon circle */}
          <div className="flex justify-center mb-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#25D366', boxShadow: '0 0 24px rgba(37,211,102,0.45)' }}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
          </div>

          {/* Label */}
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">
            ✦ Reach Out ✦
          </p>

          {/* Heading */}
          <h2 className="font-cinzel font-black text-2xl md:text-4xl text-foreground mb-4 tracking-wide">
            Contact Us on <span className="gold-text-gradient">WhatsApp</span>
          </h2>

          <div className="divider-gold w-40 mx-auto mb-6" />

          {/* Description */}
          <p className="font-cormorant text-lg md:text-xl text-foreground/70 italic max-w-xl mx-auto mb-6 leading-relaxed">
            Have questions about our services? Want to know more before booking? Reach out to us directly on WhatsApp — we're here to guide you.
          </p>

          {/* Phone number display */}
          <div className="bg-gold/8 border border-gold/30 rounded-xl px-6 py-5 mb-8 max-w-sm mx-auto">
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-2">
              WhatsApp Number
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-2xl md:text-3xl font-bold text-gold hover:text-gold-light transition-colors tracking-wide"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <p className="font-inter text-xs text-foreground/40 mt-2">
              Tap the number to open WhatsApp
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-cinzel text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.4)' }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start WhatsApp Chat
          </a>

          <p className="font-inter text-xs text-foreground/35 mt-4">
            Available for queries about Numerology, Vastu, Tarot & Pronology
          </p>
        </div>
      </div>
    </section>
  );
}
