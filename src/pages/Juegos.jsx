import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Juegos() {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const [mostrarVF, setMostrarVF] = useState(false);
  const [resultadoVF, setResultadoVF] = useState("");

  useEffect(() => {
    async function loadLesson() {
      try {
        const response = await fetch(
          "https://life-church-kids.onrender.com/api/lessons"
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar las lecciones");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setLesson(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Error cargando la lección:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLesson();
  }, []);

  const preguntas =
    lesson && Array.isArray(lesson.questions)
      ? lesson.questions.filter((pregunta) => pregunta)
      : [];

  if (loading) {
    return (
      <main style={pagina}>
        <h1>🎲 Preguntas y Juegos</h1>
        <p style={{ fontSize: "22px" }}>Cargando la lección...</p>
      </main>
    );
  }

  return (
    <main style={pagina}>
      <button
        onClick={() => navigate("/")}
        style={botonVolver}
      >
        ← Volver al inicio
      </button>

      <h1 style={{ fontSize: "48px", marginBottom: "5px" }}>
        🎲 Preguntas y Juegos
      </h1>

      <p style={{ fontSize: "24px", marginTop: "5px" }}>
        ¡Vamos a ver cuánto aprendimos hoy!
      </p>

      {/* PREGUNTAS DE LA LECCIÓN */}

      <section style={tarjeta}>
        <h2>❓ Preguntas de la lección</h2>

        {lesson?.title && (
          <h3 style={{ fontSize: "22px" }}>
            📖 {lesson.title}
          </h3>
        )}

        {preguntas.length > 0 ? (
          <div style={listaBotones}>
            {preguntas.map((pregunta, index) => (
              <div key={index}>
                <button
                  style={botonJuego}
                  onClick={() =>
                    setPreguntaAbierta(
                      preguntaAbierta === index ? null : index
                    )
                  }
                >
                  ❓ Pregunta {index + 1}
                </button>

                {preguntaAbierta === index && (
                  <div style={cajaPregunta}>
                    {pregunta}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "20px" }}>
            Todavía no hay preguntas guardadas para esta lección.
          </p>
        )}
      </section>

      {/* JUEGOS */}

      <section style={tarjeta}>
        <h2>🎮 Juegos</h2>

        <p style={{ fontSize: "20px" }}>
          Escoge un juego para repasar la lección.
        </p>

        <div style={listaBotones}>

          {/* VERDADERO O FALSO */}

          <button
            style={botonJuego}
            onClick={() => {
              setMostrarVF(!mostrarVF);
              setResultadoVF("");
            }}
          >
            ✅❌ Verdadero o Falso
          </button>

          {mostrarVF && (
            <div style={cajaJuego}>
              <h2>🎯 Verdadero o Falso</h2>

              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                David confió en Dios para enfrentar a Goliat.
              </p>

              <div style={botonesRespuesta}>
                <button
                  style={botonRespuesta}
                  onClick={() => setResultadoVF("correcto")}
                >
                  ✅ Verdadero
                </button>

                <button
                  style={botonRespuesta}
                  onClick={() => setResultadoVF("incorrecto")}
                >
                  ❌ Falso
                </button>
              </div>

              {resultadoVF === "correcto" && (
                <div style={respuestaCorrecta}>
                  🎉 ¡Correcto!
                  <br />
                  David confió en Dios.
                </div>
              )}

              {resultadoVF === "incorrecto" && (
                <div style={respuestaIncorrecta}>
                  😊 Inténtalo otra vez
                </div>
              )}
            </div>
          )}

          {/* COMPLETA EL VERSÍCULO */}

          <button style={botonJuego}>
            🧠 Completa el Versículo
          </button>

          {/* RETO */}

          <button style={botonJuego}>
            ⭐ Reto de la Semana
          </button>

        </div>
      </section>
    </main>
  );
}

const pagina = {
  minHeight: "100vh",
  padding: "30px",
  textAlign: "center",
  background: "linear-gradient(#87CEEB, #ffffff, #90EE90)",
};

const tarjeta = {
  maxWidth: "750px",
  margin: "30px auto",
  padding: "30px",
  background: "white",
  borderRadius: "25px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};

const listaBotones = {
  display: "grid",
  gap: "15px",
  marginTop: "25px",
};

const botonJuego = {
  width: "100%",
  padding: "18px",
  fontSize: "20px",
  fontWeight: "bold",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  background: "#f4a261",
};

const botonVolver = {
  padding: "12px 25px",
  fontSize: "18px",
  cursor: "pointer",
  borderRadius: "10px",
  border: "none",
};

const cajaPregunta = {
  marginTop: "10px",
  padding: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  background: "#fff3cd",
  borderRadius: "15px",
};

const cajaJuego = {
  padding: "25px",
  background: "#fff3cd",
  borderRadius: "20px",
  marginTop: "5px",
};

const botonesRespuesta = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginTop: "20px",
};

const botonRespuesta = {
  padding: "18px",
  fontSize: "20px",
  fontWeight: "bold",
  borderRadius: "15px",
  border: "none",
  cursor: "pointer",
  background: "white",
};

const respuestaCorrecta = {
  marginTop: "20px",
  padding: "20px",
  fontSize: "26px",
  fontWeight: "bold",
  background: "#d4edda",
  borderRadius: "15px",
};

const respuestaIncorrecta = {
  marginTop: "20px",
  padding: "20px",
  fontSize: "26px",
  fontWeight: "bold",
  background: "#f8d7da",
  borderRadius: "15px",
};

export default Juegos;