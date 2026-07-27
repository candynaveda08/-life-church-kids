import { useNavigate } from "react-router-dom";

function Lesson() {
  const navigate = useNavigate();
  const lesson = JSON.parse(localStorage.getItem("weeklyLesson")) || {};

  return (
    <main className="lesson-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Volver al inicio
      </button>

      <section className="lesson-card">
        <p className="lesson-label">Lección de la semana</p>

        <h1>{lesson.title || "Todavía no hay una lección publicada"}</h1>

        <h2>{lesson.theme}</h2>

        <div className="video-box">
  {lesson.video ? (
    <iframe
      width="100%"
      height="315"
      src={`https://www.youtube.com/embed/${lesson.video.split("v=")[1]?.split("&")[0]}`}
      title="Video de la lección"
      frameBorder="0"
      allowFullScreen
    />
  ) : (
    <p>Aquí aparecerá el video</p>
  )}
</div>
        <section className="lesson-section">
          <h3>📖 Versículo para memorizar</h3>
          <p>
            La batalla es del Señor.
            <br />
            1 Samuel 17:47
          </p>
        </section>

        <section className="lesson-section">
          <h3>❓ Preguntas para los niños</h3>
          <p>1. ¿Quién era Goliat?</p>
          <p>2. ¿En quién confió David?</p>
          <p>3. ¿Qué utilizó David para vencer?</p>
        </section>

        <section className="lesson-section">
          <h3>🙏 Oración final</h3>
          <p>
            Señor, ayúdanos a confiar en ti cuando tengamos miedo. Amén.
          </p>
        </section>
      </section>
    </main>
  );
}

export default Lesson;