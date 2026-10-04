import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Alabanzas() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const buscarEnYouTube = () => {
    if (!busqueda.trim()) {
      alert("Escribe el nombre de una alabanza.");
      return;
    }

    const texto = encodeURIComponent(busqueda + " alabanza cristiana para niños");
    window.open(
      `https://www.youtube.com/results?search_query=${texto}`,
      "_blank"
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

      <h2>🎶 Música para los niños</h2>

      <p style={{ fontSize: "18px" }}>
        Escribe el nombre de la alabanza que deseas buscar.
      </p>

      <div
        style={{
          maxWidth: "650px",
          margin: "30px auto",
          padding: "30px",
          background: "white",
          borderRadius: "20px",
        }}
      >
        <h2>🔎 Buscar una alabanza</h2>

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
        La maestra puede buscar la alabanza que quiera usar durante la clase.
      </p>
    </main>
  );
}

export default Alabanzas;