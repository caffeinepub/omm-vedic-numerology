import ServiceCard from './ServiceCard';
import { services } from '../../data/services';

interface ServicesSectionProps {
  onBookNow: (serviceId: string) => void;
}

export default function ServicesSection({ onBookNow }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-cosmic-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.14_75/0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold/60 uppercase mb-4">
            ✦ Sacred Services ✦
          </p>
          <h2 className="font-cinzel font-black text-3xl md:text-5xl text-foreground mb-4 tracking-wide">
            Our <span className="gold-text-gradient">Divine Offerings</span>
          </h2>
          <p className="font-cormorant text-lg md:text-xl text-foreground/60 italic max-w-2xl mx-auto">
            Each service is a sacred journey into the cosmic wisdom that shapes your destiny
          </p>
          <div className="divider-gold w-48 mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookNow={onBookNow}
            />
          ))}
        </div>

        {/* Pricing Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-cosmic-mid border border-gold/20 rounded-full px-6 py-3">
            <span className="text-gold text-lg">✦</span>
            <span className="font-cinzel text-sm text-foreground/70 tracking-wide">
              All services priced at <span className="text-gold font-bold">₹400</span> per session
            </span>
            <span className="text-gold text-lg">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
