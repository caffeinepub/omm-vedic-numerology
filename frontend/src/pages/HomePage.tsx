import { useRef, useState } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import FindUsSection from '../components/home/FindUsSection';
import ContactUsSection from '../components/home/ContactUsSection';
import BookingForm from '../components/booking/BookingForm';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import { Star } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube } from 'react-icons/si';

const INSTAGRAM_URL = 'https://www.instagram.com/ptripathy1989?igsh=MTJ5bHl5YjJ5Y3VvMw==';
const FACEBOOK_URL = 'https://www.facebook.com/share/1AfBaEvANa/';

export default function HomePage() {
  const [preselectedService, setPreselectedService] = useState<string>('');

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      services: servicesRef,
      booking: bookingRef,
      about: aboutRef,
    };
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookNow = (serviceId?: string) => {
    if (serviceId) setPreselectedService(serviceId);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-cosmic-deep">
      <Header onNavigate={scrollToSection} />

      {/* Hero */}
      <div ref={heroRef}>
        <HeroSection
          onBookNow={() => handleBookNow()}
          onExploreServices={() => scrollToSection('services')}
        />
      </div>

      {/* Services */}
      <div ref={servicesRef}>
        <ServicesSection onBookNow={handleBookNow} />
      </div>

      {/* About */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Why Choose Us — SEO keyword-rich section */}
      <WhyChooseUsSection />

      {/* Find Us on Google Maps */}
      <FindUsSection />

      {/* Contact Us via WhatsApp */}
      <ContactUsSection />

      {/* Booking Section */}
      <section id="booking" ref={bookingRef} className="py-20 md:py-28 bg-cosmic-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.14_75/0.05)_0%,transparent_65%)]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
              ✦ Begin Your Journey ✦
            </p>
            <h2 className="font-cinzel font-black text-3xl md:text-5xl text-foreground mb-4 tracking-wide">
              Book Your <span className="gold-text-gradient">Sacred Session</span>
            </h2>
            <p className="font-cormorant text-lg text-foreground/60 italic max-w-xl mx-auto">
              Take the first step toward cosmic clarity. Fill in your details and we'll connect with you shortly.
            </p>
            <div className="divider-gold w-48 mx-auto mt-6" />
          </div>

          {/* Form Card */}
          <div className="card-cosmic rounded-xl p-6 md:p-10 cosmic-glow">
            <BookingForm preselectedService={preselectedService} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cosmic-deep border-t border-gold/15 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-gold" fill="currentColor" />
                <div>
                  <span className="font-cinzel text-sm font-bold text-gold-light tracking-widest uppercase block">
                    Omm Vedic
                  </span>
                  <span className="font-cinzel text-xs font-medium text-gold/70 tracking-[0.2em] uppercase block">
                    Numerloggy
                  </span>
                </div>
              </div>
              <p className="font-inter text-xs text-foreground/40 leading-relaxed max-w-xs">
                Bridging ancient Vedic wisdom with modern life guidance through Tarot, Numerology, Vastu & Pronology. Bhubaneswar's trusted spiritual consultation centre.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Our Services</h4>
              <ul className="space-y-2">
                {[
                  'Tarot Card Reading',
                  'Numerology Consultation',
                  'Vastu Shastra Expert',
                  'Pronology Name Correction',
                ].map((s) => (
                  <li key={s}>
                    <span className="font-inter text-xs text-foreground/40 hover:text-gold/70 transition-colors cursor-pointer">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-inter text-xs text-foreground/30 mt-4 leading-relaxed">
                Expert numerology, vastu shastra, tarot card reading, and pronology services in Bhubaneswar, Odisha.
              </p>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Connect</h4>
              <p className="font-inter text-xs text-foreground/40 mb-3">
                All sessions priced at <span className="text-gold font-semibold">₹400</span>
              </p>

              {/* WhatsApp contact */}
              <a
                href="https://wa.me/918689838590"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-4 font-inter text-xs text-foreground/50 hover:text-green-400 transition-colors group"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +91 8689838590
              </a>

              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-8 h-8 rounded border border-gold/20 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/50 transition-all"
                >
                  <SiInstagram className="w-3.5 h-3.5" />
                </a>

                {/* Facebook */}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-8 h-8 rounded border border-gold/20 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/50 transition-all"
                >
                  <SiFacebook className="w-3.5 h-3.5" />
                </a>

                {/* YouTube placeholder */}
                <div
                  className="w-8 h-8 rounded border border-gold/20 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/50 transition-all cursor-pointer"
                  aria-label="YouTube"
                >
                  <SiYoutube className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Social CTAs */}
              <div className="flex flex-col gap-1.5 mt-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-inter text-xs text-gold/60 hover:text-gold transition-colors group"
                >
                  <SiInstagram className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  @ptripathy1989
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-inter text-xs text-gold/60 hover:text-gold transition-colors group"
                >
                  <SiFacebook className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  Omm Vedic Numerloggy
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-xs text-foreground/25">
              © {new Date().getFullYear()} Omm Vedic Numerloggy. All rights reserved.
            </p>
            <p className="font-inter text-xs text-foreground/25">
              Built with{' '}
              <span className="text-gold/50">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'omm-vedic-numerloggy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/50 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <FloatingWhatsAppButton />
    </div>
  );
}
