import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    title: "",
    theme: "",
    verse: "",
    story: "",
    video: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setLesson((previousLesson) => ({
      ...previousLesson,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    localStorage.setItem(
      "weeklyLesson",
      JSON.stringify(lesson)
    );

    alert("La lección fue guardada correctamente.");

    navigate("/lesson");
  }
  function generateLesson() {
  setLesson({
    title: "David y Goliat",
    theme: "Confiamos en Dios",
    verse: "La batalla es del Señor. 1 Samuel 17:47",
    story:
      "David era un joven pastor que confiaba en Dios. Cuando todos tenían miedo de Goliat, David recordó que Dios siempre estaba con él. Con una honda y cinco piedras, enfrentó al gigante y venció porque puso su confianza en el Señor.",
    video: "",
  });
}

  return (
    <main className="lesson-page">
      <section className="lesson-card admin-card">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Volver al inicio
        </button>

        <h1>👩‍🏫 Panel de Maestros</h1>

        <p className="admin-description">
          Crea la lección que se mostrará esta semana.
        </p>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >
          <label>
            Título de la lección
          </label>

          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            placeholder="Ejemplo: David y Goliat"
            required
          />

          <label>
            Tema principal
          </label>

          <input
            type="text"
            name="theme"
            value={lesson.theme}
            onChange={handleChange}
            placeholder="Ejemplo: Confiamos en Dios"
            required
          />

          <label>
            Versículo
          </label>

          <textarea
            name="verse"
            value={lesson.verse}
            onChange={handleChange}
            placeholder="Ejemplo: La batalla es del Señor. 1 Samuel 17:47"
            required
          />

          <label>
            Historia para escuchar
          </label>

          <textarea
            name="story"
            value={lesson.story}
            onChange={handleChange}
            placeholder="Escribe aquí la historia que la aplicación leerá en voz alta"
            rows="8"
            required
          />

          <label>
            Enlace del video de YouTube
          </label>

          <input
            type="url"
            name="video"
            value={lesson.video}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />

          <button
  type="button"
  className="teacher-button"
  onClick={generateLesson}
>
  ✨ Generar lección con IA
</button>

<button
  type="submit"
  className="teacher-button"
>
  💾 Guardar y publicar lección
</button>

</form>
</section>
</main>
);
}

export default Admin;