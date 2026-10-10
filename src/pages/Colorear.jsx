import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Colorear() {
  const navigate = useNavigate();

  const [leccion, setLeccion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://life-church-kids.onrender.com/api/lessons")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la lección");
        }

        return respuesta.json();
      })
      .then((datos) => {
        if (Array.isArray(datos) && datos.length > 0) {
          setLeccion(datos[0]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar la lección:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const imprimirDibujo = () => {
    if (!leccion?.dibujo) {
      alert(
        "Todavía no hay un dibujo para imprimir. Primero debes guardar una lección con un dibujo."
      );
      return;
    }

    const ventana = window.open("", "_blank");

    if (!ventana) {
      alert("Permite las ventanas emergentes para imprimir.");
      return;
    }

    const imagen = document.createElement("img");

    imagen.src = leccion.dibujo;
    imagen.alt = "Dibujo bíblico para colorear";

    imagen.style.width = "100%";
    imagen.style.maxWidth = "700px";
    imagen.style.height = "auto";

    ventana.document.title =
      "Dibujo para colorear - Life Church Kids";

    ventana.document.body.style.textAlign = "center";
    ventana.document.body.style.margin = "20px";

    ventana.document.body.appendChild(imagen);

    imagen.onload = () => {
      ventana.focus();
      ventana.print();
    };

    imagen.onerror = () => {
      ventana.document.body.textContent =
        "No se pudo cargar el dibujo para imprimir.";
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(#a0e2ff, #ffffff, #a1df72)",
        textAlign: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "5px",
        }}
      >
        🖍️ Página para Colorear
      </h1>

      <h2>Life Church Kids</h2>

      <p style={{ color: "#666" }}>
        Aquí encontrarás un dibujo bíblico relacionado
        con la lección de la semana.
      </p>

      <div
        style={{
          background: "white",
          maxWidth: "650px",
          margin: "30px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2>📖 Dibujo de la lección</h2>

        {cargando ? (
          <p>Cargando dibujo...</p>
        ) : leccion?.dibujo ? (
          <div>
            <h3>{leccion.title}</h3>

            <img
              src={leccion.dibujo}
              alt="Dibujo bíblico para colorear"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
            />
          </div>
        ) : (
          <p>
            🖍️ Todavía no hay un dibujo para la
            lección de esta semana.
          </p>
        )}

        {/* BOTÓN DE IMPRIMIR SIEMPRE VISIBLE */}

        <button
          onClick={imprimirDibujo}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          🖨️ Imprimir dibujo
        </button>
      </div>

      {/* BOTÓN PARA VOLVER AL INICIO */}

      <button
        onClick={() => navigate("/inicio")}
        style={{
          background: "#2196F3",
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ⬅️ Volver al inicio
      </button>
    </div>
  );
}

export default Colorear;