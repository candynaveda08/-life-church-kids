import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarImagenesBiblicas } from "./bibliotecaBiblica";

function Presentation() {
    const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    async function loadLesson() {
      try {
        const response = await fetch("https://life-church-kids.onrender.com/api/lessons");
        const data = await response.json();

       if (data.length > 0) {
  const id = new URLSearchParams(window.location.search).get("id");

  const leccionSeleccionada = id
    ? data.find((item) => item._id === id)
    : data[data.length - 1];

  if (leccionSeleccionada) {
  const imagenes = buscarImagenesBiblicas(
    leccionSeleccionada.title,
    leccionSeleccionada.theme,
    leccionSeleccionada.bibleStory
  );

  setLesson({
  ...leccionSeleccionada,
  imagenColor: imagenes.imagenColor,
  dibujo: imagenes.dibujo,
  answers: Array.isArray(leccionSeleccionada.answers)
    ? leccionSeleccionada.answers
    : [],
});


console.log("Respuestas guardadas:", leccionSeleccionada.answers);
} else {
  setLesson(null);
}
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

  // DIVIDIR LA HISTORIA BÍBLICA EN VARIAS LÁMINAS
function dividirHistoria(texto, maxCaracteres = 450) {
  if (!texto || !texto.trim()) return [];

  const palabras = texto.trim().split(/\s+/);
  const partes = [];
  let parteActual = "";

  palabras.forEach((palabra) => {
    const nuevaParte = parteActual
      ? parteActual + " " + palabra
      : palabra;

    if (nuevaParte.length > maxCaracteres && parteActual) {
      partes.push(parteActual);
      parteActual = palabra;
    } else {
      parteActual = nuevaParte;
    }
  });

  if (parteActual) {
    partes.push(parteActual);
  }

  if (partes.length > 1) {
    const ultima = partes[partes.length - 1];

    if (ultima.length < 150) {
      partes[partes.length - 2] += " " + ultima;
      partes.pop();
    }
  }

  return partes;
}

const partesHistoria = dividirHistoria(lesson.bibleStory);

  const slides = [
    {
  title: "¡BIENVENIDOS A LIFE CHURCH KIDS!",
  content: "",
  imagen: "/bienvenida-kids.png",
},
   {
    title: "✨ Tema de la lección",
    content: lesson.theme,
  },


    {
      title: "📖 Versículo para memorizar",
      content: lesson.verse,
    },

    ...partesHistoria.map((parte, index) => ({
  title: `📖 Historia bíblica ${index + 1} de ${partesHistoria.length}`,
  content: parte,
  imagen: index === 0 ? lesson.imagenColor : null,
})),
    
    
    ...dividirHistoria(lesson.explanation, 300).map((parte, index, partes) => ({
  title: `💡 Explicación ${index + 1} de ${partes.length}`,
  content: parte,
})),
    {
  title: "❓ Preguntas",
  content: lesson.questions
    ?.slice(0, 6)
    .map((pregunta, index) => `${index + 1}. ${pregunta}`)
    .join("\n\n"),
  questions: lesson.questions?.slice(0, 6),
  answers: lesson.answers?.slice(0, 6),
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
          fontSize: "clamp(28px, 4vw, 48px)",
lineHeight: 1.3,
overflowWrap: "anywhere",
marginBottom: "30px",
        }}
      >
        {lesson.title}
      </h1>

      <h2
        style={{
          fontSize: "36px",
          marginBottom: "15px",
        }}
      >
        {currentSlide.title}
      </h2>

      {currentSlide.title.includes("Historia bíblica 1 de") && lesson.imagenColor && (
  <img
    src={lesson.imagenColor}
    alt={lesson.title}
    style={{
      width: "100%",
      maxWidth: "850px",
      maxHeight: "30vh",
      objectFit: "contain",
      borderRadius: "20px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      border: "5px solid white", 
      marginBottom: "10px",
    }}
  />
)}

      {currentSlide.questions ? (
  <div style={{ maxWidth: "900px", margin: "auto" }}>
    {currentSlide.questions
      .filter((pregunta) => pregunta.trim() !== "")
      .map((pregunta, index) => (
        <details
          key={index}
          style={{
            marginBottom: "25px",
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <summary
            style={{
              fontSize: "26px",
              cursor: "pointer",
              color: "#174ea6",
              fontWeight: "bold",
            }}
          >
            {index + 1}. {pregunta}
            <div style={{ fontSize: "18px", marginTop: "10px" }}>
              👀 Mostrar respuesta
            </div>
          </summary>

          <p style={{ fontSize: "25px", color: "green" }}>
            ✅ {currentSlide.answers?.[index] || "Respuesta pendiente"}
          </p>
        </details>
      ))}
  </div>
) : (
  currentSlide.content ? (
  <p
    style={{
      fontSize: "clamp(26px, 2.5vw, 36px)",
      lineHeight: 1.3,
      maxWidth: "1000px",
      width: "90%",
      whiteSpace: "pre-line",
      background: "rgba(255,255,255,0.95)",
      padding: "20px 30px",
      borderRadius: "25px",
      margin: "20px auto",
      color: "#34495e",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      border: "3px solid white",
    }}
  >
    {currentSlide.content}
  </p>
) : null



)}
  {currentSlide.imagen && !currentSlide.imprimir && !currentSlide.title.includes("Historia bíblica") && (
  <img
    src={currentSlide.imagen}
    alt="Bienvenidos a Life Church Kids"
    style={{
      width: "100%",
      maxWidth: "900px",
      maxHeight: "55vh",
      objectFit: "contain",
      borderRadius: "20px",
      margin: "15px auto",
      display: "block",
    }}
  />
)}

      
      {currentSlide.imprimir &&110
       && (
  <button
    onClick={() => {
      const ventana = window.open("", "_blank");

      if (!ventana) {
        alert("Permite las ventanas emergentes para imprimir.");
        return;
      }

      const imagen = document.createElement("img");
      imagen.src = currentSlide.imagen;
      imagen.style.width = "100%";

      ventana.document.body.appendChild(imagen);
      ventana.document.close();

      imagen.onload = () => {
        ventana.focus();
        ventana.print();
      };
    }}
    style={{
      padding: "15px 30px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "20px",
      cursor: "pointer",
      marginTop: "20px",
    }}
  >
    🖨️ Imprimir dibujo
  </button>
)}

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
      <button
  type="button"
  onClick={() => navigate("/inicio")}
  style={{
    marginTop: "25px",
    fontSize: "20px",
    padding: "12px 25px",
    cursor: "pointer",
    backgroundColor: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  }}
>
  🏠 Volver al inicio
</button>

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