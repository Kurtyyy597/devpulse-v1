import { NavLink } from "react-router-dom";
import { House, ClipboardList, LayoutDashboard } from "lucide-react";

import "./NavbarComponent.css";

export default function NavbarComponent() {
  return (
    <header className="navbar">
      <h1 className="navbar-logo">Task Manager</h1>

      <nav className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <House size={18} />
          <span>Home</span>
        </NavLink>
    </nav>
    </header>
  );
}
