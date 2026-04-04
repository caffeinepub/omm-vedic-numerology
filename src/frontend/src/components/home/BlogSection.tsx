import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import { blogPosts } from "../../data/blogPosts";

const categoryColors: Record<string, string> = {
  Numerology: "bg-gold-400/20 text-gold-300 border-gold-400/30",
  Tarot: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Vastu: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  Pronology: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "Watch Analysis": "bg-rose-500/20 text-rose-300 border-rose-400/30",
  "All Services": "bg-amber-500/20 text-amber-300 border-amber-400/30",
};

export default function BlogSection() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="py-20 px-4 bg-cosmic-900/30 border-t border-gold-400/10 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold-400 font-cinzel text-xs tracking-[0.4em] uppercase mb-3 block">
            Ancient Knowledge
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-4">
            Sacred Wisdom &amp; <span className="text-gold-400">Insights</span>
          </h2>
          <p className="font-cormorant text-cosmic-300 text-lg max-w-xl mx-auto">
            Explore our blog for ancient knowledge — illuminating your path with
            timeless Vedic sciences
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
        </motion.div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          data-ocid="blog.preview.list"
        >
          {featured.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-ocid={`blog.preview.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-cosmic-900/60 border border-gold-400/10 rounded-2xl overflow-hidden hover:border-gold-400/30 transition-all duration-300 flex flex-col"
            >
              <div className="bg-gradient-to-br from-cosmic-800/80 to-cosmic-900/80 p-8 flex items-center justify-center min-h-[120px] border-b border-gold-400/10">
                <span className="text-5xl select-none">{post.coverEmoji}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-cinzel tracking-wider px-2 py-0.5 rounded-full border ${
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
                <h3 className="font-cinzel text-sm font-bold text-white group-hover:text-gold-300 transition-colors leading-snug mb-3 flex-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gold-400/80 group-hover:text-gold-400 font-cinzel text-xs tracking-wider transition-colors mt-auto pt-3 border-t border-gold-400/10">
                  <BookOpen className="w-3 h-3" />
                  Read Article
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a
            href="/blog"
            data-ocid="blog.view_all.button"
            className="inline-flex items-center gap-2 border border-gold-400/40 hover:border-gold-400 hover:bg-gold-400/10 text-gold-400 font-cinzel text-sm tracking-wider px-8 py-3 rounded-lg transition-all duration-200"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
