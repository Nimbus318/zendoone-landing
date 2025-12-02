import React, { useState } from 'react';
import { useOS } from '@/context/OSContext';
import { ArrowRight, Heart, Terminal, X, Minus, Maximize2, Download } from 'lucide-react';

export const ReadmeApp = () => {
  const { openApp, closeApp, minimizeApp } = useOS();
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white font-mono text-[13px] leading-relaxed select-text rounded-xl overflow-hidden">
        {/* Editor Header/Tabs - Draggable Area */}
        <div className="window-handle h-9 bg-[#252526] flex items-center px-4 border-b border-[#3e3e42] shrink-0 gap-4">
            
            {/* Traffic Lights */}
            <div 
                className="flex items-center gap-2 z-10 group"
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
            >
                <div 
                    onClick={(e) => { e.stopPropagation(); closeApp('readme'); }}
                    className="w-[12px] h-[12px] rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center cursor-pointer shadow-sm active:brightness-75"
                >
                    <X size={6} strokeWidth={3} className={`text-[#4d0000] opacity-0 ${isHoveringControls && 'opacity-100'}`} />
                </div>
                <div 
                    onClick={(e) => { e.stopPropagation(); minimizeApp('readme'); }}
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

            {/* Tab */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] rounded-t-sm border-t border-l border-r border-[#3e3e42] translate-y-[1px]">
                <span className="text-[#e8ba5d]">ℹ️</span>
                <span className="text-[#cccccc]">README.md</span>
                <span 
                    className="text-white/30 ml-2 hover:text-white cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); closeApp('readme'); }}
                >
                    x
                </span>
            </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Intro / Philosophy */}
                <div>
                    <h1 className="text-2xl font-bold text-[#569cd6] mb-4"># Less Noise. More Focus.</h1>
                    
                    {/* Download Button */}
                    <div className="mb-6">
                        <a 
                            href="https://github.com/Nimbus318/ZenDoOne/releases/download/v0.2.0/ZenDoOne.zip"
                            className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-3 rounded-md font-bold transition-colors no-underline"
                        >
                            <Download size={18} />
                            Download for macOS
                        </a>
                        <div className="text-xs text-[#cccccc] mt-2 ml-1">v0.2.0 | Universal | macOS 12+</div>
                    </div>

                    <p className="text-[#cccccc] mb-4">
                        In a world where every AI product fights for your attention, I wanted to build something that does the opposite. 
                    </p>
                    <p className="text-[#cccccc] border-l-2 border-[#3e3e42] pl-4 italic">
                        <span className="text-[#ce9178]">&quot;ZenDoOne&quot;</span> is designed to minimize cognitive load. 
                        No complex hierarchies. No heatmaps. No gamification levels to chase. 
                    </p>
                    <p className="text-[#cccccc] mt-4">
                        The goal is simple: <span className="text-[#4fc1ff]">Input your task, focus on it, and get out.</span> 
                        An efficiency tool shouldn&apos;t be a place you linger. It should be a launchpad for your actual work.
                    </p>
                </div>

                {/* The Story & Tech */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-[#dcdcaa]">## The Story Behind Code</h2>
                    <p className="text-[#cccccc]">
                        This project started as a tribute to <a href="https://sindresorhus.com/one-thing" target="_blank" rel="noreferrer" className="text-[#569cd6] hover:underline">One Thing</a> by Sindre Sorhus. 
                        I deeply admire his philosophy, but as a developer, I wanted to tweak the workflow to fit my specific needs.
                    </p>
                    <p className="text-[#cccccc]">
                        Here&apos;s the plot twist: <strong className="text-[#4fc1ff]">I&apos;m not a Mac developer.</strong>
                    </p>
                    <p className="text-[#cccccc]">
                        My background is in <span className="text-[#9cdcfe]">AI Infra, Cloud Native, and GPU Virtualization</span>. 
                        I had zero experience with macOS app development. But we live in an amazing time. 
                        With the help of LLMs, I built this entire application—and this demo website—from scratch.
                    </p>
                    <p className="text-[#cccccc]">
                        I&apos;ve been &quot;dogfooding&quot; (using my own product) throughout this journey. Every feature iteration, 
                        and even this website you&apos;re looking at, was built while staying focused with ZenDoOne. 
                        <span className="text-[#6a9955]"> That completion animation is a real dopamine hit.</span>
                    </p>
                </div>

                {/* The Gatekeeper Section */}
                <div className="bg-[#252526] p-5 rounded-lg border border-[#3e3e42]">
                    <h2 className="text-[#ce9178] text-base mb-3 font-bold">⚠️ About the &quot;Unidentified Developer&quot; Warning</h2>
                    <div className="space-y-3 text-[#cccccc]">
                        <p>
                            Because I&apos;m an individual developer currently building this as a free, open-source passion project, 
                            I haven&apos;t paid the <span className="text-[#dcdcaa]">$99/year Apple Developer fee</span>.
                        </p>
                        <p>
                            This means macOS Gatekeeper will flag the app. It&apos;s not a bug, just a paywall.
                        </p>
                        <p>
                            <strong>Is it safe?</strong> <span className="text-[#6a9955]">Yes.</span> The app has zero networking capabilities 
                            (except for local updates if I add them later). 
                        </p>
                        <p className="text-xs opacity-80">
                            If you have any concerns, please ask an LLM (like ChatGPT or DeepWiki) to audit the source code. 
                            I believe in total transparency.
                        </p>
                    </div>
                </div>

                {/* Interactive Demo */}
                <div>
                    <p className="text-[#6a9955] mb-2">{`// How to fix the warning (Interactive Demo):`}</p>
                    <button 
                        onClick={() => {
                            closeApp('readme');
                            openApp('settings');
                        }}
                        className="group flex items-center gap-2 bg-[#0e639c] hover:bg-[#1177bb] text-white px-5 py-2.5 rounded-md transition-all font-medium"
                    >
                        <Terminal size={16} />
                        <span>Open Settings Simulation</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Footer */}
                <div className="pt-8 border-t border-[#3e3e42] flex items-center gap-2 text-[#6a9955]">
                    <Heart size={14} fill="#6a9955" />
                    <span>Built with focus, powered by AI.</span>
                </div>

            </div>
        </div>
    </div>
  );
};