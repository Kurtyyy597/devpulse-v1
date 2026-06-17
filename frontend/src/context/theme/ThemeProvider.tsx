import {
  useEffect,
  useState,
} from "react";
import type { Theme } from "../../../../shared/types/theme/Theme";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme
    };
    return "light"
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};