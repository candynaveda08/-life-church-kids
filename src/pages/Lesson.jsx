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
          "https://life-church-kids.onrender.com/api/lessons"
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
  async function deleteLesson(id) {
  const confirmed = window.confirm(
    "¿Seguro que quieres eliminar esta lección?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `https://life-church-kids.onrender.com/api/lessons/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo eliminar la lección");
    }

    setLessons((previousLessons) =>
      previousLessons.filter((lesson) => lesson._id !== id)
    );

    alert("Lección eliminada correctamente.");
  } catch (error) {
    console.error("Error eliminando la lección:", error);
    alert("Hubo un error al eliminar la lección.");
  }
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
        <p className="lesson-label">📖 Lección de la semana</p>
        <button
  type="button"
  onClick={() => navigate("/presentation")}
>
  📺 Modo Presentación
</button>

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
              <button
  type="button"
  onClick={() => deleteLesson(lesson._id)}
>
  🗑️ Eliminar lección
</button>

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