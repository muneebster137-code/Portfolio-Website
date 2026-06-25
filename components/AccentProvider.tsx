"use client";

import React, { createContext, useContext, useEffect } from "react";

interface AccentContextType {
  setAccent: (primary: string, secondary: string) => void;
  resetAccent: () => void;
}

const AccentContext = createContext<AccentContextType | null>(null);

export const useAccent = () => {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error("useAccent must be used within an AccentProvider");
  }
  return context;
};

export const AccentProvider = ({ children }: { children: React.ReactNode }) => {
  const setAccent = (primary: string, secondary: string) => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--accent-primary", primary);
      document.documentElement.style.setProperty("--accent-secondary", secondary);
    }
  };

  const resetAccent = () => {
    if (typeof window !== "undefined") {
      document.documentElement.style.removeProperty("--accent-primary");
      document.documentElement.style.removeProperty("--accent-secondary");
    }
  };

  // Reset accent color on initial load/unmount
  useEffect(() => {
    return () => resetAccent();
  }, []);

  return (
    <AccentContext.Provider value={{ setAccent, resetAccent }}>
      {children}
    </AccentContext.Provider>
  );
};
