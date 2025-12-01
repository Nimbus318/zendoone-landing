import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, X, Minus, Maximize2 } from 'lucide-react';
import { useOS } from '@/context/OSContext';

// Skeleton Block Component (Dark Mode Adjusted)
const Skeleton = ({ className = "", width = "100%", height = "100%" }: { className?: string, width?: string | number, height?: string | number }) => (
    <div 
        className={`bg-white/10 rounded-[4px] ${className}`} 
        style={{ width, height }}
    />
);

const SidebarItemSkeleton = ({ active = false }: { active?: boolean }) => (
    <div className={`flex items-center gap-3 px-2 py-1.5 rounded-md mb-1 ${active ? 'bg-[#007AFF] text-white shadow-sm' : ''}`}>
        {active ? (
            // Active Item (Privacy & Security) - Real Content
            <>
                <ShieldAlert size={16} strokeWidth={2} className="text-white" />
                <span className="text-[13px] font-medium flex-1 text-white">Privacy & Security</span>
            </>
        ) : (
            // Inactive Items - Skeletons
            <>
                <Skeleton width={16} height={16} className="bg-white/10" />
                <Skeleton width="60%" height={14} className="bg-white/10" />
            </>
        )}
    </div>
);

export const SystemSettings = () => {
  const { closeApp, minimizeApp, setZenDoOneAllowed } = useOS();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  const handleAllow = () => {
      setIsAllowed(true);
      setZenDoOneAllowed(true);
      
      // Close settings after a moment to signify "Done"
      setTimeout(() => {
          closeApp('settings');
      }, 1500);
  };

  return (
    <div className="flex h-full bg-[#1E1E1E] text-white/90 select-none rounded-xl overflow-hidden font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] border border-white/10 shadow-2xl">
      {/* Sidebar */}
      <div className="w-[200px] flex flex-col border-r border-white/10 bg-[#2D2D2D] backdrop-blur-xl">
         {/* Window Controls / Drag Handle */}
         <div 
            className="window-handle h-[52px] flex items-center px-4 shrink-0 group"
            onMouseEnter={() => setIsHoveringControls(true)}
            onMouseLeave={() => setIsHoveringControls(false)}
         >
            <div className="flex items-center gap-2 z-10">
                <div 
                    onClick={(e) => { e.stopPropagation(); closeApp('settings'); }}
                    className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75 transition-transform active:scale-95"
                >
                    <X size={6} strokeWidth={3} className={`text-[#4d0000] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                </div>
                <div 
                    onClick={(e) => { e.stopPropagation(); minimizeApp('settings'); }}
                    className="w-[12px] h-[12px] rounded-full bg-[#FEBC2E] border border-[#D89E24] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75 transition-transform active:scale-95"
                >
                    <Minus size={6} strokeWidth={3} className={`text-[#5c3a00] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                </div>
                <div 
                    className="w-[12px] h-[12px] rounded-full bg-[#28C840] border border-[#1AAB29] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75 transition-transform active:scale-95"
                >
                    <Maximize2 size={6} strokeWidth={3} className={`text-[#0a5012] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                </div>
            </div>
         </div>

         <div className="flex-1 flex flex-col px-2 pb-4 overflow-hidden -mt-1">
             {/* Search Bar Skeleton */}
             <div className="mb-4 px-1">
                 <Skeleton height={26} className="rounded-md bg-white/10" />
             </div>

             {/* Sidebar List */}
             <div className="flex-col gap-0.5 flex overflow-hidden">
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton active={true} /> {/* Privacy & Security */}
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
                 <SidebarItemSkeleton />
             </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1E1E1E] relative">
        {/* Header Skeleton */}
        <div className="h-12 flex items-center px-8 border-b border-white/10 sticky top-0 bg-[#1E1E1E]/80 backdrop-blur-xl z-10 gap-3">
             {/* Only Real Title */}
             <span className="font-bold text-[17px] text-white">Privacy & Security</span>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pb-20 space-y-8 custom-scrollbar">
            
            {/* Top Section Skeleton (e.g., Location, Camera, etc.) */}
            <section className="space-y-4 opacity-40 grayscale pointer-events-none">
                <div className="grid grid-cols-2 gap-4">
                     <Skeleton height={60} className="rounded-lg border border-white/10" />
                     <Skeleton height={60} className="rounded-lg border border-white/10" />
                </div>
                <div className="space-y-1 bg-[#2D2D2D] rounded-lg border border-white/10 p-1">
                    {[1,2,3].map(i => <Skeleton key={i} height={32} className="bg-transparent" />)}
                </div>
            </section>

            {/* Security Section - The Hero */}
            <section>
                 <h2 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide px-1">Security</h2>
                 
                 {/* The "App Blocked" Box */}
                 <div className={`transition-all duration-500 ${isAllowed ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'} rounded-lg border p-4 flex flex-col gap-3 shadow-sm`}>
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-[13px] leading-relaxed text-white/90 flex-1">
                            {isAllowed ? (
                                <div className="flex items-center gap-2 text-green-400">
                                    <CheckCircle2 size={16} />
                                    <span className="font-medium">You&apos;re all set! ZenDoOne is now allowed.</span>
                                </div>
                            ) : (
                                <>
                                    <span className="font-medium">&quot;ZenDoOne&quot;</span> was blocked from opening because it is not from an identified developer.
                                </>
                            )}
                        </div>
                        
                        {!isAllowed && (
                            <button 
                                onClick={handleAllow}
                                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[5px] shadow-sm text-[13px] font-medium text-white transition-all active:scale-95"
                            >
                                Allow Anyway
                            </button>
                        )}
                    </div>
                 </div>
            </section>

            {/* Bottom Section Skeleton */}
            <section className="space-y-2 opacity-30 grayscale pointer-events-none">
                 <h2 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide px-1">Others</h2>
                 <div className="bg-[#2D2D2D] rounded-lg border border-white/10 p-4 space-y-3">
                    <Skeleton height={16} width="40%" />
                    <div className="h-[1px] bg-white/10" />
                    <Skeleton height={16} width="70%" />
                    <div className="h-[1px] bg-white/10" />
                    <Skeleton height={16} width="50%" />
                 </div>
            </section>

        </div>
      </div>
    </div>
  );
};
