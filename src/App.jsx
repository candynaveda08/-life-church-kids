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

        <button className="menu-button">
          🎵 Alabanzas
        </button>

        <button className="menu-button">
          📜 Versículo de la semana
        </button>

        <button className="menu-button">
          🎲 Preguntas y juegos
        </button>

        <button className="menu-button">
          🙏 Oración
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