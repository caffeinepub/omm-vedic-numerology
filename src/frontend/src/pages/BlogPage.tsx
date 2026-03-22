import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import Header from "../components/layout/Header";
import { blogPosts } from "../data/blogPosts";

const categoryColors: Record<string, string> = {
  Numerology: "bg-gold-400/20 text-gold-300 border-gold-400/30",
  Tarot: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Vastu: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Pronology: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "Watch Analysis": "bg-rose-500/20 text-rose-300 border-rose-400/30",
  "Success Story": "bg-rose-500/20 text-rose-300 border-rose-400/30",
  "All Services": "bg-amber-500/20 text-amber-300 border-amber-400/30",
};

export default function BlogPage() {
  const handleNavigate = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-white">
      <Header onNavigate={handleNavigate} />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/50 to-cosmic-950 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.55 0.15 65 / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.45 0.12 270 / 0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold-400 font-cinzel text-xs tracking-[0.4em] uppercase mb-4 block">
              Ancient Knowledge · Modern Seekers
            </span>
            <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-white mb-4">
              Sacred <span className="text-gold-400">Wisdom</span> Blog
            </h1>
            <p className="font-cormorant text-xl text-cosmic-300 max-w-xl mx-auto">
              Explore the profound depths of Vedic sciences — illuminating your
              path with ancient knowledge
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <a
          href="/"
          data-ocid="blog.back.link"
          className="inline-flex items-center gap-2 text-cosmic-400 hover:text-gold-400 transition-colors font-cinzel text-sm tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-ocid="blog.list"
        >
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              data-ocid={`blog.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-cosmic-900/60 border border-gold-400/10 rounded-2xl overflow-hidden hover:border-gold-400/30 transition-all duration-300 flex flex-col"
            >
              {/* Card Top */}
              <div className="relative bg-gradient-to-br from-cosmic-800/80 to-cosmic-900/80 p-8 flex items-center justify-center min-h-[140px] border-b border-gold-400/10">
                <span className="text-6xl select-none">{post.coverEmoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/60 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-cinzel tracking-wider px-3 py-1 rounded-full border ${
                      categoryColors[post.category] ??
                      "bg-gold-400/20 text-gold-300 border-gold-400/30"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-cosmic-500 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-cinzel text-base font-bold text-white group-hover:text-gold-300 transition-colors leading-snug mb-3 flex-1">
                  {post.title}
                </h2>

                <p className="font-cormorant text-cosmic-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold-400/10">
                  <span className="text-cosmic-500 text-xs">{post.date}</span>
                  <a
                    href={`/blog/${post.slug}`}
                    data-ocid={`blog.read.button.${i + 1}`}
                    className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-cinzel text-xs tracking-wider transition-colors group/link"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Read Article
                    <span className="group-hover/link:translate-x-0.5 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
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
    </div>
  );
}
