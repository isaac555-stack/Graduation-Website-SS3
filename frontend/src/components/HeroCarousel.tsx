import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Slide {
  title: string;
  category: string;
  imageUrl: string;
  badgeLabel: string;
  badgeLetter?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

// Optimized Cloudinary helper for hero carousel images (scales w_900 -> w_600)
const getOptimizedHeroUrl = (url: string) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/c_scale,w_600,f_auto,q_auto/");
};

export function HeroCarousel({
  slides,
  autoPlayInterval = 5000,
}: HeroCarouselProps) {
  // Safely initialize the Autoplay plugin with useMemo
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: autoPlayInterval, stopOnInteraction: false }),
    [autoPlayInterval],
  );

  // Single guard clause check
  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      <Carousel
        plugins={[autoplayPlugin]}
        opts={{
          loop: true,
        }}
        className="w-full group"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => {
            const isFirstSlide = index === 0;

            return (
              <CarouselItem
                key={index}
                className="pl-0 relative w-full aspect-4/5 sm:aspect-16/10 md:aspect-21/9 lg:aspect-3/1"
              >
                {/* Background Image */}
                {slide.imageUrl ? (
                  <img
                    src={getOptimizedHeroUrl(slide.imageUrl)}
                    alt={slide.category}
                    loading={isFirstSlide ? "eager" : "lazy"}
                    fetchPriority={isFirstSlide ? "high" : "auto"}
                    className="absolute inset-0 size-full object-cover brightness-[0.55] select-none"
                  />
                ) : (
                  <div className="absolute inset-0 size-full bg-slate-900 flex items-center justify-center text-6xl">
                    🎓
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center text-white z-10">
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-amber-400 drop-shadow-xs">
                    {slide.category}
                  </span>
                  <h1
                    className="mt-2 text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight md:leading-none drop-shadow-md max-w-sm sm:max-w-xl md:max-w-3xl"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                </div>

                {/* Badge Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 flex items-center gap-2 shadow-lg z-20">
                  <div className="size-5 sm:size-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[11px] sm:text-xs font-bold">
                    {slide.badgeLetter || "🎓"}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 whitespace-nowrap">
                    {slide.badgeLabel}
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* NAVIGATION ARROWS */}
        {slides.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 size-10 border-none bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 size-10 border-none bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 cursor-pointer hidden sm:flex" />
          </>
        )}
      </Carousel>
    </div>
  );
}
