import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Alabanzas() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  // Las tres alabanzas fijas de Life Church Kids
  const canciones = [
    {
      nombre: "Grande y Fuerte",
      url: "https://www.youtube.com/watch?v=j5FCuivqp28",
    },
    {
      nombre: "Increíble",
     url: "https://youtu.be/6UzXrf3U9lA", 
    },
    {
      nombre: "Todo lo has cambiado",
      url: "https://youtu.be/6BFGT8QbfIU",
    },
  ];

  const abrirYouTube = (texto) => {
    const busquedaYouTube = encodeURIComponent(texto);

    window.open(
      `https://www.youtube.com/results?search_query=${busquedaYouTube}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const buscarEnYouTube = () => {
    if (!busqueda.trim()) {
      alert("Escribe el nombre de una alabanza.");
      return;
    }

    abrirYouTube(
      busqueda + " alabanza cristiana para niños"
    );
  };

  const manejarEnter = (event) => {
    if (event.key === "Enter") {
      buscarEnYouTube();
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px 20px",
        background:
          "linear-gradient(#87CEEB, #ffffff, #90EE90)",
      }}
    >
      <button
        onClick={() => navigate("/inicio")}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Volver al inicio
      </button>

      <h1 style={{ fontSize: "50px", margin: "10px" }}>
        🎵 Alabanzas
      </h1>

      <p style={{ fontSize: "24px", margin: "5px" }}>
        Alabanzas para Life Church Kids
      </p>

      <h2>🎶 Nuestras alabanzas</h2>

      <p style={{ fontSize: "18px" }}>
        Selecciona una canción para abrirla en YouTube.
      </p>

      <div
        style={{
          maxWidth: "650px",
          margin: "25px auto",
        }}
      >
        {canciones.map((cancion, index) => (
          <div
            key={cancion.nombre}
            style={{
              background: "white",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <h2>
              🎵 {index + 1}. {cancion.nombre}
            </h2>

            <button
              onClick={() =>
  cancion.url
    ? window.open(cancion.url, "_blank", "noopener,noreferrer")
    : abrirYouTube(cancion.busqueda)
}
              style={{
                background: "#e53935",
                color: "white",
                border: "none",
                padding: "15px 25px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              ▶️ Buscar en YouTube
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "650px",
          margin: "30px auto",
          padding: "30px",
          background: "white",
          borderRadius: "20px",
        }}
      >
        <h2>🔎 Buscar otra alabanza</h2>

        <input
          type="text"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          onKeyDown={manejarEnter}
          placeholder="Ejemplo: Mi Dios es tan grande"
          style={{
            width: "90%",
            padding: "15px",
            fontSize: "20px",
            borderRadius: "10px",
            border: "1px solid #999",
            marginBottom: "20px",
          }}
        />

        <br />

        <button
          onClick={buscarEnYouTube}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          🔎 Buscar en YouTube
        </button>
      </div>

      <p style={{ fontSize: "18px" }}>
        La maestra también puede buscar otras alabanzas
        para usar durante la clase.
      </p>
    </main>
  );
}

export default Alabanzas;