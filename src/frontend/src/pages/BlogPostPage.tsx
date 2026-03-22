import { useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import Header from "../components/layout/Header";
import { blogPosts } from "../data/blogPosts";

const categoryColors: Record<string, string> = {
  Numerology: "bg-gold-400/20 text-gold-300 border-gold-400/30",
  Tarot: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Vastu: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Pronology: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "Watch Analysis": "bg-rose-500/20 text-rose-300 border-rose-400/30",
  "All Services": "bg-amber-500/20 text-amber-300 border-amber-400/30",
};

export default function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-cosmic-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-cinzel text-gold-400 text-2xl mb-4">
            Article Not Found
          </p>
          <a
            href="/blog"
            className="text-cosmic-400 hover:text-gold-400 transition-colors font-cinzel text-sm"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-950 text-white">
      <Header
        onNavigate={() => {
          window.location.href = "/";
        }}
      />

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <a
            href="/blog"
            data-ocid="blogpost.back.link"
            className="inline-flex items-center gap-2 text-cosmic-400 hover:text-gold-400 transition-colors font-cinzel text-sm tracking-wider mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <main>
              {/* Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="text-7xl mb-6 text-center">
                  {post.coverEmoji}
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className={`text-xs font-cinzel tracking-wider px-3 py-1 rounded-full border ${
                      categoryColors[post.category] ??
                      "bg-gold-400/20 text-gold-300 border-gold-400/30"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-cosmic-500 text-xs flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="text-cosmic-500 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h1 className="font-cinzel text-2xl md:text-4xl font-bold text-white leading-snug mb-6">
                  {post.title}
                </h1>
                <p className="font-cormorant text-lg text-cosmic-300 leading-relaxed border-l-2 border-gold-400/40 pl-4">
                  {post.excerpt}
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent mt-8" />
              </motion.div>

              {/* Article Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {post.content.map((section, i) => (
                  <div
                    key={section.heading ?? `body-${i}`}
                    className="prose-cosmic"
                  >
                    {section.heading && (
                      <h2 className="font-cinzel text-lg md:text-xl font-bold text-gold-300 mb-3 flex items-start gap-3">
                        <span className="text-gold-400/40 text-sm mt-1">✦</span>
                        {section.heading}
                      </h2>
                    )}
                    <p className="font-cormorant text-cosmic-200 text-lg leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            </main>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-28 space-y-4"
              >
                <div className="bg-gradient-to-b from-cosmic-900 to-cosmic-900/80 border border-gold-400/30 rounded-2xl p-6 text-center shadow-lg">
                  <div className="text-3xl mb-3">🔮</div>
                  <h3 className="font-cinzel text-base font-bold text-gold-300 mb-2">
                    Book Your Consultation
                  </h3>
                  <div className="text-gold-400 font-cinzel text-2xl font-bold mb-3">
                    ₹400
                  </div>
                  <p className="font-cormorant text-cosmic-400 text-sm mb-5 leading-relaxed">
                    Receive expert guidance from our Vedic specialists.
                    Personalized insights for your life's journey.
                  </p>
                  <a
                    href="https://wa.me/918689838590?text=I%20want%20to%20book%20a%20consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="blogpost.whatsapp.button"
                    className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel text-xs tracking-wider py-3 px-4 rounded-lg transition-all duration-200 mb-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href="/#booking"
                    data-ocid="blogpost.book.button"
                    className="flex items-center justify-center gap-2 w-full border border-gold-400/50 hover:border-gold-400 hover:bg-gold-400/10 text-gold-400 font-cinzel text-xs tracking-wider py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Book Appointment
                  </a>
                </div>

                {/* Services Quick Links */}
                <div className="bg-cosmic-900/60 border border-gold-400/10 rounded-2xl p-5">
                  <h4 className="font-cinzel text-xs tracking-wider text-gold-400/70 uppercase mb-4">
                    Our Services
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "🔢 Numerology",
                      "🃏 Tarot Reading",
                      "🏠 Vastu Shastra",
                      "🔊 Pronology",
                      "⌚ Watch Analysis",
                    ].map((svc) => (
                      <li key={svc}>
                        <a
                          href="/#booking"
                          className="font-cormorant text-sm text-cosmic-400 hover:text-gold-300 transition-colors block py-1"
                        >
                          {svc}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </aside>
          </div>

          {/* Related Posts */}
          <section className="mt-16 pt-10 border-t border-gold-400/10">
            <h3 className="font-cinzel text-xl font-bold text-white mb-8">
              More <span className="text-gold-400">Sacred Wisdom</span>
            </h3>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="blogpost.related.list"
            >
              {related.map((rp, i) => (
                <a
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  data-ocid={`blogpost.related.item.${i + 1}`}
                  className="group bg-cosmic-900/60 border border-gold-400/10 hover:border-gold-400/30 rounded-xl p-5 transition-all duration-200"
                >
                  <div className="text-3xl mb-3">{rp.coverEmoji}</div>
                  <span
                    className={`text-xs font-cinzel tracking-wider px-2 py-0.5 rounded-full border mb-2 inline-block ${
                      categoryColors[rp.category] ??
                      "bg-gold-400/20 text-gold-300 border-gold-400/30"
                    }`}
                  >
                    {rp.category}
                  </span>
                  <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-gold-300 transition-colors leading-snug mt-2">
                    {rp.title}
                  </h4>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

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
