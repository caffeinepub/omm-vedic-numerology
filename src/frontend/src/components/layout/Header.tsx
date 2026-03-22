import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", section: "hero" },
    { label: "Services", section: "services" },
    { label: "Book Now", section: "booking" },
    { label: "About", section: "about" },
  ];

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cosmic-deep/90 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center gap-1">
              <Star
                className="w-4 h-4 text-gold animate-twinkle"
                fill="currentColor"
              />
              <Star
                className="w-5 h-5 text-gold animate-twinkle [animation-delay:0.5s]"
                fill="currentColor"
              />
              <Star
                className="w-4 h-4 text-gold animate-twinkle [animation-delay:1s]"
                fill="currentColor"
              />
            </div>
            <div className="ml-1">
              <span className="font-cinzel text-sm md:text-base font-bold text-gold-light tracking-widest uppercase leading-none block">
                Omm Vedic
              </span>
              <span className="font-cinzel text-xs md:text-sm font-medium text-gold/80 tracking-[0.2em] uppercase leading-none block">
                Numerloggy
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.section}
                onClick={() => handleNav(link.section)}
                className={`px-4 py-2 font-cinzel text-sm tracking-wider transition-all duration-200 rounded-sm
                  ${
                    link.section === "booking"
                      ? "btn-gold px-5 py-2 rounded text-xs"
                      : "text-foreground/70 hover:text-gold hover:bg-gold/5"
                  }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/blog"
              data-ocid="header.blog.link"
              className="px-4 py-2 font-cinzel text-sm tracking-wider text-foreground/70 hover:text-gold hover:bg-gold/5 transition-all duration-200 rounded-sm flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </a>
            <Link
              to="/admin"
              className="ml-2 p-2 text-foreground/20 hover:text-gold/50 transition-colors rounded"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden text-gold p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cosmic-deep/95 backdrop-blur-md border-t border-gold/20">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.section}
                onClick={() => handleNav(link.section)}
                className={`px-4 py-3 font-cinzel text-sm tracking-wider text-left transition-all duration-200 rounded
                  ${
                    link.section === "booking"
                      ? "btn-gold mt-2 text-center"
                      : "text-foreground/70 hover:text-gold hover:bg-gold/5"
                  }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/blog"
              data-ocid="header.mobile.blog.link"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 font-cinzel text-sm tracking-wider text-foreground/70 hover:text-gold hover:bg-gold/5 transition-all duration-200 rounded flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 font-cinzel text-xs tracking-wider text-foreground/30 hover:text-gold/50 transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
