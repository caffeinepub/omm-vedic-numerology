export default function JustDialSection() {
  return (
    <section className="py-12 px-4 bg-cosmic-900/50 border-t border-gold-400/10">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">
            Find Us On
          </span>
          <h2 className="font-cinzel text-2xl font-bold text-white mt-2">
            Book via <span className="text-orange-400">JustDial</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mt-3" />
        </div>

        {/* JustDial rating display */}
        <div className="rounded-2xl border-2 border-orange-400/50 bg-black/50 p-6 mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-orange-500 text-white font-bold text-2xl px-4 py-2 rounded-lg">
              5.0
            </div>
            <div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-cosmic-300 text-sm">Rated on JustDial</p>
            </div>
          </div>
          <p className="text-cosmic-200 font-cormorant text-lg mb-4">
            We are listed on JustDial with top ratings. Book your consultation
            directly through JustDial or visit our profile to see all verified
            reviews.
          </p>
          <a
            href="https://jsdl.in/RSL-JCP1773854878"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="justdial.primary_button"
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-cinzel font-bold rounded-full transition-all duration-200 shadow-lg text-base"
          >
            📋 View &amp; Book on JustDial
          </a>
        </div>

        <p className="text-cosmic-500 text-xs font-cinzel">
          Verified ratings &amp; reviews from real clients on JustDial
        </p>
      </div>
    </section>
  );
}
