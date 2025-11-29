"use client";

import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useOS, AppID } from "@/context/OSContext";

interface WindowProps {
  id: AppID;
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
  titleHidden?: boolean;
  frameless?: boolean;
  initialPos?: { x: number; y: number };
}

export const Window = ({ 
    id, 
    children, 
    width = 600, 
    height = 400, 
    className = "", 
    titleHidden = false,
    frameless = false,
    initialPos
}: WindowProps) => {
  const { windows, closeApp, minimizeApp, focusApp } = useOS();
  const windowState = windows[id];
  const nodeRef = useRef(null); // Ref for the Draggable element (Outer Div)
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  
  // Default positioning logic
  const defaultPos = initialPos || (typeof window !== 'undefined' ? {
      x: Math.max(0, (window.innerWidth - width) / 2),
      y: Math.max(0, (window.innerHeight - height) / 2 - 50)
  } : { x: 100, y: 100 });

  if (!windowState.isOpen) return null;

  // Styles for the INNER content container (motion.div)
  // The OUTER container handles position via Draggable transform
  const innerStyles = frameless 
    ? {
        width: "100%",
        height: "100%",
        filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.5))"
      }
    : {
        width: "100%",
        height: "100%",
        boxShadow: 'var(--shadow-mac-window)',
        border: '1px solid rgba(0,0,0,0.2)'
      };

  const bgClass = frameless 
    ? "rounded-xl overflow-hidden" 
    : "rounded-xl overflow-hidden bg-[#1E1E1E] flex flex-col";

  return (
    <AnimatePresence>
      {!windowState.isMinimized && (
        <Draggable
          handle=".window-handle"
          nodeRef={nodeRef}
          defaultPosition={defaultPos}
          onMouseDown={() => focusApp(id)}
        >
          {/* OUTER DIV: Handles Position (Transform) via Draggable */}
          <div 
            ref={nodeRef}
            style={{ 
                width, 
                height, 
                zIndex: windowState.zIndex,
                position: 'absolute' 
            }}
            // Important: No motion props here!
          >
            {/* INNER DIV: Handles Animation (Scale/Opacity) via Framer Motion */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.90, opacity: 0, transition: { duration: 0.15 } }}
                style={innerStyles}
                className={`${bgClass} ${className}`}
                onClick={() => focusApp(id)}
            >
                {/* Standard Traffic Lights (Only if not frameless) */}
                {!frameless && (
                    <div 
                        className={`window-handle h-[52px] absolute top-0 left-0 w-full z-50 flex items-start pt-[13px] px-[13px] group cursor-default`}
                        onMouseEnter={() => setIsHoveringControls(true)}
                        onMouseLeave={() => setIsHoveringControls(false)}
                    >
                    {/* Drag Handle Overlay */}
                    <div className="absolute inset-0 z-0" />

                    <div className="flex items-center gap-2 z-10 relative">
                        <div 
                            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                            className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75"
                        >
                        <X size={6} strokeWidth={3} className={`text-[#4d0000] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                        </div>
                        <div 
                            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                            className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] border border-[#D89E24] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75"
                        >
                            <Minus size={6} strokeWidth={3} className={`text-[#5c3a00] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                        </div>
                        <div 
                            className="w-[12px] h-[12px] rounded-full bg-[#28C840] border border-[#1AAB29] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75"
                        >
                            <Maximize2 size={6} strokeWidth={3} className={`text-[#0a5012] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                        </div>
                    </div>
                    
                    {!titleHidden && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                            <span className="text-[13px] font-semibold text-white/50 tracking-wide shadow-black/10 drop-shadow-sm">
                                {windowState.title}
                            </span>
                        </div>
                    )}
                    </div>
                )}

                {/* Window Content */}
                <div className={`relative h-full w-full ${!frameless ? 'flex-1' : ''}`}>
                  {children}
                </div>
            </motion.div>
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};