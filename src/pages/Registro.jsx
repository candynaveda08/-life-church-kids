import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/life-kids-logo.png";

function Registro() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Escriba un usuario.");
      return;
    }

    

    if (!password.trim()) {
      alert("Escriba una clave.");
      return;
    }

    if (password.length < 8) {
      alert("La clave debe tener por lo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las claves no coinciden.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "https://life-church-kids.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "No se pudo guardar la cuenta.");
        return;
      }

      alert("✅ Cuenta guardada correctamente.");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    } catch (error) {
      console.error("Error guardando la cuenta:", error);

      alert(
        "No se pudo conectar con el servidor. Verifique que el backend esté encendido."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(#87ceeb, #ffffff, #b8e986)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "460px",
          padding: "40px 35px",
          borderRadius: "26px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Life Church Kids"
          style={{
            width: "140px",
            marginBottom: "20px",
          }}
        />

        <h1
          style={{
            margin: "0 0 10px 0",
            fontSize: "30px",
          }}
        >
          ⚙️ Mi cuenta
        </h1>

        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            marginBottom: "25px",
          }}
        >
          Configure su usuario, correo y clave.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "14px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "14px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "14px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Confirmar clave"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "20px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={saving}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "19px",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "none",
              background: "#c62828",
              color: "white",
              cursor: saving ? "not-allowed" : "pointer",
              marginBottom: "12px",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Guardando..." : "💾 Guardar cuenta"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            style={{
              width: "100%",
              padding: "13px",
              fontSize: "17px",
              borderRadius: "12px",
              border: "1px solid #aaa",
              background: "white",
              cursor: "pointer",
            }}
          >
            ← Volver al Panel de Maestros
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;