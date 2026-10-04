import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/life-kids-logo.png";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!usuario.trim() || !password.trim()) {
    alert("Escriba el usuario y la clave.");
    return;
  }

  try {
    const response = await fetch("https://life-church-kids.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario.trim(),
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/inicio");
    } else {
      alert(data.message || "Usuario o clave incorrectos.");
      setPassword("");
    }
  } catch (error) {
    console.error(error);
    alert("No se pudo conectar con el servidor.");
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
          padding: "42px 36px",
          borderRadius: "26px",
          width: "100%",
          maxWidth: "430px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src={logo}
          alt="Life Church Kids"
          style={{
            width: "150px",
            marginBottom: "28px",
          }}
        />

        <h1
          style={{
            fontSize: "32px",
            lineHeight: "1.3",
            margin: "0 0 18px 0",
          }}
        >
          🔐 Life Church Kids
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            margin: "0 0 30px 0",
            color: "#555",
          }}
        >
          Acceso para personas autorizadas de la iglesia
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "19px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "19px",
              borderRadius: "12px",
              border: "2px solid #ccc",
              marginBottom: "22px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "#c62828",
              color: "white",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;