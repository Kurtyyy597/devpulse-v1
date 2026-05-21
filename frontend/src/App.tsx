import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "../src/App.css"
import "react-toastify/dist/ReactToastify.css";

import NavbarComponent from "./components/navbar-component/NavbarComponent";

import HomePage from "./pages/home-page/HomePage";
import CreateTaskPage from "./pages/create-task-page/CreateTaskPage";
import EditTaskPage from "./pages/edit-task-page/EditTaskPage";

import "./App.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <NavbarComponent />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/tasks/create" element={<CreateTaskPage />} />

          <Route path="/tasks/edit/:id" element={<EditTaskPage />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        newestOnTop
        theme="light"
      />
    </div>
  );
}
