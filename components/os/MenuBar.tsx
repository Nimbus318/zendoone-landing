"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wifi, Search, Command } from "lucide-react";
import { useOS } from "@/context/OSContext";
import { ZenDoOneStatusIcon } from "./Icons";

// Custom Battery Icon to look more like macOS
const MacBattery = () => (
    <div className="flex items-center gap-0.5 opacity-90">
        <div className="relative w-[22px] h-[10px] rounded-[2px] border border-white/40 p-[1px]">
             <div className="h-full w-[70%] bg-white rounded-[1px]" />
        </div>
        <div className="w-[1px] h-[4px] bg-white/40 rounded-r-[1px]" />
    </div>
)

const ControlCenterIcon = () => (
    <div className="w-[18px] h-[18px] relative opacity-90">
        <div className="absolute top-[3px] left-[2px] w-[14px] h-[5px] rounded-[2px] border border-white/80" />
        <div className="absolute bottom-[3px] left-[2px] w-[14px] h-[5px] rounded-[2px] border border-white/80" />
        <div className="absolute top-[3px] left-[4px] w-[5px] h-[5px] bg-white/80 rounded-[1px]" />
         <div className="absolute bottom-[3px] right-[4px] w-[5px] h-[5px] bg-white/80 rounded-[1px]" />
    </div>
)

export const MenuBar = () => {
  const { activeApp, windows, toggleApp, appStatuses, setZenDoOneIconRect } = useOS();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).replace(",", ""));
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track icon position for window alignment
  useEffect(() => {
      const updateRect = () => {
          if (iconRef.current) {
              const rect = iconRef.current.getBoundingClientRect();
              // Only update if rect has meaningful values to avoid 0,0 flashes
              if (rect.width > 0 && rect.x > 0) {
                  setZenDoOneIconRect(rect);
              }
          }
      };
      
      // Initial measurement with a small delay to ensure layout stability
      const timer = setTimeout(updateRect, 100);
      
      // Update on resize
      window.addEventListener('resize', updateRect);
      return () => {
          window.removeEventListener('resize', updateRect);
          clearTimeout(timer);
      };
  }, [setZenDoOneIconRect]);

  const appName = activeApp ? windows[activeApp]?.title : "Finder";
  const zendooneStatus = appStatuses['zendoone'];

  // Helper for menu items
  const MenuItem = ({ children, bold = false }: { children: React.ReactNode, bold?: boolean }) => (
      <div className={`px-2.5 h-[22px] flex items-center rounded-[4px] hover:bg-white/10 cursor-default transition-colors ${bold ? 'font-bold' : 'font-medium'}`}>
          {children}
      </div>
  )

  return (
    <div className="h-[28px] w-full bg-black/20 backdrop-blur-2xl fixed top-0 z-[100] flex items-center justify-between px-2 text-[13px] text-white shadow-sm select-none border-b border-white/5">
      <div className="flex items-center gap-0.5 h-full">
        <MenuItem>
            <span className="text-[17px] leading-none pb-0.5"></span>
        </MenuItem>
        
        <MenuItem bold>{appName}</MenuItem>
        
        <div className="hidden sm:flex items-center gap-0.5 opacity-90">
          <MenuItem>File</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem>View</MenuItem>
          <MenuItem>Go</MenuItem>
          <MenuItem>Window</MenuItem>
          <MenuItem>Help</MenuItem>
        </div>
      </div>

      <div className="flex items-center gap-3 px-2 h-full">
        <div className="hidden sm:flex items-center gap-4 opacity-90">
             {/* ZenDoOne Menu Bar Item - Placed to the left of system icons */}
             <div 
                ref={iconRef}
                onClick={() => toggleApp("zendoone")}
                className={`flex items-center gap-2 px-2 py-0.5 rounded-[4px] cursor-pointer transition-colors hover:bg-white/10 text-white`}
             >
                 <ZenDoOneStatusIcon className="w-[15px] h-[15px] text-white" />
                 {zendooneStatus && (
                     <span className="text-[12px] font-medium max-w-[150px] truncate pb-[1px]">
                         {zendooneStatus}
                     </span>
                 )}
             </div>

            <MacBattery />
            <Wifi size={16} strokeWidth={2} />
            <Search size={14} strokeWidth={2.5} />
            <ControlCenterIcon />
        </div>
        
        <div className="flex items-center gap-2 font-medium">
            <span className="hidden sm:inline">{date}</span>
            <span>{time}</span>
        </div>
      </div>
    </div>
  );
};