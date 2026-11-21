import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/life-kids-logo.png";
import { lessons2026, defaultLessonDate } from "./curriculum/lessons";


function App() {
  const navigate = useNavigate();
  const selectedDate = new URLSearchParams(window.location.search).get("fecha") || (() => { try { return localStorage.getItem("life-kids-curriculum-date"); } catch { return null; } })() || defaultLessonDate();
  const featuredLesson = lessons2026.find(item => item.date === selectedDate) || lessons2026.find(item => item.date === defaultLessonDate()) || lessons2026[0];

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
        <div className="weekly-illustration" role="img" aria-label={`Ilustración de la lección: ${featuredLesson.title}`}>
          <div className="weekly-illustration-art" aria-hidden="true">{({ "2026-11-08": "🐑🌿👨‍🦯", "2026-11-15": "🙏💛✨", "2026-11-22": "🧺🍞🐟", "2026-11-29": "👼🌟🕊️", "2026-12-13": "🌟👶🛏️", "2026-12-20": "👼🐑🌠", "2026-12-27": "🕯️💛🤝" })[featuredLesson.date] || "📖🌈✨"}</div>
          <p>{featuredLesson.title}</p>
          <small>{featuredLesson.reference}</small>
        </div>
      </header>

      <section className="menu">
        <button
          className="menu-button"
          onClick={() => navigate("/lesson")}
        >
          📖 Lección de la semana
        </button>

        <button className="menu-button" onClick={() => navigate("/historias")} >
          🎥 Historias bíblicas
        </button>

        <button
  className="menu-button"
  onClick={() => navigate("/alabanzas")}
>
  🎵 Alabanzas
</button>

        <button className="menu-button" onClick={() => navigate("/versiculo")}>
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