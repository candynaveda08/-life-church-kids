import { useNavigate } from "react-router-dom";

export default function Normas() {
  const navigate = useNavigate();
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(#a7e3ff, #ffffff, #a4df80)", padding: "24px 12px", textAlign: "center" }}>
      <button onClick={() => navigate("/inicio")} style={{ background: "#a45118", color: "white", padding: "15px 30px", border: "none", borderRadius: 12, fontSize: 18, cursor: "pointer", marginBottom: 24 }}>
        🏠 Volver al inicio
      </button>
      <img src="/normas-del-salon.jpeg" alt="Reglas de nuestra clase: escucha cuando la maestra está hablando; sé amable y respetuoso con todos; no correr ni subirse en las sillas; levanta tu mano para hablar; mantén tus manos para ti; participa en la alabanza; cuida tus materiales; no traer juguetes de afuera. En nuestra clase aprendemos, respetamos y adoramos a Dios. 1 Corintios 14:40." style={{ display: "block", width: "100%", maxWidth: 1068, height: "auto", margin: "0 auto", borderRadius: 12 }} />
    </main>
  );
}
