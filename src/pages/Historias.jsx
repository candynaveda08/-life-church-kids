import { useState } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  { id: "LPDauiwnO5o", titulo: "El buen samaritano", referencia: "Lucas 10:25–37", duracion: "Video corto · Casita de Nubes", destacado: true, descripcion: "¡Yo puedo amar como Jesús! Una historia animada para aprender a ayudar y amar a nuestro prójimo.", pregunta: "¿Qué hizo el samaritano para ayudar al hombre herido? ¿Cómo puedes demostrar el amor de Jesús esta semana?" },
  { id: "cj9jvNLO6jo", titulo: "El arca de Noé", referencia: "Génesis 6–9", duracion: "Aprox. 14 minutos", descripcion: "Descubramos cómo Noé confió en Dios y siguió sus instrucciones.", pregunta: "¿Cómo podemos obedecer a Dios esta semana?" },
  { id: "GuJicJyBp7Q", titulo: "La máquina súper especial de la gracia", referencia: "Efesios 2:8–9", duracion: "Aprox. 14 minutos", descripcion: "Una aventura de Pequeños Héroes para conversar sobre la gracia y el amor de Dios.", pregunta: "¿Por qué la gracia de Dios es un regalo?" },
];

export default function Historias() {
  const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);
  return (
    <main style={{ minHeight: "100vh", padding: "32px 20px", textAlign: "center", background: "linear-gradient(#87CEEB, #ffffff, #90EE90)", color: "#173b8c" }}>
      <button onClick={() => navigate("/inicio")} style={{ padding: "12px 24px", fontSize: 18, cursor: "pointer" }}>← Volver al inicio</button>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)" }}>🎥 Historias bíblicas</h1>
      <p style={{ fontSize: 22 }}>Aprendamos juntos la Palabra de Dios</p>
      <p>Videos infantiles en español · Historias para aprender y compartir</p>
      {seleccionado && (
        <section aria-label="Video seleccionado" style={{ maxWidth: 900, margin: "24px auto", padding: 16, background: "white", borderRadius: 20 }}>
          <h2>{seleccionado.titulo}</h2>
          <iframe key={seleccionado.id} title={seleccionado.titulo} src={`https://www.youtube-nocookie.com/embed/${seleccionado.id}?rel=0`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ width: "100%", aspectRatio: "16 / 9", border: 0, borderRadius: 12 }} />
          <p>Si el video no se reproduce aquí, <a href={`https://www.youtube.com/watch?v=${seleccionado.id}`} target="_blank" rel="noopener noreferrer">ábrelo en YouTube</a>.</p>
          <p><strong>Conversemos:</strong> {seleccionado.pregunta}</p>
          <button onClick={() => setSeleccionado(null)} style={{ padding: 12, cursor: "pointer" }}>Cerrar video</button>
        </section>
      )}
      <section aria-label="Biblioteca de videos" style={{ maxWidth: 900, margin: "28px auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
        {videos.map((video) => (
          <article key={video.id} style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,.12)" }}>
            {video.destacado && <p style={{ color: "#174ea6", fontWeight: "bold" }}>⭐ Para la lección de esta semana</p>}
            <h2>{video.titulo}</h2>
            <p><strong>{video.referencia}</strong></p>
            <p>{video.duracion} · Español</p>
            <p style={{ color: "#34495e", lineHeight: 1.6 }}>{video.descripcion}</p>
            <button onClick={() => { setSeleccionado(video); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ background: "#174ea6", color: "white", padding: "14px 24px", border: 0, borderRadius: 12, fontSize: 20, cursor: "pointer" }} aria-label={`Ver ${video.titulo}`}>▶ Ver video</button>
            <p><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a></p>
          </article>
        ))}
      </section>
    </main>
  );
}
