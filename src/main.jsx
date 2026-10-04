import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import Lesson from "./pages/Lesson";
import Admin from "./pages/Admin";
import Presentation from "./Presentation";
import Alabanzas from "./pages/Alabanzas";
import Juegos from "./pages/Juegos";
import Oracion from "./pages/Oracion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/alabanzas" element={<Alabanzas />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/oracion" element={<Oracion />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);