"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type AppID = "zendoone" | "discord" | "github" | "settings" | "finder" | "readme";

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
  isZenDoOneAllowed: boolean;
  openApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  toggleApp: (id: AppID) => void;
  setAppStatus: (id: AppID, status: string) => void;
  setZenDoOneIconRect: (rect: DOMRect | null) => void;
  setZenDoOneState: React.Dispatch<React.SetStateAction<ZenDoOneState>>; // Setter
  setZenDoOneAllowed: (allowed: boolean) => void;
}

const defaultWindows: Record<AppID, WindowState> = {
  zendoone: { id: "zendoone", title: "ZenDoOne", isOpen: true, isMinimized: false, zIndex: 10 },
  discord: { id: "discord", title: "Discord", isOpen: false, isMinimized: false, zIndex: 1 },
  github: { id: "github", title: "GitHub", isOpen: false, isMinimized: false, zIndex: 1 },
  settings: { id: "settings", title: "System Settings", isOpen: false, isMinimized: false, zIndex: 1 },
  finder: { id: "finder", title: "Finder", isOpen: false, isMinimized: false, zIndex: 1 },
  readme: { id: "readme", title: "README.md", isOpen: false, isMinimized: false, zIndex: 1 },
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<Record<AppID, WindowState>>(defaultWindows);
  const [activeApp, setActiveApp] = useState<AppID | null>("zendoone");
  const [appStatuses, setAppStatuses] = useState<Record<AppID, string>>({
      zendoone: "", discord: "", github: "", settings: "", finder: "", readme: ""
  });
  const [zenDoOneIconRect, setZenDoOneIconRect] = useState<DOMRect | null>(null);
  // Initialize lifted state
  const [zenDoOneState, setZenDoOneState] = useState<ZenDoOneState>({
      mode: "idle",
      currentTask: "",
      completedCount: 0
  });
  const [isZenDoOneAllowed, setZenDoOneAllowed] = useState(false);
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
    let shouldFocus = false;
    setWindows(prev => {
        const app = prev[id];
        if (app.isOpen && !app.isMinimized && activeApp === id) {
             // Close/Minimize
             return { ...prev, [id]: { ...prev[id], isMinimized: true } };
        } else {
             // Open
             shouldFocus = true;
             return { ...prev, [id]: { ...prev[id], isOpen: true, isMinimized: false } };
        }
    });
    
    if (shouldFocus) {
        focusApp(id);
    }
  }, [activeApp, focusApp]); // Dependency on activeApp is needed here

  return (
    <OSContext.Provider value={{ 
        windows, 
        activeApp, 
        appStatuses, 
        zenDoOneIconRect,
        zenDoOneState,
        isZenDoOneAllowed,
        openApp, 
        closeApp, 
        minimizeApp, 
        focusApp, 
        toggleApp, 
        setAppStatus, 
        setZenDoOneIconRect: setZenDoOneIconRectMemo,
        setZenDoOneState,
        setZenDoOneAllowed
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