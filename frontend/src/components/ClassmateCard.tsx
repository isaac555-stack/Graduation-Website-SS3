import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { type Classmate } from "@/data/classmates";
import { View, GraduationCap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ClassmateCardProps {
  classmate: Classmate;
  onClick: (id: string) => void;
}

const getOptimizedAvatarUrl = (url: string, size: number = 150) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/c_fill,w_${size},h_${size},f_auto,q_auto/`,
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export function ClassmateCard({ classmate, onClick }: ClassmateCardProps) {
  return (
    // 1. Turned Card into a motion.div and added layoutId for container morphing
    <motion.div
      layoutId={`card-container-${classmate.id}`}
      onClick={() => onClick(classmate.id)}
      className="w-full"
    >
      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] cursor-pointer w-full">
        {/* Decorative Top-Right Corner Highlight */}
        <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-amber-500/5 to-transparent transition-all duration-500 group-hover:scale-110" />

        {/* Top Section: Avatar & Info */}
        <div className="relative z-10 flex flex-col gap-5">
          {/* Avatar Area with Premium Gradient Ring */}
          <div className="relative self-start">
            {/* Unified relative wrapper for the avatar + cap */}
            <div className="relative">
              {/* 1. Avatar Motion Container (Lower z-index) */}
              <motion.div
                layoutId={`card-image-container-${classmate.id}`}
                className="relative shrink-0 z-10"
              >
                <Avatar className="size-20 select-none ring-4 ring-slate-50 transition-all duration-500 group-hover:ring-amber-100">
                  <AvatarImage
                    src={getOptimizedAvatarUrl(classmate.imageUrl, 160)}
                    alt={classmate.name}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Elegant Fallback with Amber Gradient */}
                  <AvatarFallback className="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-900 font-black text-base tracking-wider">
                    {getInitials(classmate.name)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* 2. Floating Graduation Cap Badge (Higher z-index & forced on top) */}
              <div className="absolute -bottom-1 -right-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <GraduationCap className="size-3.5" />
              </div>
            </div>
          </div>

          {/* Name and Nickname */}
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-slate-900 text-xl tracking-tight leading-snug flex items-center gap-2 flex-wrap">
              {classmate.name}
              {classmate.nickname && (
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full">
                  {classmate.nickname}
                </span>
              )}
            </h3>

            {/* Senior Quote Section with Elegant Quote Icon */}
            <div className="relative pt-1 min-h-[44px]">
              {classmate.quote ? (
                <p className="text-sm font-medium italic text-slate-500 line-clamp-2 pl-4 border-l-2 border-amber-200 group-hover:border-amber-400 transition-colors duration-300">
                  "{classmate.quote}"
                </p>
              ) : (
                <p className="text-sm font-semibold tracking-wider text-amber-600/60 uppercase text-xs pl-4 border-l-2 border-slate-100">
                  Class of 2026
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Primary Action Button */}
        <div className="relative z-10 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(classmate.id);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-50 hover:bg-amber-500 text-slate-700 hover:text-white font-bold text-sm py-3.5 px-4 transition-all duration-300 shadow-sm border border-slate-100 hover:border-amber-500"
          >
            <View className="size-4 transition-transform duration-300 group-hover:scale-110" />
            <span>View Profile</span>
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
