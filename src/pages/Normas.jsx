import { useNavigate } from "react-router-dom";

function Normas() {
  const navigate = useNavigate();

  const normas = [
    "🙏 Comenzamos nuestra clase con oración.",
    "👂 Escuchamos cuando la maestra está hablando.",
    "✋ Levantamos la mano para participar.",
    "❤️ Tratamos a nuestros compañeros con amor y respeto.",
    "🚶 Caminamos dentro del salón.",
    "🧸 Cuidamos los materiales y juguetes.",
    "😊 Participamos con alegría en las actividades.",
    "📖 Prestamos atención a la Palabra de Dios.",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#a7e3ff, #ffffff, #a4df80)",
        padding: "30px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#8b4513", fontSize: "36px" }}>
        📋 Normas del Salón
      </h1>

      <h2 style={{ color: "#444" }}>
        Life Church Kids
      </h2>

      <p style={{ fontSize: "20px" }}>
        Aprendemos a respetarnos y a compartir el amor de Jesús.
      </p>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          display: "grid",
          gap: "15px",
        }}
      >
        {normas.map((norma, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#333",
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            }}
          >
            {norma}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/inicio")}
        style={{
          background: "#a45118",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        🏠 Volver al inicio
      </button>
    </div>
  );
}

export default Normas;