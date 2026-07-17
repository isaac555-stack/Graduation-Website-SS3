import { useState, useEffect, useRef } from "react";
import { Play, Loader2 } from "lucide-react";

interface VideoCardProps {
  videoUrl: string; // Feed this an optimized .mp4 URL
  posterImageUrl: string;
  title: string;
}

export function VideoCard({ videoUrl, posterImageUrl, title }: VideoCardProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. LISTEN FOR MUSIC TOGGLE EVENT (Pause video if background music starts playing)
  useEffect(() => {
    const handlePauseVideo = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    window.addEventListener("pause-active-video", handlePauseVideo);

    return () => {
      window.removeEventListener("pause-active-video", handlePauseVideo);
    };
  }, []);

  const handlePlayClick = () => {
    // 2. DISPATCH MUSIC PAUSE EVENT (Stop the background class anthem)
    const pauseEvent = new Event("pause-background-audio");
    window.dispatchEvent(pauseEvent);

    // 3. Start loading and playing the video
    setHasStarted(true);
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    videoRef.current?.play().catch((err) => console.log("Play failed:", err));
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 bg-black group">
      {/* LIGHTWEIGHT PREVIEW STATE (Zero video data downloaded on page load) */}
      {!hasStarted && (
        <div className="absolute inset-0 w-full h-full z-10">
          <img
            src={posterImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

          <button
            onClick={handlePlayClick}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 m-auto size-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-amber-500 hover:text-white transition-all cursor-pointer z-20"
          >
            <Play className="size-6 fill-current ml-1" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white z-20">
            <h3 className="font-bold text-sm md:text-base drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* DIRECT HTML5 VIDEO PLAYER (No heavy library, plays 3MB MP4 instantly) */}
      {hasStarted && (
        <div className="w-full h-full relative aspect-video">
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center z-10">
              <Loader2 className="size-8 text-amber-500 animate-spin" />
            </div>
          )}
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            playsInline
            autoPlay
            onCanPlay={handleVideoCanPlay}
            className="w-full h-full object-contain absolute top-0 left-0"
            controlsList="nodownload"
          />
        </div>
      )}
    </div>
  );
}
