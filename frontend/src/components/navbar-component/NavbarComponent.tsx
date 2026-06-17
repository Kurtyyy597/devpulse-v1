import { NavLink } from "react-router-dom";
import "./NavbarComponent.css";
import { useTheme } from "../../context/theme/useTheme";

export default function NavbarComponent() {
  const {theme, toggleTheme} = useTheme();
  return (
    <header className="navbar">
      
      <div className="header">
        <h1 className="title"> DevPulse </h1>
        <button className="toggle" onClick={toggleTheme}> {theme === "light" ? "Switch dark" : "Switch light"} </button>
      </div>

      

      <nav className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/sessions"
          end
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Sessions
        </NavLink>
        
        <NavLink
          to="/sessions/trash"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Trash
        </NavLink>
      </nav>
    </header>
  );
}
