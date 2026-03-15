import React, { useRef, useState } from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import BookingForm from '../components/booking/BookingForm';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import FindUsSection from '../components/home/FindUsSection';
import ContactUsSection from '../components/home/ContactUsSection';
import FloatingWhatsAppButton from '../components/layout/FloatingWhatsAppButton';
import FloatingBookWhatsAppButton from '../components/layout/FloatingBookWhatsAppButton';
import MarqueeTicker from '../components/layout/MarqueeTicker';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import DailyCosmicInsight from '../components/home/DailyCosmicInsight';
import SpiritualProfileQuiz from '../components/home/SpiritualProfileQuiz';
import { ServiceType } from '../backend';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [preSelectedService, setPreSelectedService] = useState<ServiceType | null>(null);

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
    if (serviceId) {
      // Map string serviceId to ServiceType enum
      const serviceTypeMap: Record<string, ServiceType> = {
        tarotCardReading: ServiceType.tarotCardReading,
        numerology: ServiceType.numerology,
        vastu: ServiceType.vastu,
        pronology: ServiceType.pronology,
      };
      const mapped = serviceTypeMap[serviceId];
      if (mapped) setPreSelectedService(mapped);
    }
    scrollToSection('booking');
  };

  const handleRecommendService = (serviceType: ServiceType) => {
    setPreSelectedService(serviceType);
    setTimeout(() => {
      if (bookingRef.current) {
        bookingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-white">
      <Header onNavigate={scrollToSection} />
      <MarqueeTicker />

      {/* Hero */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Services */}
      <div ref={servicesRef}>
        <ServicesSection onBookNow={handleBookNow} />
      </div>

      {/* Spiritual Profile Quiz */}
      <SpiritualProfileQuiz onRecommendService={handleRecommendService} />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Daily Cosmic Insight */}
      <DailyCosmicInsight />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* About */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Booking Form */}
      <section id="booking" ref={bookingRef} className="py-16 px-4 bg-cosmic-950">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">Sacred Consultation</span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">
              Book Your <span className="text-gold-400">Session</span>
            </h2>
            <p className="text-cosmic-300 mt-3 font-cormorant text-lg">
              Begin your journey to cosmic clarity · ₹400 per session
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
          </div>
          <div className="rounded-2xl border border-gold-400/20 bg-cosmic-900/80 backdrop-blur-sm overflow-hidden shadow-gold">
            <BookingForm preSelectedService={preSelectedService} />
          </div>
        </div>
      </section>

      {/* Find Us */}
      <FindUsSection />

      {/* Contact */}
      <ContactUsSection />

      {/* Serving Odisha Section */}
      <section className="py-12 px-4 bg-cosmic-900/50 border-t border-gold-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl font-bold text-gold-400 mb-4">
            Serving Bhubaneswar &amp; All of Odisha
          </h2>
          <p className="text-cosmic-300 font-cormorant text-lg leading-relaxed mb-6">
            Omm Vedic Numerloggy proudly serves clients across Bhubaneswar, Cuttack, Puri, Rourkela, Sambalpur,
            Berhampur, and all major cities of Odisha. Whether you seek guidance in Numerology, Tarot Card Reading,
            Vastu Shastra, or Pronology — our expert consultations are available in-person and online.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Berhampur', 'Balasore', 'Brahmapur', 'Baripada', 'Jharsuguda'].map(city => (
              <span key={city} className="px-3 py-1 rounded-full border border-gold-400/20 text-cosmic-400 font-cinzel text-xs">
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cosmic-950 border-t border-gold-400/10 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-cinzel text-xl font-bold text-gold-400 mb-2">Omm Vedic Numerloggy</div>
          <p className="text-cosmic-500 text-sm mb-4">
            Ancient Wisdom · Modern Guidance · Bhubaneswar, Odisha
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-cosmic-500 text-xs font-cinzel mb-6">
            <span>📞 +91 8689838590</span>
            <span>📍 Old Town, Bhubaneswar</span>
            <span>💰 ₹400 per session</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mb-6" />
          <p className="text-cosmic-600 text-xs">
            © {new Date().getFullYear()} Omm Vedic Numerloggy. All rights reserved.
          </p>
          <p className="text-cosmic-600 text-xs mt-2">
            Built with{' '}
            <span className="text-gold-600">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'omm-vedic-numerloggy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <FloatingWhatsAppButton />
      <FloatingBookWhatsAppButton />
    </div>
  );
}
