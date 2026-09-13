import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Lesson() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLessons() {
      try {
        const response = await fetch(
          "http://localhost:5001/api/lessons"
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar las lecciones");
        }

        const data = await response.json();

        setLessons(data);
      } catch (error) {
        console.error("Error cargando lecciones:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLessons();
  }, []);

  function getYouTubeEmbedUrl(url) {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return "";
  }

  return (
    <main className="lesson-page">
      <button
        className="back-button"
        type="button"
        onClick={() => navigate("/")}
      >
        ← Volver al inicio
      </button>

      <section className="lesson-card">
        <p className="lesson-label">📅 Lecciones del mes</p>

        {loading ? (
          <h2>Cargando lecciones...</h2>
        ) : lessons.length === 0 ? (
          <h2>Todavía no hay lecciones publicadas</h2>
        ) : (
          lessons.map((lesson) => (
            <section
              className="lesson-section"
              key={lesson._id}
            >
              <h1>{lesson.title}</h1>

              {lesson.fullLessonText && (
  <div style={{ whiteSpace: "pre-wrap" }}>
    {lesson.fullLessonText}
  </div>
)}

              {lesson.date && (
                <p>
                  <strong>📅 Fecha:</strong> {lesson.date}
                </p>
              )}

              {lesson.teacher && (
                <p>
                  <strong>👩‍🏫 Maestro/a:</strong>{" "}
                  {lesson.teacher}
                </p>
              )}

              {lesson.activity && (
                <h2>{lesson.activity}</h2>
              )}

              {lesson.video && getYouTubeEmbedUrl(lesson.video) && (
                <div className="video-box">
                  <iframe
                    width="100%"
                    height="315"
                    src={getYouTubeEmbedUrl(lesson.video)}
                    title={`Video de ${lesson.title}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}

              {lesson.bibleStory && (
                <div>
                  <h3>📖 Historia bíblica</h3>
                  <p>{lesson.bibleStory}</p>
                </div>
              )}

              {lesson.verse && (
                <div>
                  <h3>📖 Versículo para memorizar</h3>
                  <p>{lesson.verse}</p>
                </div>
              )}
            </section>
          ))
        )}
      </section>
    </main>
  );
}

export default Lesson;