import { useTheme } from "../../../../context/theme/useTheme";
import "./UseThemeToggle.css";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="btn-wrapper">
      <button className="theme-toggle" onClick={toggleTheme}>
        {" "}
        Switch {theme === "light" ? "dark" : "light"}{" "}
      </button>
    </div>
  );
};
