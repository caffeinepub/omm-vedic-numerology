import { useRef } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import BookingForm from '../components/booking/BookingForm';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { SiInstagram, SiFacebook, SiYoutube } from 'react-icons/si';

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
                    Numerology
                  </span>
                </div>
              </div>
              <p className="font-inter text-xs text-foreground/40 leading-relaxed max-w-xs">
                Bridging ancient Vedic wisdom with modern life guidance through Tarot, Numerology, Vastu & Pronology.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Services</h4>
              <ul className="space-y-2">
                {['Tarot Card Reading', 'Numerology', 'Vastu Shastra', 'Pronology'].map((s) => (
                  <li key={s}>
                    <span className="font-inter text-xs text-foreground/40 hover:text-gold/70 transition-colors cursor-pointer">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-cinzel text-xs tracking-widest text-gold/70 uppercase mb-4">Connect</h4>
              <p className="font-inter text-xs text-foreground/40 mb-4">
                All sessions priced at <span className="text-gold font-semibold">₹400</span>
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: SiInstagram, label: 'Instagram' },
                  { Icon: SiFacebook, label: 'Facebook' },
                  { Icon: SiYoutube, label: 'YouTube' },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="w-8 h-8 rounded border border-gold/20 flex items-center justify-center text-foreground/40 hover:text-gold hover:border-gold/50 transition-all cursor-pointer"
                    aria-label={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="divider-gold mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-inter text-xs text-foreground/30">
              © {new Date().getFullYear()} Omm Vedic Numerology. All rights reserved.
            </p>
            <p className="font-inter text-xs text-foreground/30 flex items-center gap-1">
              Built with{' '}
              <Star className="w-3 h-3 text-gold inline" fill="currentColor" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'omm-vedic-numerology')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
