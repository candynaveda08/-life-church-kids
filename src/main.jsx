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






createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/alabanzas" element={<Alabanzas />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/oracion" element={<Oracion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/normas" element={<Normas />} />
        <Route path="/colorear" element={<Colorear />} />
    
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
