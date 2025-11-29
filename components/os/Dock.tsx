"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useOS } from "@/context/OSContext";
import { ZenDoOneIcon, GithubIcon, DiscordIcon, FinderIcon } from "./Icons";

export const Dock = () => {
  const { openApp, windows } = useOS();
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 mb-2">
      {/* 
         Dock Container 
         Restored using standard Tailwind utilities for maximum compatibility.
         bg-black/20 + backdrop-blur-2xl is the gold standard for dark mode glass.
      */}
      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 px-3 py-3 h-[58px] bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl box-content"
        style={{ 
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.5)'
        }}
      >
        <DockItem mouseX={mouseX} id="finder" icon={<FinderIcon className="w-full h-full" />} onClick={() => openApp("finder")} isOpen={windows.finder.isOpen} />
        <DockItem mouseX={mouseX} id="zendoone" icon={<ZenDoOneIcon className="w-full h-full drop-shadow-md" />} onClick={() => openApp("zendoone")} isOpen={windows.zendoone.isOpen} />
        
        {/* Divider */}
        <div className="w-[1px] h-10 bg-white/10 mx-1 self-center border-r border-black/20" />
        
        <DockItem mouseX={mouseX} id="discord" icon={<DiscordIcon className="w-full h-full" />} onClick={() => openApp("discord")} isOpen={windows.discord.isOpen} />
        <DockItem mouseX={mouseX} id="github" icon={<GithubIcon className="w-full h-full" />} onClick={() => openApp("github")} isOpen={windows.github.isOpen} />
      </div>
    </div>
  );
};

const DockItem = ({ mouseX, icon, onClick, isOpen, id }: { mouseX: MotionValue; icon: React.ReactNode; onClick: () => void; isOpen: boolean; id: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base size 58px matches the container content height perfectly for alignment
  const widthSync = useTransform(distance, [-150, 0, 150], [58, 90, 58]); 
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center justify-end gap-1 group">
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className="rounded-[14px] flex items-center justify-center cursor-pointer transition-colors will-change-transform"
            onClick={onClick}
            whileTap={{ scale: 0.85, filter: "brightness(0.8)" }}
        >
            {/* Icon Container */}
            <div className="w-full h-full">
                {icon}
            </div>
        </motion.div>
        
        {/* Indicator Dot */}
        <div className={`w-1 h-1 rounded-full bg-white/80 absolute -bottom-1.5 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
