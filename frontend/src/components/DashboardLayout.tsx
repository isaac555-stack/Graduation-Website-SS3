import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  MessageSquare,
  User,
  Music,
  VolumeX,
  Info,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";

import logo from "@/assets/logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const confettiFired = useRef(false);

  // MUSIC PLAYER STATES & REFERENCES
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const SONG_URL =
    "https://res.cloudinary.com/dwuq9g7x7/video/upload/br_128,af_44100/v1784189488/Lord_Huron_-_The_Night_We_Met_LyricsUnderwater_mrjvdd.mp3";

  useEffect(() => {
    // 1. Clean background initialization
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 1.0; // Ensure browser native volume is maximized
    audioRef.current = audio;

    const promptTimeout = setTimeout(() => {
      setShowMusicPrompt(true);
    }, 1800);

    const handlePauseRequest = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("pause-background-audio", handlePauseRequest);

    return () => {
      clearTimeout(promptTimeout);
      window.removeEventListener("pause-background-audio", handlePauseRequest);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // 2. Volume Boost handling via Gain Node
  const setupAudioBoost = () => {
    if (!audioRef.current || audioContextRef.current) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const gainNode = ctx.createGain();

      // Set volume gain multiplier (e.g., 2.5 = 250% volume boost)
      gainNode.gain.value = 2.5;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      audioContextRef.current = ctx;
    } catch (err) {
      console.log("Web Audio API boost fallback:", err);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    setShowMusicPrompt(false);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const pauseVideoEvent = new Event("pause-active-video");
      window.dispatchEvent(pauseVideoEvent);

      // Initialize gain boost on user gesture
      setupAudioBoost();
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current.resume();
      }

      audioRef.current.play().catch((err) => {
        console.log("Audio playback blocked:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer: number;

    if (!confettiFired.current) {
      timer = setTimeout(() => {
        if (!confettiFired.current) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#f59e0b", "#10b981", "#ec4899", "#3b82f6", "#ffffff"],
          });
          confettiFired.current = true;
        }
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const navItems = [
    { label: "Feed", path: "/", icon: Home },
    { label: "Class Profiles", path: "/profiles", icon: User },
    { label: "Messages", path: "/messages", icon: MessageSquare },
    { label: "About", path: "/about", icon: Info },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden">
        {/* DESKTOP SIDEBAR */}
        <Sidebar className="hidden md:flex border-r border-slate-200 bg-white">
          <SidebarHeader className="p-6">
            <div className="flex items-center justify-between gap-2 px-2 relative">
              <span className="font-display font-black text-xl tracking-tight bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                SS3 Class 2k26
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <Link to={item.path} className="w-full block">
                          <SidebarMenuButton
                            isActive={isActive}
                            className="w-full flex items-center gap-3 px-3 py-5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                          >
                            <Icon className="size-5 shrink-0" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* MAIN CONTENT AREA */}
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-slate-50">
          <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md py-3 md:py-4 px-4 md:px-8 border-b border-slate-200/60">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
              <div className="flex items-start sm:items-center gap-3 md:gap-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain block shrink-0 mt-0.5 sm:mt-0"
                />

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h1 className="text-xl sm:text-2xl font-display font-black tracking-tight text-slate-900 truncate">
                      <span className="bg-linear-to-r from-amber-500 via-amber-600 to-rose-500 bg-clip-text text-transparent">
                        Memories❤️
                      </span>
                    </h1>
                    <span className="bg-amber-100 text-amber-800 text-[9px] md:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                      Class of 2k26
                    </span>
                  </div>
                  <p className="hidden xs:block text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 truncate">
                    Captured moments, sign-out shirts, and graduation vibes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 pb-24 md:pb-8 max-w-7xl mx-auto w-full p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>

        {/* FLOATING MUSIC CONTROLLER CONTAINER */}
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3">
          {!isPlaying && showMusicPrompt && (
            <div className="mr-1 max-w-50 bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs font-medium border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="flex items-center gap-1.5 text-amber-400 font-bold mb-0.5">
                <Sparkles className="size-3.5" /> Turn On Music!
              </p>
              <span className="text-slate-400 text-[11px]">
                Tap the button below for the true feeling.
              </span>
            </div>
          )}

          <button
            onClick={toggleMusic}
            className={`p-3.5 rounded-full shadow-lg border transition-all cursor-pointer ${
              isPlaying
                ? "bg-amber-500 border-amber-600 text-white animate-pulse"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {isPlaying ? (
              <VolumeX className="size-5" />
            ) : (
              <Music className="size-5" />
            )}
          </button>
        </div>

        {/* MOBILE BOTTOM NAVIGATION */}
        <div className="md:hidden">
          <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-3.5 flex justify-between items-center z-40">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    isActive
                      ? "text-slate-950 scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Icon className="size-6" />
                  <span className="text-[10px] font-bold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </SidebarProvider>
  );
}
