import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completa email y contrasena.");
      return;
    }

    try {
      setCargando(true);
      const resp = await api.login({
        email: email.trim(),
        password: password.trim(),
      });

      setAuthToken(resp.token);
      login(resp.user);
      navigate("/alimentar");
    } catch (err) {
      setError(err.message || "Error al iniciar sesion");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card">
      <h2>Iniciar sesion</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contrasena</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ marginTop: 12 }}>
          <button className="btn" disabled={cargando}>
            {cargando ? "Entrando..." : "Entrar"}
          </button>
        </div>

        {error && <p className="status-text error">{error}</p>}
      </form>
    </section>
  );
}
