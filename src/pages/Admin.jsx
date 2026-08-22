import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    date: "",
    teacher: "",
    title: "",
    theme: "",
    verse: "",
    story: "",
    explanation: "",
    questions: ["", "", "", ""],
    activity: "",
    prayer: "",
    video: "",
  });

  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setLesson((previousLesson) => ({
      ...previousLesson,
      [name]: value,
    }));
  }

  function handleQuestionChange(index, value) {
    setLesson((previousLesson) => {
      const updatedQuestions = [...previousLesson.questions];
      updatedQuestions[index] = value;

      return {
        ...previousLesson,
        questions: updatedQuestions,
      };
    });
  }

  async function generateWithAI() {
    if (!lesson.title || !lesson.theme) {
      alert("Primero escribe el título y el tema principal.");
      return;
    }

    try {
      setGenerating(true);

      const response = await fetch(
        "http://localhost:5001/api/generate-lesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: lesson.title,
            theme: lesson.theme,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo generar la lección");
      }

      const data = await response.json();

      setLesson((previousLesson) => ({
        ...previousLesson,
        verse: data.verse || "",
        story: data.bibleStory || "",
        explanation: data.explanation || "",
        questions:
          Array.isArray(data.questions) && data.questions.length > 0
            ? data.questions
            : ["", "", "", ""],
        activity: data.activity || "",
        prayer: data.prayer || "",
      }));
    } catch (error) {
      console.error("Error generando con IA:", error);

      alert(
        "Hubo un error al generar la lección con IA. Revisa que el backend esté corriendo."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5001/api/lessons",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: lesson.date,
            teacher: lesson.teacher,
            title: lesson.title,
            theme: lesson.theme,
            bibleStory: lesson.story,
            verse: lesson.verse,
            explanation: lesson.explanation,
            questions: lesson.questions,
            activity: lesson.activity,
            prayer: lesson.prayer,
            video: lesson.video,
            songs: [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo guardar la lección");
      }

      alert("La lección fue guardada correctamente.");

      setLesson({
        date: "",
        teacher: "",
        title: "",
        theme: "",
        verse: "",
        story: "",
        explanation: "",
        questions: ["", "", "", ""],
        activity: "",
        prayer: "",
        video: "",
      });
    } catch (error) {
      console.error("Error guardando la lección:", error);

      alert("Hubo un error al guardar la lección.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="lesson-page">
      <section className="lesson-card admin-card">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Volver al inicio
        </button>

        <h1>👩‍🏫 Panel de Maestros</h1>

        <p className="admin-description">
          Agregue las lecciones de cada domingo del mes.
        </p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Fecha de la lección</label>

          <input
            type="date"
            name="date"
            value={lesson.date}
            onChange={handleChange}
            required
          />

          <label>Responsable de la lección</label>

          <input
            type="text"
            name="teacher"
            value={lesson.teacher}
            onChange={handleChange}
            placeholder="Escriba el nombre"
            required
          />

          <label>Título de la lección</label>

          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            placeholder="Escriba el título de la lección"
            required
          />

          <label>Tema principal</label>

          <input
            type="text"
            name="theme"
            value={lesson.theme}
            onChange={handleChange}
            placeholder="Escriba el tema principal"
            required
          />

          <button
            type="button"
            onClick={generateWithAI}
            disabled={generating}
          >
            {generating ? "✨ Generando..." : "✨ Generar con IA"}
          </button>

          <label>Versículo</label>

          <textarea
            name="verse"
            value={lesson.verse}
            onChange={handleChange}
            placeholder="El versículo aparecerá aquí"
            required
          />

          <label>Historia bíblica</label>

          <textarea
            name="story"
            value={lesson.story}
            onChange={handleChange}
            placeholder="La historia bíblica aparecerá aquí"
            required
          />

          <label>Explicación para los niños</label>

          <textarea
            name="explanation"
            value={lesson.explanation}
            onChange={handleChange}
            placeholder="La explicación aparecerá aquí"
          />

          <label>Preguntas para los niños</label>

          {lesson.questions.map((question, index) => (
            <input
              key={index}
              type="text"
              value={question}
              onChange={(event) =>
                handleQuestionChange(index, event.target.value)
              }
              placeholder={`Pregunta ${index + 1}`}
            />
          ))}

          <label>Actividad o juego</label>

          <textarea
            name="activity"
            value={lesson.activity}
            onChange={handleChange}
            placeholder="La actividad aparecerá aquí"
          />

          <label>Oración final</label>

          <textarea
            name="prayer"
            value={lesson.prayer}
            onChange={handleChange}
            placeholder="La oración aparecerá aquí"
          />

          <label>Enlace del video de YouTube</label>

          <input
            type="url"
            name="video"
            value={lesson.video}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <button
            type="submit"
            disabled={saving}
          >
            {saving ? "Guardando..." : "💾 Guardar lección"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Admin;