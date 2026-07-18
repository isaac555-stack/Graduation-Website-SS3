import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MemoryItem {
  id: string | number;
  imageUrl: string;
  title: string;
  extra?: string;
  category?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  currentIndex: number;
  items: MemoryItem[];
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function ImageModal({
  isOpen,
  currentIndex,
  items,
  onIndexChange,
  onClose,
}: ImageModalProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeItem = items[currentIndex];

  // FIX: Official React pattern for adjusting state when a prop changes.
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  if (activeItem && activeItem.imageUrl !== prevUrl) {
    setPrevUrl(activeItem.imageUrl);
    setImageLoading(true);
  }

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, items.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  // Keyboard navigation setup
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Asynchronous cache checker effect
  useEffect(() => {
    if (!isOpen || !activeItem) return;

    const checkCache = setTimeout(() => {
      if (imgRef.current && imgRef.current.complete) {
        setImageLoading(false);
      }
    }, 50);

    return () => clearTimeout(checkCache);
  }, [activeItem, isOpen]);

  // Touch handlers for mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!activeItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 z-50 w-screen h-dvh max-w-none m-0 rounded-none border-none ring-0 bg-black p-0 flex flex-col items-center justify-center animate-none"
      >
        <div className="sr-only">
          <DialogDescription>
            {activeItem.extra || "Class memory photo"}
          </DialogDescription>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
        >
          <X className="size-6" />
        </button>

        {/* Desktop Navigation Left Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
          >
            <ChevronLeft className="size-8" />
          </button>
        )}

        {/* Desktop Navigation Right Button */}
        {currentIndex < items.length - 1 && (
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
          >
            <ChevronRight className="size-8" />
          </button>
        )}

        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-8 select-none"
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 z-10 pointer-events-none">
              <Skeleton className="w-full max-w-2xl h-[60vh] md:h-[75vh] bg-neutral-900 rounded-none animate-pulse" />
            </div>
          )}

          {/* Image Canvas Wrapping Box */}
          <div className="relative max-h-[80vh] max-w-full flex items-center justify-center">
            {/* Mobile/Touch Quick Arrow Overlay: Previous */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="flex md:hidden absolute left-2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/80 active:scale-95 transition-all z-30 border border-white/5"
              >
                <ChevronLeft className="size-5" />
              </button>
            )}

            {/* Mobile/Touch Quick Arrow Overlay: Next */}
            {currentIndex < items.length - 1 && (
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="flex md:hidden absolute right-2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/80 active:scale-95 transition-all z-30 border border-white/5"
              >
                <ChevronRight className="size-5" />
              </button>
            )}

            <img
              ref={imgRef}
              src={activeItem.imageUrl}
              alt={activeItem.title}
              onLoad={() => setImageLoading(false)}
              className={`max-h-[80vh] max-w-full object-contain transition-all duration-300 ${
                imageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white tracking-widest z-40">
            {currentIndex + 1} / {items.length}
          </div>

          {!imageLoading && (activeItem.title || activeItem.extra) && (
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent pt-24 pb-12 px-6 flex flex-col items-center gap-1.5 justify-center z-20">
              {activeItem.title && (
                <DialogTitle className="w-full max-w-xl text-white text-base md:text-lg font-bold text-center drop-shadow-md">
                  {activeItem.title}
                </DialogTitle>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
