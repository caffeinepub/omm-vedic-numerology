import type { ServiceData } from "../../data/services";

interface ServiceCardProps {
  service: ServiceData;
  onBookNow: (serviceId: string) => void;
}

export default function ServiceCard({ service, onBookNow }: ServiceCardProps) {
  return (
    <div className="card-cosmic rounded-lg p-6 md:p-8 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1">
      <div className="relative mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cosmic-deep border border-gold/30 flex items-center justify-center overflow-hidden group-hover:border-gold/60 transition-all duration-300 group-hover:shadow-[0_0_20px_oklch(0.78_0.14_75/0.3)]">
          <img
            src={service.iconPath}
            alt={service.name}
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span style="font-size: 2.5rem">${service.symbol}</span>`;
              }
            }}
          />
        </div>
        <div className="absolute inset-0 rounded-full border border-gold/10 scale-110 group-hover:border-gold/30 transition-all duration-300" />
      </div>

      <h3 className="font-cinzel font-bold text-lg md:text-xl text-gold-light mb-3 tracking-wide">
        {service.name}
      </h3>

      <p className="font-cormorant text-base md:text-lg text-foreground/60 italic mb-4 leading-relaxed">
        {service.description}
      </p>

      <div className="divider-gold w-full mb-4" />

      <p className="font-inter text-sm text-foreground/50 mb-6 leading-relaxed flex-grow">
        {service.longDescription}
      </p>

      <div className="mb-5">
        <span className="font-cinzel text-2xl font-bold text-gold">₹400</span>
        <span className="font-inter text-xs text-foreground/40 ml-2">
          per session
        </span>
      </div>

      <button
        type="button"
        onClick={() => onBookNow(service.id)}
        className="btn-gold w-full py-2.5 rounded text-sm"
      >
        Book Now
      </button>
    </div>
  );
}
