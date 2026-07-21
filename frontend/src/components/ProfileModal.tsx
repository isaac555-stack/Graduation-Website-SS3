import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Briefcase, Sparkles, Quote, Heart } from "lucide-react";
import { type Classmate } from "../data/classmates";

interface ProfileModalProps {
  classmate: Classmate | null;
  isOpen: boolean;
  onClose: () => void;
}

const getOptimizedModalUrl = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    "/upload/c_fill,g_face,w_900,h_1100,f_auto,q_auto/",
  );
};

export function ProfileModal({
  classmate,
  isOpen,
  onClose,
}: ProfileModalProps) {
  // Prevent body scrolling when the immersive modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!classmate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 overflow-hidden">
          {/* 1. Immersive Deep-Black Backdrop (Fades in quickly) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
          />

          {/* 2. Global Close Trigger */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 p-3 rounded-full bg-slate-900/50 hover:bg-slate-900/90 text-white/80 hover:text-white transition-all cursor-pointer z-50 border border-white/10 hover:border-amber-500/40 backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 duration-200"
          >
            <X className="size-5 md:size-6" />
          </button>

          {/* 3. Snappy Morphing Profile Card Container */}
          <motion.div
            layoutId={`card-container-${classmate.id}`}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
            }}
            className="relative w-full h-full md:h-[85vh] md:max-w-4xl lg:max-w-5xl bg-slate-950 border-none md:border md:border-white/10 md:rounded-[32px] shadow-2xl overflow-y-auto md:overflow-hidden z-10 flex flex-col md:grid md:grid-cols-12"
          >
            {/* LEFT PORTRAIT SECTION */}
            <div className="relative w-full aspect-4/5 md:aspect-auto md:col-span-5 md:h-full bg-slate-950 flex flex-col justify-end shrink-0 overflow-hidden md:rounded-l-[31px]">
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={getOptimizedModalUrl(classmate.imageUrl)}
                  alt={classmate.name}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </div>

              {/* Gradient Overlays using updated Tailwind syntax */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-slate-950/20 md:to-slate-950 z-10" />

              {/* Identity Card */}
              <div className="relative z-20 m-5 p-5 rounded-2xl bg-slate-950/30 border border-white/10 backdrop-blur-md shadow-lg">
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-black uppercase tracking-widest mb-2 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  <Sparkles className="size-3" /> Class of 2026
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight leading-none text-white">
                  {classmate.name}
                </h1>
                {classmate.nickname && (
                  <p className="text-amber-400 font-display font-bold text-sm md:text-lg mt-1">
                    A.K.A: "{classmate.nickname}"
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT PROFILE DETAILS */}
            <div className="w-full md:col-span-7 md:h-full p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-slate-950 text-white relative md:rounded-r-[31px]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15, delay: 0.05 }}
                className="max-w-xl w-full mx-auto space-y-8 py-4 md:py-0 relative z-10"
              >
                {/* Quote */}
                <div className="relative border-l-4 border-amber-400 pl-5 py-1">
                  <Quote className="absolute -top-4 -left-3 size-8 text-amber-500/10 scale-125 rotate-180" />
                  <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest block mb-1">
                    Graduation Quote
                  </span>
                  <p className="text-base md:text-xl font-display font-medium italic text-slate-100 leading-relaxed">
                    {classmate.quote
                      ? `"${classmate.quote}"`
                      : `"The best way to predict the future is to create it."`}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                      Name
                    </span>
                    <p className="text-sm md:text-base font-semibold text-slate-100">
                      {classmate.name}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
                      <Briefcase className="size-3.5 text-amber-400" /> Future
                      Ambition
                    </span>
                    <p className="text-sm md:text-base font-semibold text-slate-100">
                      {classmate.futureAmbition || "Next Gen Global Leader"}
                    </p>
                  </div>

                  {classmate.positionHeld && (
                    <div className="space-y-1 sm:col-span-2 p-4 bg-gradient-to-br from-amber-500/10 to-transparent rounded-xl border border-amber-500/10">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest flex items-center gap-1.5">
                        <Award className="size-4" /> Position Held
                      </span>
                      <p className="text-base font-display font-bold text-white">
                        {classmate.positionHeld}
                      </p>
                    </div>
                  )}
                </div>

                {/* Memories Card */}
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-5 shadow-md">
                  <span className="text-[10px] uppercase font-black text-amber-500 tracking-widest flex items-center gap-1.5 mb-2">
                    <Heart className="size-3.5 text-amber-500 fill-amber-500/10" />{" "}
                    Will Be Remembered For
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {classmate.rememberedFor ||
                      "Being an outstanding classmate and legendary friend."}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
