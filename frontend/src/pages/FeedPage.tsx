import { useState, useMemo } from "react";
import { ChevronRight, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

import { HeroCarousel } from "@/components/HeroCarousel";
import { ImageModal } from "@/components/ImageModal";
import { VideoCard } from "@/components/VideoCard";
import { carouselSlides, photoGallery } from "@/data/feedpage";

import goodluckImage from "@/assets/goodluck.webp";

// Optimized Cloudinary URL helper
const getOptimizedUrl = (url: string, width: number = 400) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/c_scale,w_${width},f_auto,q_auto/`);
};

export default function FeedPage() {
  const [activeGalleryType, setActiveGalleryType] = useState<
    "featured" | "gallery" | null
  >(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#f59e0b", "#10b981", "#ec4899", "#3b82f6", "#ffffff"],
    });
  };

  const getAuthorFromUrl = (url: string): string | null => {
    if (!url || !url.includes("_-_")) return null;
    try {
      const filename = url.split("/").pop() || "";
      const nameSection = filename.split("_-_")[1].split(".")[0];
      const parts = nameSection.split("_");

      if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        if (lastPart.length === 6 || /^[a-z0-9]{6}$/i.test(lastPart)) {
          parts.pop();
        }
      }

      const cleanParts = parts.filter(
        (part) => isNaN(Number(part)) && part.length > 0,
      );

      return cleanParts
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");
    } catch (error) {
      console.error("Error parsing name from URL:", error);
      return null;
    }
  };

  const galleryItems = useMemo(() => {
    return photoGallery.map((item) => {
      const author = getAuthorFromUrl(item.url);
      return {
        id: item.id,
        imageUrl: item.url.includes("cloudinary.com")
          ? item.url.replace("/upload/", "/upload/c_scale,w_900,f_auto,q_auto/")
          : item.url,
        title: author
          ? `Captured by ${author}`
          : "Memories that never fade ❤️✨",
        extra: item.caption,
      };
    });
  }, []);

  const handleOpenPhoto = (
    galleryType: "featured" | "gallery",
    index: number,
  ) => {
    setActiveGalleryType(galleryType);
    setActiveIndex(index);
    triggerConfetti();
  };

  const handleCloseModal = () => {
    setActiveGalleryType(null);
    setActiveIndex(-1);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      <div className="max-w-7xl">
        {/* 1. HERO CAROUSEL */}
        <div className="mb-8">
          <HeroCarousel slides={carouselSlides} autoPlayInterval={6000} />
        </div>

        {/* 2. VIDEO SPOTLIGHT SECTION */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="size-3.5 fill-current" /> Featured
                Spotlight
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-1">
                Highlights from Art/Commercial Class
              </h2>
            </div>
            <button
              onClick={triggerConfetti}
              aria-label="Trigger confetti celebration"
              className="p-2 hover:bg-slate-100 rounded-full transition-colors group cursor-pointer"
            >
              <ChevronRight className="size-6 text-slate-500 group-hover:text-slate-900 transition-colors" />
            </button>
          </div>

          <VideoCard
            videoUrl="https://res.cloudinary.com/dwuq9g7x7/video/upload/f_auto,q_auto/v1784213176/Graduation1_gtxp9a.mp4"
            posterImageUrl="https://res.cloudinary.com/dwuq9g7x7/video/upload/c_scale,w_600,f_auto,q_auto/v1784213176/Graduation1_gtxp9a.jpg"
            title="Memories from Art/Commercial Class 🎓"
          />
        </div>

        {/* 3. MASONRY PHOTO GALLERY */}
        <div className="py-8 border-t border-slate-200/60 mt-4">
          <div className="flex items-center gap-2 mb-6">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="size-3.5 fill-current" /> Forever Memories
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 mt-1">
                Classmate Uploads
              </h2>
            </div>
          </div>

          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {photoGallery.map((photo, idx) => {
              const authorName = getAuthorFromUrl(photo.url);

              return (
                <div
                  key={photo.id}
                  onClick={() => handleOpenPhoto("gallery", idx)}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl shadow-xs transition-transform duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer bg-slate-200/60 min-h-[180px]"
                >
                  <img
                    alt={photo.caption || "Classmate uploaded memory"}
                    src={getOptimizedUrl(photo.url, 400)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 select-none block"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end text-white transition-opacity duration-300 pointer-events-none">
                    <p className="text-xs font-bold tracking-wide mb-1 drop-shadow-xs text-amber-400 font-display italic">
                      {authorName
                        ? `Captured by ${authorName}`
                        : "Memories that never fade ❤️✨"}
                    </p>

                    <div className="flex items-center gap-1.5 text-rose-500">
                      <Heart className="size-4 fill-current drop-shadow-xs" />
                      <span className="text-[10px] text-white font-bold drop-shadow-xs">
                        {photo.likes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. GOODLUCK SIGN-OFF SECTION */}
        <div className="mt-12 mb-8 p-4 md:p-8 rounded-3xl bg-white shadow-xs border border-slate-100 flex flex-col items-center text-center">
          <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden mb-6 shadow-inner bg-slate-100">
            <img
              alt="Goodluck everyone"
              src={goodluckImage}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover select-none"
            />
          </div>

          <p className="text-xl md:text-3xl font-display font-black text-slate-900 leading-tight">
            It's been an unforgettable journey.
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 bg-clip-text text-transparent">
              Goodluck Everyone! ❤️✨
            </span>
          </p>
          <p className="text-xs md:text-sm text-slate-500 mt-3 max-w-md font-medium">
            Cheers to the memories we've made and the brilliant futures ahead.
          </p>
        </div>

        {/* 5. IMAGE LIGHTBOX MODAL */}
        <ImageModal
          isOpen={activeGalleryType !== null && activeIndex !== -1}
          currentIndex={activeIndex}
          items={galleryItems}
          onIndexChange={(newIndex) => setActiveIndex(newIndex)}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
