import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  emoji: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Happy Clients", emoji: "🙏" },
  { value: 10, suffix: "+", label: "Years Experience", emoji: "⭐" },
  { value: 5, suffix: "", label: "Sacred Services", emoji: "🕉️" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", emoji: "✨" },
];

function CountUp({
  target,
  suffix,
  isVisible,
}: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || animatedRef.current) return;
    animatedRef.current = true;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isVisible, target]);

  return (
    <span className="font-cinzel text-4xl md:text-5xl font-bold text-gold-400">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-cosmic-900/30 border-y border-gold-400/10 relative overflow-hidden"
      data-ocid="stats.section"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.75 0.15 85 / 0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gold-400/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-6 py-8 text-center"
              data-ocid={`stats.item.${i + 1}`}
            >
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                isVisible={isVisible}
              />
              <p className="font-cinzel text-xs tracking-widest text-cosmic-400 uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
