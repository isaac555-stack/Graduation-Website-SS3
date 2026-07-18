import { Sparkles, Users, Award, Camera } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 md:py-8 space-y-12">
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 inline-flex items-center gap-1.5">
          <Sparkles className="size-3.5 fill-current text-amber-500" /> Our
          Journey
        </span>
        <h1 className="text-3xl md:text-3xl font-display font-black text-slate-900 tracking-tight leading-tight">
          Why We Built This Space
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          A website platform for the SS3 Class of 2026 FloraHome Schools to
          celebrate our school years, preserve our memories, and honor every
          single graduate.
        </p>
      </div>

      {/* 2. THE CORE INSCRIPTION / MISSION STATEMENT */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 md:p-12 text-center text-white shadow-xl">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-1/4 size-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 size-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4 text-center">
          <span className="text-6xl block mb-2">🎓</span>

          <p className="text-2xl md:text-3xl font-display font-semibold italic text-amber-400 leading-relaxed">
            "Ad Astra Per Aspera"
          </p>

          <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-400">
            Through hardships to the stars
          </p>

          <div className="h-px w-24 bg-slate-800 mx-auto my-4" />

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            What started as classrooms filled with laughter, exams, and casual
            jokes has brought us to our final moments as the SS3 graduating
            class. This space is our collective archive—a beautiful reminder of
            our youth, the dreams we carry, and the incredible futures we are
            about to build, step by step, with God by our side.
          </p>
          {/* Styled Developer/Author credit */}
          <div className="pt-4">
            <p className="text-xs font-medium tracking-wider uppercase text-amber-500/80">
              Built with ❤️ by{" "}
              <span className="font-bold text-amber-400">Isaac Opara</span>{" "}
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-slate-400 normal-case ml-1">
                AKA Ziko
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. CORE FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit">
            <Users className="size-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Digital Yearbook
          </h3>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            A beautiful, scrollable website hosting every classmate's identity,
            final ambitions, quotes, and positions held. No paper book can
            capture our live spirits quite like this.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl w-fit">
            <Camera className="size-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Classmate Uploads
          </h3>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            A visual wall of candid moments captured throughout our school days.
            Browse through classmate-uploaded snapshots that keep our daily
            memories alive.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
            <Award className="size-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900">
            Media Spotlights
          </h3>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            Listen to our curated background anthem while you browse, and watch
            custom video highlights showcasing special moments from our art,
            commercial, and science classes.
          </p>
        </div>
      </div>
    </div>
  );
}
