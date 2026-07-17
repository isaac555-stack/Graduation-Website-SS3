import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Home,
  MessageSquare,
  User,
  LogOut,
  Settings,
  Music,
  VolumeX,
  Info,
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
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";

// 1. IMPORT LOGO FOR HEADER
import logo from "@/assets/logo.png";

export type TabValue = "feed" | "profiles" | "messages" | "about";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export function DashboardLayout({
  children,
  activeTab,
  onTabChange,
}: DashboardLayoutProps) {
  const confettiFired = useRef(false);

  // MUSIC PLAYER STATES & REFERENCES
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const SONG_URL =
    "https://res.cloudinary.com/dwuq9g7x7/video/upload/br_128,af_44100/v1784189488/Lord_Huron_-_The_Night_We_Met_LyricsUnderwater_mrjvdd.mp3";

  useEffect(() => {
    // Instantiate the audio instance globally
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // LISTEN FOR VIDEO PLAYBACK EVENT
    const handlePauseRequest = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false); // Keeps the sidebar/floating UI state in sync!
      }
    };

    window.addEventListener("pause-background-audio", handlePauseRequest);

    // Cleanup listeners and audio on unmount
    return () => {
      window.removeEventListener("pause-background-audio", handlePauseRequest);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const pauseVideoEvent = new Event("pause-active-video");
      window.dispatchEvent(pauseVideoEvent);

      if (audioRef.current.readyState === 0) {
        audioRef.current.load();
      }
      audioRef.current.play().catch((err) => {
        console.log("Audio playback blocked:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!confettiFired.current) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#10b981", "#ec4899", "#3b82f6", "#ffffff"],
      });
      confettiFired.current = true;
    }
  }, []);

  const navItems = [
    { label: "Feed", val: "feed" as TabValue, icon: Home }, // Contains the carousel and classmate picture uploads
    { label: "Class Profiles", val: "profiles" as TabValue, icon: User }, // Class profiles tab
    { label: "Messages", val: "messages" as TabValue, icon: MessageSquare },
    { label: "About", val: "about" as TabValue, icon: Info }, // Explore tab for awards and other content
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden">
        {/* DESKTOP SIDEBAR */}
        <Sidebar className="hidden md:flex border-r border-slate-200 bg-white">
          <SidebarHeader className="p-6">
            <div className="flex items-center justify-between gap-2 px-2">
              {/* BRAND: Custom elegant heading font family applied */}
              <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                SS3 Class 2k26
              </span>

              <button
                onClick={toggleMusic}
                title={isPlaying ? "Pause Anthem" : "Play Anthem"}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isPlaying
                    ? "bg-amber-50 border-amber-200 text-amber-600 animate-pulse"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                }`}
              >
                {isPlaying ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Music className="size-4" />
                )}
              </button>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.val;
                    return (
                      <SidebarMenuItem key={item.val}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => onTabChange(item.val)}
                          className="w-full flex items-center gap-3 px-3 py-5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        >
                          <Icon className="size-5 shrink-0" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-100">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => console.log("Settings Clicked")}
                  className="w-full flex items-center gap-3 px-3 py-5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <Settings className="size-5 shrink-0" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => console.log("Logout Clicked")}
                  className="w-full flex items-center gap-3 px-3 py-5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <LogOut className="size-5 shrink-0" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* MAIN CONTENT AREA */}
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-slate-50">
          {/* TOP STICKY HEADER */}
          <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md py-3 md:py-4 px-4 md:px-8 border-b border-slate-200/60">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
              <div className="flex items-start sm:items-center gap-3 md:gap-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain block shrink-0 mt-0.5 sm:mt-0"
                />

                <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h1 className="text-xl sm:text-2xl font-display font-black tracking-tight text-slate-900 truncate">
                      <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-rose-500 bg-clip-text text-transparent">
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

          {/* PAGE CONTENT CONTAINER */}
          <main className="flex-1 pb-24 md:pb-8 max-w-7xl mx-auto w-full p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>

        {/* MOBILE BOTTOM NAVIGATION + FLOATING MUSIC SWITCH */}
        <div className="md:hidden">
          <button
            onClick={toggleMusic}
            className={`fixed bottom-24 right-4 z-50 p-3.5 rounded-full shadow-lg border transition-all cursor-pointer ${
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

          <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-3.5 flex justify-between items-center z-40">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.val;
              return (
                <button
                  key={item.val}
                  onClick={() => onTabChange(item.val)}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    isActive
                      ? "text-slate-950 scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Icon className="size-6" />
                  <span className="text-[10px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </SidebarProvider>
  );
}
