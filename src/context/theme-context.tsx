import React, { createContext, useContext, useState, useEffect } from "react";

/* context shape */
type ThemeContextType = {
  isDark: boolean;
  toggleButton: () => void;
};

/* create context */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [isDark]);

  const toggleButton = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleButton }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* custom hook with safety check */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
