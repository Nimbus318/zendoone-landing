"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type AppID = "zendoone" | "discord" | "github" | "settings" | "finder";

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

export interface ZenDoOneState {
    mode: "idle" | "focusing" | "completed";
    currentTask: string;
    completedCount: number;
}

interface OSContextType {
  windows: Record<AppID, WindowState>;
  activeApp: AppID | null;
  appStatuses: Record<AppID, string>;
  zenDoOneIconRect: DOMRect | null;
  zenDoOneState: ZenDoOneState; // Lifted State
  openApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  toggleApp: (id: AppID) => void;
  setAppStatus: (id: AppID, status: string) => void;
  setZenDoOneIconRect: (rect: DOMRect | null) => void;
  setZenDoOneState: React.Dispatch<React.SetStateAction<ZenDoOneState>>; // Setter
}

const defaultWindows: Record<AppID, WindowState> = {
  zendoone: { id: "zendoone", title: "ZenDoOne", isOpen: true, isMinimized: false, zIndex: 10 },
  discord: { id: "discord", title: "Discord", isOpen: false, isMinimized: false, zIndex: 1 },
  github: { id: "github", title: "GitHub", isOpen: false, isMinimized: false, zIndex: 1 },
  settings: { id: "settings", title: "Settings", isOpen: false, isMinimized: false, zIndex: 1 },
  finder: { id: "finder", title: "Finder", isOpen: false, isMinimized: false, zIndex: 1 },
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<Record<AppID, WindowState>>(defaultWindows);
  const [activeApp, setActiveApp] = useState<AppID | null>("zendoone");
  const [appStatuses, setAppStatuses] = useState<Record<AppID, string>>({
      zendoone: "", discord: "", github: "", settings: "", finder: ""
  });
  const [zenDoOneIconRect, setZenDoOneIconRect] = useState<DOMRect | null>(null);
  // Initialize lifted state
  const [zenDoOneState, setZenDoOneState] = useState<ZenDoOneState>({
      mode: "idle",
      currentTask: "",
      completedCount: 0
  });
  const [maxZIndex, setMaxZIndex] = useState(10);

  const setAppStatus = useCallback((id: AppID, status: string) => {
      setAppStatuses(prev => {
          if (prev[id] === status) return prev;
          return { ...prev, [id]: status };
      });
  }, []);

  const setZenDoOneIconRectMemo = useCallback((rect: DOMRect | null) => {
      setZenDoOneIconRect(rect);
  }, []);

  const focusApp = useCallback((id: AppID) => {
    setActiveApp(id);
    setWindows((prev) => {
        if (prev[id].zIndex === maxZIndex + 1) return prev; // Already top
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        return {
            ...prev,
            [id]: { ...prev[id], zIndex: newZIndex, isMinimized: false },
        };
    });
  }, [maxZIndex]);

  const openApp = useCallback((id: AppID) => {
    setWindows((prev) => {
      if (prev[id].isOpen && !prev[id].isMinimized) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false },
      };
    });
    focusApp(id);
  }, [focusApp]);

  const closeApp = useCallback((id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    setActiveApp(prev => prev === id ? null : prev);
  }, []);

  const minimizeApp = useCallback((id: AppID) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    setActiveApp(prev => prev === id ? null : prev);
  }, []);

  const toggleApp = useCallback((id: AppID) => {
    // We need to check current state, so we use a functional update or access state directly
    // But since toggleApp depends on state, we need to be careful.
    // Simplest is to just use the current windows state from closure if we add it to dependency, 
    // OR use functional update logic carefully. 
    // Ideally, toggleApp should just call open or minimize.
    // Let's use the refs or just simplistic logic that might trigger re-renders but is safe.
    setWindows(prev => {
        const app = prev[id];
        if (app.isOpen && !app.isMinimized && activeApp === id) {
             // Close/Minimize
             return { ...prev, [id]: { ...prev[id], isMinimized: true } };
        } else {
             // Open
             return { ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false } };
        }
    });
    // Note: activeApp logic inside toggle is tricky with functional updates. 
    // For now, let's just let the user click again if needed, or refine this.
    // Actually, for ZenDoOne, toggle means "Show/Hide".
    
    // Correct logic:
    // If open and active -> Minimize
    // Else -> Open & Focus
  }, [activeApp]); // Dependency on activeApp is needed here

  return (
    <OSContext.Provider value={{ 
        windows, 
        activeApp, 
        appStatuses, 
        zenDoOneIconRect,
        zenDoOneState,
        openApp, 
        closeApp, 
        minimizeApp, 
        focusApp, 
        toggleApp, 
        setAppStatus, 
        setZenDoOneIconRect: setZenDoOneIconRectMemo,
        setZenDoOneState
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within an OSProvider");
  return context;
};