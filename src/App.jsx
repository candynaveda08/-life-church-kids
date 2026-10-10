import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/life-kids-logo.png";


function App() {
  const navigate = useNavigate();

  return (
    <main className="app">
      <header className="hero">
        <img
  src={logo}
  alt="Life Kids"
  className="logo"
/>
        <p className="church-name">
          Life Church Ministerio Español
        </p>

        <h1>Life Church Kids</h1>

        <p className="welcome">
          Aprendiendo juntos la Palabra de Dios
        </p>
      </header>

      <section className="menu">
        <button
          className="menu-button"
          onClick={() => navigate("/lesson")}
        >
          📖 Lección de la semana
        </button>

        <button className="menu-button">
          🎥 Historias bíblicas
        </button>

        <button
  className="menu-button"
  onClick={() => navigate("/alabanzas")}
>
  🎵 Alabanzas
</button>

        <button className="menu-button">
          📜 Versículo de la semana
        </button>

        <button
  className="menu-button"
  onClick={() => navigate("/juegos")}
>
  🎨 Actividades
</button>

        <button
  className="menu-button"
  onClick={() => navigate("/oracion")}
>
  🙏 Credo
</button>
    <button
  className="menu-button"
  onClick={() => navigate("/normas")}
>
  📋 Normas del Salón
</button>
    <button
  className="menu-button"
  onClick={() => navigate("/colorear")}
>
  🖍️ Página para Colorear
</button>
      </section>
      
      
      

      <footer>
        <button
  className="teacher-button"
  onClick={() => navigate("/admin")}
>
  👩‍🏫 Panel de maestros
</button>
      </footer>
    </main>
  );
}


export default App;