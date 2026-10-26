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
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Normas from "./pages/Normas";
import Colorear from "./pages/Colorear";
import Historias from "./pages/Historias";
import CurriculumRoute, { CurrentVerse } from "./curriculum/CurriculumRoute";






createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/lesson" element={<CurriculumRoute mode="lesson"><Lesson /></CurriculumRoute>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presentation" element={<CurriculumRoute mode="presentation"><Presentation /></CurriculumRoute>} />
        <Route path="/alabanzas" element={<Alabanzas />} />
        <Route path="/juegos" element={<CurriculumRoute mode="activity"><Juegos /></CurriculumRoute>} />
        <Route path="/oracion" element={<Oracion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/normas" element={<Normas />} />
        <Route path="/colorear" element={<CurriculumRoute mode="color"><Colorear /></CurriculumRoute>} />
        <Route path="/versiculo" element={<CurriculumRoute mode="verse"><CurrentVerse /></CurriculumRoute>} />
        <Route path="/historias" element={<CurriculumRoute mode="story"><Historias /></CurriculumRoute>} />
    
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

