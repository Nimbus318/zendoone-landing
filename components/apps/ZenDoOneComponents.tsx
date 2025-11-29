"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, ChevronDown, ArrowUp, X, Plus, Play, Trash2, CirclePlay } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Constants from Swift ---
const THEME = {
    textSecondary: "rgba(255, 255, 255, 0.6)",
    textPrimary: "rgba(255, 255, 255, 0.95)",
    border: "rgba(255, 255, 255, 0.1)",
    bgHeader: "rgba(0, 0, 0, 0.25)",
    bgFooter: "rgba(0, 0, 0, 0.25)",
    prompt: "#95A4E5",
    success: "#35D399",
    dailyGoalBlue: "#89B4FA",
    dailyGoalRed: "#E785A0",
    itemBg: "rgba(255, 255, 255, 0.05)",
    itemBgHover: "rgba(255, 255, 255, 0.1)"
};

const FilledPlayCircle = ({ size, color }: { size: number, color: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM10 8L16 12L10 16V8Z" fill={color}/>
    </svg>
)

// --- Types ---
export interface ParkingItem {
  id: string;
  content: string;
}

export interface DailyGoal {
  id: string;
  content: string;
}

export interface HistoryItem {
    id: string;
    content: string;
    timestamp: string;
    duration: string;
}

// --- Header View (Height: 44px) ---
interface HeaderProps {
  completedCount: number;
  onHistoryClick: () => void;
}

const FilledCheckCircle = ({ size, color }: { size: number, color: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="headerCheckMask">
             <rect width="24" height="24" fill="white" />
             <path d="M8 12L11 15L16 9" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
        <circle cx="12" cy="12" r="10" fill={color} mask="url(#headerCheckMask)" />
    </svg>
)

export const HeaderView = ({ completedCount, onHistoryClick }: HeaderProps) => {
  return (
    <div
        className="flex items-center justify-between px-4 select-none z-20 relative backdrop-blur-sm window-handle cursor-default"
        style={{
            height: '44px',
            backgroundColor: THEME.bgHeader,
            borderBottom: `1px solid ${THEME.border}`
        }}
    >
      {/* Swift: 14 icon, 12 bold count, 11 medium text, tracking 1 */}
      <div className="flex items-center gap-1.5 uppercase tracking-[1px] opacity-90" style={{ color: THEME.textSecondary }}>
        <FilledCheckCircle size={14} color="currentColor" />
        <span className="text-white text-[12px] font-bold">{completedCount}</span>
        <span className="text-[11px] font-medium">DONE TODAY</span>
      </div>

      <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
        <button
            onClick={onHistoryClick}
            className="p-1.5 rounded hover:bg-white/5 transition-colors"
            style={{ color: THEME.textSecondary }}
            title="History"
        >
            <Clock size={15} />
        </button>
      </div>
    </div>
  );
};

// --- Parking Lot Section (Pinned Bottom) ---
interface ParkingLotProps {
  items: ParkingItem[];
  isExpanded: boolean;
  toggleExpand: () => void;
  onPromote: (item: ParkingItem) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
}

export const ParkingLotSection = ({ items, isExpanded, toggleExpand, onPromote, onDelete, onAdd }: ParkingLotProps) => {
  const [newItemText, setNewItemText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAdd(newItemText);
      setNewItemText("");
    }
  };

  return (
    <motion.div 
        className="flex flex-col w-full overflow-hidden select-none"
        animate={{ height: isExpanded ? 180 : 40 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
        style={{ 
            backgroundColor: THEME.bgFooter,
            borderTop: `1px solid ${THEME.border}`
        }}
    >
      {/* Header (40px) */}
      <div 
        className="h-[40px] flex-shrink-0 flex items-center px-4 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={toggleExpand}
      >
        <span className="text-[10px] font-bold tracking-[1px] uppercase" style={{ color: THEME.textSecondary }}>PARKING LOT / NEXT UP</span>
        <span className="flex-1" />
        <span className="text-[10px] mr-2" style={{ color: THEME.textSecondary }}>{items.length} items</span>
        <ChevronDown 
            size={12} 
            style={{ color: THEME.textSecondary }}
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} 
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-3 pb-3 min-h-0">
         <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 mb-2">
            {items.map(item => (
                <ParkingItemRow key={item.id} item={item} onPromote={() => onPromote(item)} onDelete={() => onDelete(item.id)} />
            ))}
         </div>

         {/* Input */}
         <form onSubmit={handleSubmit} className="flex-shrink-0 flex items-center rounded px-2 py-1.5" style={{ backgroundColor: THEME.itemBg, border: `1px solid ${THEME.border}` }}>
            <input 
                type="text" 
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="+ Add to parking lot"
                className="bg-transparent border-none outline-none text-[12px] text-white w-full placeholder:text-white/30"
            />
         </form>
      </div>
    </motion.div>
  );
};

const ParkingItemRow = ({ item, onPromote, onDelete }: { item: ParkingItem; onPromote: () => void; onDelete: () => void }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div 
            className="group flex-shrink-0 flex items-center justify-between px-3 py-2 rounded transition-colors text-[13px]"
            style={{ 
                backgroundColor: isHovering ? THEME.itemBgHover : THEME.itemBg,
                color: THEME.textPrimary
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <span className="truncate pr-2">{item.content}</span>
            <div className={`flex items-center gap-2 ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                <button onClick={(e) => { e.stopPropagation(); onPromote(); }} style={{ color: THEME.success }} title="Start">
                    <ArrowUp size={14} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ color: THEME.textSecondary }} title="Delete">
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}

// --- Daily Goals View ---
interface DailyGoalsProps {
    goals: DailyGoal[];
    onAdd: (text: string) => void;
    onStart: (text: string) => void;
    onDelete: (id: string) => void;
}

export const DailyGoalsView = ({ goals, onAdd, onStart, onDelete }: DailyGoalsProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newGoalText, setNewGoalText] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if(newGoalText.trim()) {
            onAdd(newGoalText);
            setNewGoalText("");
            setIsAdding(false);
        } else {
            setIsAdding(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2.5 w-full px-5">
            {/* Swift: size 9, bold, tracking 1.5, opacity 0.6 */}
            <div className="text-[9px] font-bold tracking-[1.5px] uppercase opacity-60 text-center" style={{ color: THEME.textSecondary }}>DAILY RITUALS</div>
            <div className="flex flex-wrap justify-center gap-2">
                {goals.map(goal => (
                    <DailyGoalTag key={goal.id} goal={goal} onStart={() => onStart(goal.content)} onDelete={() => onDelete(goal.id)} />
                ))}

                {goals.length < 3 && (
                     isAdding ? (
                        <form onSubmit={handleAdd} className="flex items-center gap-1 rounded-full px-2 py-1.5" style={{ backgroundColor: THEME.itemBg, border: `1px solid ${THEME.border}` }}>
                            <input 
                                autoFocus
                                type="text"
                                value={newGoalText}
                                onChange={e => setNewGoalText(e.target.value)}
                                className="w-20 bg-transparent border-none outline-none text-[12px] text-white text-center"
                                placeholder="New Routine"
                                onBlur={() => !newGoalText && setIsAdding(false)}
                            />
                            <button type="button" onClick={() => setIsAdding(false)}>
                                <X size={10} style={{ color: THEME.textSecondary }} />
                            </button>
                        </form>
                     ) : (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-colors text-[12px]"
                            style={{ backgroundColor: THEME.itemBg, border: `1px solid ${THEME.border}`, color: THEME.textSecondary }}
                        >
                            <Plus size={12} />
                            {goals.length === 0 && <span>Add Routine</span>}
                        </button>
                     )
                )}
            </div>
        </div>
    );
};

const DailyGoalTag = ({ goal, onStart, onDelete }: { goal: DailyGoal; onStart: () => void; onDelete: () => void }) => {
    const [hoverState, setHoverState] = useState<'none' | 'left' | 'right'>('none');

    return (
        <div 
            className="relative h-[28px] flex items-center rounded-full overflow-hidden cursor-pointer select-none"
            style={{ 
                backgroundColor: THEME.itemBg,
                border: `1px solid ${THEME.border}`
            }}
        >
            {/* Left Fill (Blue) */}
            <motion.div 
                initial={false}
                animate={{ width: hoverState === 'left' ? '100%' : '0%' }}
                className="absolute top-0 left-0 h-full z-0"
                style={{ backgroundColor: THEME.dailyGoalBlue }}
            />
             {/* Right Fill (Red) */}
             <motion.div 
                initial={false}
                animate={{ width: hoverState === 'right' ? '100%' : '0%' }}
                className="absolute top-0 right-0 h-full z-0"
                style={{ backgroundColor: THEME.dailyGoalRed }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex items-center px-2.5 gap-1.5">
                {hoverState === 'left' && (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <Play size={10} fill="white" stroke="none" className="text-white" />
                    </motion.div>
                )}
                
                <span className={`text-[12px] transition-colors duration-200 font-medium text-white`}>
                    {goal.content}
                </span>

                {hoverState === 'right' && (
                     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <X size={10} strokeWidth={2.5} className="text-white" />
                    </motion.div>
                )}
            </div>

            {/* Hover Zones */}
            <div className="absolute inset-0 z-20 flex">
                <div 
                    className="w-[65%] h-full"
                    onMouseEnter={() => setHoverState('left')}
                    onMouseLeave={() => setHoverState('none')}
                    onClick={onStart}
                />
                <div 
                    className="w-[35%] h-full"
                    onMouseEnter={() => setHoverState('right')}
                    onMouseLeave={() => setHoverState('none')}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
}

// --- History Overlay ---
export const HistoryOverlay = ({ history, onClose }: { history: HistoryItem[]; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bottom-0 z-50 flex flex-col"
            style={{ top: '44px', backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(20px)" }}
        >
            {/* Header */}
            <div className="h-[44px] flex items-center justify-between px-4 border-b" style={{ borderColor: THEME.border, backgroundColor: THEME.bgHeader }}>
                <span className="text-[14px] font-bold text-white">History</span>
                <button onClick={onClose} className="text-[12px]" style={{ color: THEME.prompt }}>Close</button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-50 text-[12px]">
                        No history yet
                    </div>
                ) : (
                    history.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: THEME.itemBg }}>
                            <div className="flex items-center gap-2 overflow-hidden">
                                <CheckCircle2 size={14} style={{ color: THEME.success }} />
                                <span className="text-[13px] text-white/90 truncate">{item.content}</span>
                            </div>
                            <span className="text-[11px] font-mono opacity-60">{item.duration}</span>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}

// --- Suggestion Card (for Completion View) ---
interface SuggestionCardProps {
    item: ParkingItem;
    onStart: () => void;
}

export const SuggestionCard = ({ item, onStart }: SuggestionCardProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <button 
            onClick={onStart}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full flex flex-col items-start gap-1.5 p-4 rounded-xl border transition-all duration-200 group outline-none"
            style={{ 
                backgroundColor: isHovering ? "rgba(255, 255, 255, 0.15)" : THEME.itemBg,
                borderColor: isHovering ? "rgba(255, 255, 255, 0.2)" : THEME.border,
                transform: isHovering ? "scale(1.02)" : "scale(1)"
            }}
        >
            <span className="text-[10px] font-bold tracking-[0.5px] uppercase" style={{ color: "#95A4E5" }}>UP NEXT FROM PARKING LOT</span>
            
            <div className="w-full flex items-center justify-between gap-4">
                <span className="text-[16px] font-medium text-white truncate">{item.content}</span>
                
                {/* Play Icon */}
                <div className="transition-all duration-300" style={{ transform: isHovering ? "scale(1.1)" : "scale(1)" }}>
                     {isHovering ? (
                         <FilledPlayCircle size={22} color="white" />
                     ) : (
                         <CirclePlay 
                            size={22} 
                            className="transition-colors"
                            style={{ color: "rgba(255, 255, 255, 0.3)" }}
                            strokeWidth={1.5}
                         />
                     )}
                </div>
            </div>

            <span 
                className="text-[10px] transition-colors duration-200" 
                style={{ color: isHovering ? "rgba(255, 255, 255, 0.8)" : THEME.textSecondary }}
            >
                Click to start immediately →
            </span>
        </button>
    );
}

// --- Timer Display (Isolated for Performance) ---
export const TimerDisplay = ({ isActive }: { isActive: boolean }) => {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (isActive) {
            setElapsed(0); // Reset on start
            intervalRef.current = setInterval(() => {
                setElapsed(prev => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setElapsed(0);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(165, 180, 253, 0.1)", color: "rgba(165, 180, 253, 0.9)" }}>
            <Clock size={12} />
            <span className="text-[13px] font-medium font-mono pt-0.5">{formatTime(elapsed)}</span>
        </div>
    );
};