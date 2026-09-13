import { useEffect, useState } from "react";

function Presentation() {
  const [lesson, setLesson] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      try {
        const response = await fetch("https://life-church-kids.onrender.com/api/lessons");
        const data = await response.json();

        if (data.length > 0) {
          setLesson(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Error cargando la lección:", error);
      }
    }

    loadLesson();
  }, []);

  if (!lesson) {
    return <h1>No hay una lección publicada.</h1>;
  }

  const slides = [
    {
      title: "📖 Versículo para memorizar",
      content: lesson.verse,
    },
    {
      title: "📖 Historia bíblica",
      content: lesson.bibleStory,
    },
    {
      title: "💡 Explicación",
      content: lesson.explanation,
    },
    {
      title: "❓ Preguntas",
      content: lesson.questions?.join("\n"),
    },
    {
      title: "🎨 Actividad",
      content: lesson.activity,
    },
    {
      title: "🙏 Oración",
      content: lesson.prayer,
    },
  ];

  const currentSlide = slides[slideIndex];

  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const previousSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          marginBottom: "30px",
        }}
      >
        {lesson.title}
      </h1>

      <h2
        style={{
          fontSize: "52px",
          marginBottom: "30px",
        }}
      >
        {currentSlide.title}
      </h2>

      <p
        style={{
          fontSize: "40px",
          lineHeight: "1.6",
          maxWidth: "1200px",
          whiteSpace: "pre-line",
        }}
      >
        {currentSlide.content || "Contenido no disponible"}
      </p>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "50px",
        }}
      >
        <button
          onClick={previousSlide}
          disabled={slideIndex === 0}
          style={{
            fontSize: "26px",
            padding: "16px 32px",
            cursor: "pointer",
          }}
        >
          ⬅️ Anterior
        </button>

        <button
          onClick={nextSlide}
          disabled={slideIndex === slides.length - 1}
          style={{
            fontSize: "26px",
            padding: "16px 32px",
            cursor: "pointer",
          }}
        >
          Siguiente ➡️
        </button>
      </div>

      <p
        style={{
          marginTop: "25px",
          fontSize: "22px",
        }}
      >
        {slideIndex + 1} de {slides.length}
      </p>
    </main>
  );
}

export default Presentation;