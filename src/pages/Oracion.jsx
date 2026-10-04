import { useNavigate } from "react-router-dom";
import oracion from "../assets/oracion.png";

function Oracion() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#87ceeb, #ffffff, #b8e986)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 20px",
          fontSize: "18px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Volver al inicio
      </button>

      <h1>🙏 Oración</h1>

      <img
        src={oracion}
        alt="Soy Hijo de Dios"
        style={{
          width: "95%",
          maxWidth: "1200px",
          height: "auto",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}

export default Oracion;