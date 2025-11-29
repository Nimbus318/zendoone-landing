"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { HeaderView, ParkingLotSection, DailyGoalsView, ParkingItem, DailyGoal, HistoryOverlay, HistoryItem, TimerDisplay, SuggestionCard } from "./ZenDoOneComponents";
import { Check, ChevronLeft, CheckCircle2, BadgeCheck } from "lucide-react";
import { useOS } from "@/context/OSContext";

type AppMode = "idle" | "focusing" | "completed";

// --- Extracted Components ---

interface IdleViewProps {
    dailyGoals: DailyGoal[];
    setDailyGoals: (goals: DailyGoal[]) => void;
    startFocus: (task: string) => void;
}

const IdleView = ({ dailyGoals, setDailyGoals, startFocus }: IdleViewProps) => {
    const [text, setText] = useState("");

    return (
        <motion.div 
            className="flex flex-col items-center justify-center w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Title & Input Group */}
            <div className="flex flex-col items-center gap-4 w-full px-8">
                {/* Title */}
                <div className="text-[13px] font-bold tracking-[1.5px] uppercase text-center leading-relaxed" style={{ color: "#95A4E5" }}>
                    What is the One Thing?
                </div>
                
                <div className="w-full relative flex justify-center">
                    {/* Placeholder Text */}
                    {text === "" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[24px] font-medium opacity-30 text-white">Type here...</span>
                        </div>
                    )}
                    
                    <input 
                        autoFocus
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-transparent text-center text-[24px] font-medium text-white outline-none border-none py-1 caret-white"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') startFocus(e.currentTarget.value);
                        }}
                    />
                </div>

                {/* "Press Enter" Hint */}
                <AnimatePresence>
                    {text.trim().length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] text-white/60 px-2 py-1 rounded-[4px]"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        >
                            Press Enter to Start
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Daily Goals */}
            <motion.div 
                animate={{ opacity: text ? 0 : 1, pointerEvents: text ? 'none' : 'auto' }} 
                className="mt-10 w-full flex justify-center"
            >
                <DailyGoalsView 
                    goals={dailyGoals} 
                    onAdd={(text) => setDailyGoals([...dailyGoals, { id: Date.now().toString(), content: text }])}
                    onStart={startFocus}
                    onDelete={(id) => setDailyGoals(dailyGoals.filter(g => g.id !== id))}
                />
            </motion.div>
        </motion.div>
    );
};

interface FocusingViewProps {
    currentTask: string;
    completeTask: () => void;
}

const FocusingView = ({ currentTask, completeTask }: FocusingViewProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <motion.div 
          className="flex flex-col items-center w-full h-full justify-center pb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
      >
           {/* Big Check Button */}
          <button 
              onClick={completeTask}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative group mb-6 focus:outline-none"
          >
              {/* Outer Glow (Blur) */}
              {isHovering && (
                  <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ backgroundColor: "#A5B4FD" }} />
              )}
              
              {/* Ring */}
              <div className="w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center relative overflow-hidden transition-all duration-200" style={{ borderColor: "rgba(165, 180, 253, 0.3)" }}>
                   {/* Inner Circle Fill */}
                   <div 
                      className={`absolute inset-0 rounded-full transition-all duration-250 ease-out ${isHovering ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} 
                      style={{ backgroundColor: "#A5B4FD" }}
                   />
                   <Check size={32} className={`relative z-10 transition-colors duration-200 ${isHovering ? 'text-white' : 'text-[#A5B4FD]/80'}`} />
              </div>
          </button>

          <h2 className="text-[20px] font-medium text-white text-center px-5 mb-3 leading-tight line-clamp-2">
              {currentTask}
          </h2>

          {/* Timer Capsule */}
          <TimerDisplay isActive={true} />
      </motion.div>
    );
}

interface CompletedViewProps {
    parkingItems: ParkingItem[];
    setParkingItems: React.Dispatch<React.SetStateAction<ParkingItem[]>>;
    startFocus: (task: string) => void;
    resetToIdle: () => void;
}

const FilledSealCheck = ({ size, color }: { size: number, color: string }) => (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="checkmarkMask">
            <rect width="56" height="56" fill="white" />
            <path d="M 24.0391 39.7891 C 23.3126 39.7891 22.8438 39.5547 22.4923 39.1563 L 14.6641 30.4609 C 14.3360 30.0860 14.1485 29.6172 14.1485 29.125 C 14.1485 28.0234 14.9923 27.2031 16.1876 27.2031 C 16.8204 27.2031 17.2891 27.4141 17.7110 27.8594 L 23.9219 34.7266 L 35.9923 17.7344 C 36.4610 17.0547 36.9297 16.7734 37.7501 16.7734 C 38.8985 16.7734 39.7188 17.6172 39.7188 18.7188 C 39.7188 19.1172 39.5547 19.5860 39.2969 19.9609 L 25.6328 39.0625 C 25.2813 39.5078 24.7423 39.7891 24.0391 39.7891 Z" fill="black"/>
        </mask>
        <path d="M 23.6641 52.3985 C 26.6172 55.375 29.3594 55.3516 32.3126 52.3985 L 35.9219 48.8125 C 36.2969 48.4610 36.6250 48.3203 37.1172 48.3203 L 42.1797 48.3203 C 46.3749 48.3203 48.3204 46.3985 48.3204 42.1797 L 48.3204 37.1172 C 48.3204 36.625 48.4610 36.2969 48.8124 35.9219 L 52.3749 32.3125 C 55.3749 29.3594 55.3514 26.6172 52.3749 23.6641 L 48.8124 20.0547 C 48.4610 19.7031 48.3204 19.3516 48.3204 18.8829 L 48.3204 13.7969 C 48.3204 9.625 46.3985 7.6563 42.1797 7.6563 L 37.1172 7.6563 C 36.6250 7.6563 36.2969 7.5391 35.9219 7.1875 L 32.3126 3.6016 C 29.3594 .6250 26.6172 .6485 23.6641 3.6016 L 20.0547 7.1875 C 19.7032 7.5391 19.3516 7.6563 18.8828 7.6563 L 13.7969 7.6563 C 9.6016 7.6563 7.6563 9.5782 7.6563 13.7969 L 7.6563 18.8829 C 7.6563 19.3516 7.5391 19.7031 7.1876 20.0547 L 3.6016 23.6641 C .6251 26.6172 .6485 29.3594 3.6016 32.3125 L 7.1876 35.9219 C 7.5391 36.2969 7.6563 36.625 7.6563 37.1172 L 7.6563 42.1797 C 7.6563 46.3750 9.6016 48.3203 13.7969 48.3203 L 18.8828 48.3203 C 19.3516 48.3203 19.7032 48.4610 20.0547 48.8125 Z" fill={color} mask="url(#checkmarkMask)"/>
    </svg>
)

const CompletedView = ({ parkingItems, setParkingItems, startFocus, resetToIdle }: CompletedViewProps) => (
  <motion.div 
      className="flex flex-col items-center w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
  >
      {/* Top Spacer */}
      <div className="flex-1" />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full">
          <div className="mb-4">
              {/* Bounce Effect */}
              <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
              >
                  <FilledSealCheck size={64} color="#35D399" />
              </motion.div>
          </div>

          <h2 className="text-[28px] font-bold text-white mb-1">Nice work!</h2>

          <p className="text-[14px] mb-8" style={{ color: "rgba(255, 255, 255, 0.6)" }}>One thing down.</p>

          <div className="flex flex-col gap-3 w-full px-5">
              {parkingItems[0] && (
                  <SuggestionCard 
                      item={parkingItems[0]} 
                      onStart={() => {
                          const item = parkingItems[0];
                          setParkingItems(prev => prev.filter(i => i.id !== item.id));
                          startFocus(item.content);
                      }} 
                  />
              )}

              <input 
                  type="text" 
                  placeholder="Or type something else..."
                  className="w-full rounded-lg p-3 text-[13px] text-white outline-none transition-colors mt-2 placeholder:text-white/30"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
                  onKeyDown={(e) => {
                      if(e.key === 'Enter') startFocus(e.currentTarget.value);
                  }}
              />
          </div>
      </div>

      {/* Bottom Spacer */}
      <div className="flex-1" />
      
      <button 
          onClick={resetToIdle}
          className="mb-6 flex items-center gap-1 text-[12px] transition-all group px-3 py-2 rounded-lg hover:bg-white/5"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
      >
          <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
      </button>
  </motion.div>
);

// --- Main Component ---

export const ZenDoOneApp = () => {
  // --- OS Context Integration (Persistent State) ---
  const { setAppStatus, zenDoOneState, setZenDoOneState } = useOS();
  const { mode, currentTask, completedCount } = zenDoOneState;

  // --- Local UI State ---
  const [elapsedTime, setElapsedTime] = useState(0);

  // Overlays
  const [showHistory, setShowHistory] = useState(false);

  // Data
  const [parkingItems, setParkingItems] = useState<ParkingItem[]>([
    { id: "1", content: "Reply to emails" },
    { id: "2", content: "Update documentation" }
  ]);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([
    { id: "1", content: "Morning Review" }
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isParkingExpanded, setIsParkingExpanded] = useState(true);

  // Audio Refs
  const startAudio = useRef<HTMLAudioElement | null>(null);
  const completeAudio = useRef<HTMLAudioElement | null>(null);
  
  // Confetti Canvas Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstance = useRef<any>(null);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          startAudio.current = new Audio("/start-focus.wav");
          completeAudio.current = new Audio("/task-complete.wav");
      }
      
      // Initialize confetti instance bound to our specific canvas
      if (confettiCanvasRef.current && !confettiInstance.current) {
          // Explicitly set canvas size to match display size
          confettiCanvasRef.current.width = confettiCanvasRef.current.offsetWidth;
          confettiCanvasRef.current.height = confettiCanvasRef.current.offsetHeight;

          confettiInstance.current = confetti.create(confettiCanvasRef.current, {
            resize: true,
            useWorker: false
          });
      }
      
      return () => {
          // Cleanup if needed
      }
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === "focusing") {
      interval = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mode]);

  // Sync Status to MenuBar (Reactive Side Effect)
  useEffect(() => {
      if (mode === "focusing") {
          setAppStatus("zendoone", currentTask);
      } else {
          // "idle" or "completed" -> Ready to focus
          setAppStatus("zendoone", "Ready to focus");
      }
  }, [mode, currentTask, setAppStatus]);

  // Confetti Logic (Scoped to Window)
  const fireConfetti = () => {
    // Ensure instance exists
    if (!confettiInstance.current && confettiCanvasRef.current) {
        confettiInstance.current = confetti.create(confettiCanvasRef.current, {
            resize: true,
            useWorker: false
        });
    }

    if (confettiInstance.current) {
        // Custom colors from Swift implementation: Mint, Soft Blue, Warm Yellow
        const colors = ['#66E6B3', '#6699E6', '#FFCC66'];

        // Burst from bottom center mimicking the Swift "Fan" shape
        confettiInstance.current({
            particleCount: 120, 
            angle: 90, 
            spread: 80, 
            origin: { x: 0.5, y: 0.9 }, 
            colors: colors,
            shapes: ['circle', 'square'],
            scalar: 1.0, 
            gravity: 0.9, 
            decay: 0.93,
            drift: 0,
            ticks: 500, 
            startVelocity: 25, 
            zIndex: 200,
            disableForReducedMotion: false 
        });
    }
  };

  const formatTime = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- Actions ---
  const startFocus = (task: string) => {
    if (!task.trim()) return;
    
    setZenDoOneState(prev => ({ ...prev, currentTask: task, mode: "focusing" }));
    setElapsedTime(0);
    startAudio.current?.play().catch(() => {});
  };

  const completeTask = () => {
    setZenDoOneState(prev => ({ ...prev, mode: "completed", completedCount: prev.completedCount + 1 }));
    completeAudio.current?.play().catch(() => {});
    fireConfetti();
    
    // Add to history
    setHistory(prev => [{
        id: Date.now().toString(),
        content: currentTask,
        timestamp: new Date().toLocaleTimeString(),
        duration: formatTime(elapsedTime)
    }, ...prev]);
  };

  const resetToIdle = () => {
    setZenDoOneState(prev => ({ ...prev, currentTask: "", mode: "idle" }));
  };

  return (
    <div className="w-full h-full flex flex-col relative font-sans overflow-hidden select-none rounded-xl">
      {/* Base Layer - Enhanced Frosted Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150"
           style={{
             backgroundColor: "rgba(0, 0, 0, 0.6)",
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")"
           }}
      />

      {/* Subtle Glass Border */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
          
          {/* 1. Header */}
          <div className="flex-none">
            <HeaderView
                completedCount={completedCount}
                onHistoryClick={() => setShowHistory(prev => !prev)}
            />
          </div>

          {/* 2. Main Content Area */}
          <div className="flex-1 relative flex flex-col min-h-0">
             <AnimatePresence mode="wait">
                {mode === "idle" && (
                    <IdleView 
                        key="idle" 
                        dailyGoals={dailyGoals} 
                        setDailyGoals={setDailyGoals} 
                        startFocus={startFocus} 
                    />
                )}
                {mode === "focusing" && (
                    <FocusingView 
                        key="focus" 
                        currentTask={currentTask} 
                        completeTask={completeTask} 
                    />
                )}
                {mode === "completed" && (
                    <CompletedView 
                        key="completed" 
                        parkingItems={parkingItems} 
                        setParkingItems={setParkingItems} 
                        startFocus={startFocus} 
                        resetToIdle={resetToIdle} 
                    />
                )}
             </AnimatePresence>
          </div>

          {/* 3. Footer / Parking Lot */}
          {mode !== "completed" && (
             <div className="flex-none z-20 relative">
                <ParkingLotSection 
                    items={parkingItems}
                    isExpanded={isParkingExpanded}
                    toggleExpand={() => setIsParkingExpanded(!isParkingExpanded)}
                    onPromote={(item) => {
                        setParkingItems(prev => prev.filter(i => i.id !== item.id));
                        startFocus(item.content);
                    }}
                    onDelete={(id) => setParkingItems(prev => prev.filter(i => i.id !== id))}
                    onAdd={(text) => setParkingItems([...parkingItems, { id: Date.now().toString(), content: text }])}
                />
             </div>
          )}

          {/* History Overlay - Positioned to cover content area and parking lot */}
          <AnimatePresence>
             {showHistory && <HistoryOverlay key="history-overlay" history={history} onClose={() => setShowHistory(prev => !prev)} />}
          </AnimatePresence>

          {/* Confetti Canvas */}
          <canvas
            ref={confettiCanvasRef}
            className="absolute inset-0 w-full h-full z-[100] pointer-events-none"
          />
      </div>
    </div>
  );
};