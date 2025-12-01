"use client";

import React, { useEffect, useState } from "react";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { ZenDoOneApp } from "@/components/apps/ZenDoOne";
import { SystemSettings } from "@/components/apps/SystemSettings";
import { ReadmeApp } from "@/components/apps/Readme";
import { useOS } from "@/context/OSContext";
import { Github } from "lucide-react";

export const Desktop = () => {
  const { zenDoOneIconRect, openApp } = useOS();
  
  // State to track if we are mounted and have initial position
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMounted(true);
  }, []);

  // Calculate dynamic position based on the real DOM rect of the menu bar icon
  // Window width is 360. We want to center it under the icon.
  // x = iconCenter - windowHalfWidth = (rect.left + rect.width/2) - 180
  let zenPos = { x: 0, y: 0 };
  if (zenDoOneIconRect) {
      const iconCenter = zenDoOneIconRect.left + zenDoOneIconRect.width / 2;
      zenPos = { x: iconCenter - 180, y: 0 };
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[url('/macos-wallpaper.jpg')] bg-cover bg-center">
      {/* Custom "Tahoe" Vibe Overlay - Deep Blue/Purple to simulate the concept art */}
      <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply pointer-events-none" />
      
      <MenuBar />

      {/* Windows Area - Only render when mounted to ensure correct initial positions */}
      {isMounted && (
        <div className="absolute inset-0 top-8 bottom-20 z-10 pointer-events-auto">
            
            {/* Desktop File Icons Layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto z-0">
                {/* Readme File */}
                <div 
                    className="group flex flex-col items-center gap-2 w-24 cursor-pointer p-2 rounded transition-colors"
                    onDoubleClick={() => openApp('readme')}
                    onClick={() => openApp('readme')} // Allow single click for touch/ease
                >
                     {/* Improved File Icon */}
                     <div className="w-16 h-20 relative transition-transform">
                         {/* Paper Background */}
                         <div className="absolute inset-0 bg-[#2D2D2D] rounded-lg shadow-md border border-white/20" />
                         
                         {/* Markdown Logo / Content Simulation */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pb-2 gap-1.5 opacity-80">
                             {/* MD Icon */}
                             <div className="w-8 h-5 border-2 border-white/40 rounded-[2px] flex items-center justify-between px-1">
                                <div className="text-[8px] font-bold text-white/60 leading-none">M</div>
                                <div className="w-[1px] h-3 bg-white/40" />
                                <div className="text-[8px] font-bold text-white/60 leading-none">↓</div>
                             </div>
                             {/* Lines */}
                             <div className="w-8 h-[2px] bg-white/20 rounded-full" />
                             <div className="w-8 h-[2px] bg-white/20 rounded-full" />
                             <div className="w-6 h-[2px] bg-white/20 rounded-full" />
                         </div>
                     </div>
                     
                     <span className="text-white text-[13px] font-medium drop-shadow-md px-2 rounded-sm text-center leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                        README.md
                     </span>
                </div>
            </div>

            {/* ZenDoOne Main App - Frameless Popover Style */}
            {/* Render ONLY when we have the initial rect to ensure correct positioning. */}
            {zenDoOneIconRect && (
                <div className="pointer-events-auto">
                    <Window 
                        key="zendoone-window" 
                        id="zendoone" 
                        width={360} 
                        height={520} 
                        titleHidden={true} 
                        frameless={true} 
                        initialPos={zenPos}
                        className="bg-transparent !shadow-none !border-none"
                    >
                        <ZenDoOneApp />
                    </Window>
                </div>
            )}

            {/* Discord Window */}
            <div className="pointer-events-auto">
                <Window id="discord" width={400} height={300}>
                <div className="h-full bg-[#36393f] text-white flex flex-col items-center justify-center p-6 text-center gap-4">
                    <svg width="48" height="48" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M511.957333 242.218667a564.437333 564.437333 0 0 0-274.602666 70.357333c61.994667-56.32 170.410667-88.746667 170.410666-88.746667l-10.24-10.368c-101.76 1.834667-193.92 73.386667-193.92 73.386667a977.493333 977.493333 0 0 0-96.938666 409.173333A263.552 263.552 0 0 0 199.68 772.266667c36.309333 17.834667 76.202667 26.88 116.565333 26.538666l42.794667-55.04a228.906667 228.906667 0 0 1-122.88-84.48A525.738667 525.738667 0 0 0 512 737.664c97.28 0 192.64-27.093333 275.797333-78.293333a228.906667 228.906667 0 0 1-122.837333 84.394666l42.794667 55.082667a259.370667 259.370667 0 0 0 116.608-26.538667 263.594667 263.594667 0 0 0 92.970666-76.245333 977.493333 977.493333 0 0 0-96.938666-409.258667S728.234667 215.168 626.474667 213.333333l-10.24 10.410667s108.373333 32.426667 170.410666 88.704A564.437333 564.437333 0 0 0 512 242.090667L512 242.218667z m-124.672 231.893333a72.149333 72.149333 0 0 1 51.2 23.936 74.496 74.496 0 0 1 19.285334 53.845333 72.661333 72.661333 0 0 1-18.218667 54.613334 70.442667 70.442667 0 0 1-51.925333 23.210666 69.461333 69.461333 0 0 1-51.925334-23.253333 71.765333 71.765333 0 0 1-18.218666-54.570667 75.349333 75.349333 0 0 1 18.986666-53.632 73.216 73.216 0 0 1 50.773334-24.149333h0.042666z m251.136 0c15.402667-1.450667 30.890667 1.92 44.373334 9.557333 13.568 7.68 24.490667 19.328 31.36 33.408a79.146667 79.146667 0 0 1-12.032 87.296 75.690667 75.690667 0 0 1-84.48 20.181334 77.056 77.056 0 0 1-35.584-28.586667 78.890667 78.890667 0 0 1-13.482667-44.074667c-0.810667-19.712 6.101333-38.954667 19.2-53.504a73.088 73.088 0 0 1 50.645333-24.32z" fill="#5865F2"/>
                    </svg>
                    <h2 className="text-xl font-bold">Join the Community</h2>
                    <p className="text-gray-400 text-sm">Give feedback, request features, or just say hi!</p>
                    <a href="https://discord.gg/sEUh4SMwAq" target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-md text-white font-medium transition-colors">
                    Open Discord
                    </a>
                </div>
                </Window>
            </div>

            {/* GitHub Window */}
            <div className="pointer-events-auto">
                <Window id="github" width={400} height={300}>
                    <div className="h-full bg-[#0d1117] text-white flex flex-col items-center justify-center p-6 text-center gap-4">
                    <Github size={48} className="text-white" />
                    <h2 className="text-xl font-bold">Open Source</h2>
                    <p className="text-gray-400 text-sm">Check out the code, leave a star, or fork the repo.</p>
                    <a href="https://github.com/Nimbus318/ZenDoOne" target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#238636] hover:bg-[#2ea043] rounded-md text-white font-medium transition-colors border border-[rgba(240,246,252,0.1)]">
                    View on GitHub
                    </a>
                </div>
                </Window>
            </div>

            {/* System Settings Window */}
            <div className="pointer-events-auto">
                <Window id="settings" width={640} height={480} titleHidden={true} frameless={true} className="bg-transparent !shadow-none !border-none">
                    <SystemSettings />
                </Window>
            </div>

            {/* Readme Window */}
            <div className="pointer-events-auto">
                <Window id="readme" width={600} height={650} titleHidden={true} frameless={true} className="bg-transparent !shadow-none !border-none">
                    <ReadmeApp />
                </Window>
            </div>
            
            {/* Finder Window (Placeholder) */}
            <div className="pointer-events-auto">
                <Window id="finder" width={600} height={400}>
                    <div className="h-full bg-[#1e1e1e] flex items-center justify-center text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl">📁</span>
                            <p>Finder is just for show :)</p>
                        </div>
                    </div>
                </Window>
            </div>
        </div>
      )}

      {/* Handwritten Overlay Layer - below windows */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-visible">
        <HandwrittenOverlay zenDoOneIconRect={zenDoOneIconRect} />
      </div>

      <Dock />
    </div>
  );
};

const HandwrittenOverlay = ({ zenDoOneIconRect }: { zenDoOneIconRect: DOMRect | null }) => {
  if (!zenDoOneIconRect) return null;

  // Calculate ZenDoOne MenuBar icon position
  const zenIconCenterX = zenDoOneIconRect.left + zenDoOneIconRect.width / 2;
  const zenIconBottom = zenDoOneIconRect.bottom;

  // Text position: below the MenuBar icon (finger emoji should be at icon center)
  const zenTextY = zenIconBottom - 80;

  // Discord icon in Dock - assuming window width and dock is centered
  // Dock order: Finder, ZenDoOne, [divider], Discord, Github
  // Dock is centered horizontally. Discord is ~52% from left (slightly right of center)
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

  // Discord icon position (assuming dock is at bottom center)
  // Dock center is at 50%, Discord is about 60px to the right of center for a ~240px dock
  const dockCenterX = viewportWidth / 2;
  const discordOffsetFromCenter = 30; // Discord is slightly right of center
  const discordIconX = dockCenterX + discordOffsetFromCenter;

  // Discord text position
  const discordTextY = viewportHeight - 130; // 130px from bottom

  return (
    <svg className="w-full h-full absolute top-0 left-0 pointer-events-none overflow-visible">
      {/* Text below ZenDoOne MenuBar Icon */}
      <g className="hidden md:block text-white">
          <text x={zenIconCenterX} y={zenTextY} className="font-hand text-2xl fill-white rotate-6" textAnchor="end" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
             <tspan x={zenIconCenterX} dy="0">I live up here now! 👆</tspan>
          </text>
      </g>

      {/* Text above Discord icon in Dock */}
      <g className="hidden md:block">
        <text x={discordIconX} y={discordTextY} className="font-hand text-2xl fill-white -rotate-3" textAnchor="middle" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
            <tspan x={discordIconX} dy="0">Chat on Discord 💬</tspan>
            <tspan x={discordIconX} dy="1.5em">& Fully Open Source</tspan>
        </text>
      </g>
    </svg>
  );
};
