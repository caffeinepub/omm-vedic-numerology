import type React from "react";
import { useRef, useState } from "react";
import { ServiceType } from "../backend";
import BookingForm from "../components/booking/BookingForm";
import AboutSection from "../components/home/AboutSection";
import ContactUsSection from "../components/home/ContactUsSection";
import DailyCosmicInsight from "../components/home/DailyCosmicInsight";
import FindUsSection from "../components/home/FindUsSection";
import HeroSection from "../components/home/HeroSection";
import JustDialSection from "../components/home/JustDialSection";
import ServicesSection from "../components/home/ServicesSection";
import SpiritualProfileQuiz from "../components/home/SpiritualProfileQuiz";
import TestimonialsCarousel from "../components/home/TestimonialsCarousel";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import FloatingBookWhatsAppButton from "../components/layout/FloatingBookWhatsAppButton";
import FloatingWhatsAppButton from "../components/layout/FloatingWhatsAppButton";
import Header from "../components/layout/Header";
import MarqueeTicker from "../components/layout/MarqueeTicker";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const [preSelectedService, setPreSelectedService] =
    useState<ServiceType | null>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      services: servicesRef,
      booking: bookingRef,
      about: aboutRef,
    };
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNow = (serviceId?: string) => {
    if (serviceId) {
      const serviceTypeMap: Record<string, ServiceType> = {
        tarotCardReading: ServiceType.tarotCardReading,
        numerology: ServiceType.numerology,
        vastu: ServiceType.vastu,
        pronology: ServiceType.pronology,
      };
      const mapped = serviceTypeMap[serviceId];
      if (mapped) setPreSelectedService(mapped);
    }
    scrollToSection("booking");
  };

  const handleRecommendService = (serviceType: ServiceType) => {
    setPreSelectedService(serviceType);
    setTimeout(() => {
      if (bookingRef.current) {
        bookingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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
      <section
        id="booking"
        ref={bookingRef}
        className="py-16 px-4 bg-cosmic-950"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">
              Sacred Consultation
            </span>
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">
              Book Your <span className="text-gold-400">Session</span>
            </h2>
            <p className="text-cosmic-300 mt-3 font-cormorant text-lg">
              Begin your journey to cosmic clarity · ₹400 per session
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
          </div>
          <div className="rounded-2xl border border-gold-400/20 overflow-hidden shadow-gold">
            <BookingForm preSelectedService={preSelectedService} />
          </div>
        </div>
      </section>

      {/* JustDial Section - immediately after booking */}
      <JustDialSection />

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
            Omm Vedic Numerloggy proudly serves clients across Bhubaneswar,
            Cuttack, Puri, Rourkela, Sambalpur, Berhampur, and all major cities
            of Odisha. Whether you seek guidance in Numerology, Tarot Card
            Reading, Vastu Shastra, or Pronology — our expert consultations are
            available in-person and online.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              "Bhubaneswar",
              "Cuttack",
              "Puri",
              "Rourkela",
              "Sambalpur",
              "Berhampur",
              "Balasore",
              "Brahmapur",
              "Baripada",
              "Jharsuguda",
            ].map((city) => (
              <span
                key={city}
                className="px-3 py-1 rounded-full border border-gold-400/20 text-cosmic-400 font-cinzel text-xs"
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cosmic-950 border-t border-gold-400/10 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-cinzel text-xl font-bold text-gold-400 mb-2">
            Omm Vedic Numerloggy
          </div>
          <p className="text-cosmic-500 text-sm mb-4">
            Ancient Wisdom · Modern Guidance · Bhubaneswar, Odisha
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-cosmic-500 text-xs font-cinzel mb-4">
            <span>📞 +91 8689838590</span>
            <span>📍 Old Town, Bhubaneswar</span>
            <span>💰 ₹400 per session</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="https://www.instagram.com/omm_vedic_numerologgy?igsh=aHlscjRnMzAwbjR6"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.instagram.link"
              aria-label="Follow us on Instagram"
              className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-200"
            >
              <svg
                role="img"
                aria-label="Instagram"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1AfBaEvANa/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.facebook.link"
              aria-label="Follow us on Facebook"
              className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-200"
            >
              <svg
                role="img"
                aria-label="Facebook"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <title>Facebook</title>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mb-6" />
          <p className="text-cosmic-600 text-xs">
            © {new Date().getFullYear()} Omm Vedic Numerloggy. All rights
            reserved.
          </p>
          <p className="text-cosmic-600 text-xs mt-2">
            Built with <span className="text-gold-600">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "omm-vedic-numerloggy")}`}
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
