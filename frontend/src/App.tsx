import Sessions from "./pages/sessions-page/Sessions";
import DashboardPage from "./pages/dashboard-page/Dashboard";
import ViewSession from "./pages/view-session-details-page/ViewSession";
import CreateSessionPage from "./pages/forms-page/create-session-page/CreateSessionPage";
import UpdateSessionPage from "./pages/forms-page/update-session-page/UpdateSessionPage";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "./components/navbar-component/NavbarComponent";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./context/theme/useTheme";
import Trash from "./pages/trashbin-page/Trash";
import "./App.css";

export default function App() {
  const { theme } = useTheme();
  return (
    <div className="app-wrapper">
      <NavbarComponent />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="sessions/trash" element={<Trash/>}/>
          <Route path="/sessions/:id" element={<ViewSession />} />
          <Route path="/sessions/create" element={<CreateSessionPage />} />
          <Route path="sessions/update/:id" element={<UpdateSessionPage />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        newestOnTop
        theme={theme}
      />
    </div>
  );
}
