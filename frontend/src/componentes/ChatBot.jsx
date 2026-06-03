import React, { useState } from "react";
import { api } from "../services/api";

export default function ChatBot() {
  const [mensajes, setMensajes] = useState([
    { rol: "bot", texto: "Hola! En que te ayudo?" },
  ]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const normalizaRespuesta = (data) => {
    if (data == null) return null;
    if (typeof data === "string") return data;
    return (
      data.respuesta ??
      data.answer ??
      data.reply ??
      data.mensaje ??
      data.message ??
      data.texto ??
      null
    );
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const propio = { rol: "user", texto: texto.trim() };
    setMensajes((m) => [...m, propio]);
    setTexto("");
    setError("");
    setCargando(true);

    try {
      const data = await api.enviarMensaje(propio.texto);
      let reply = normalizaRespuesta(data);
      if (reply == null) reply = "No tengo una respuesta para eso.";

      setMensajes((m) => [...m, { rol: "bot", texto: String(reply) }]);
    } catch (e) {
      setMensajes((m) => [...m, { rol: "bot", texto: "Error de conexion" }]);
      setError(e.message || "No se pudo contactar al servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card">
      <h2>Chat</h2>

      <div className="chat-shell">
        {mensajes.map((m, i) => (
          <div key={i} className={`chat-row ${m.rol === "user" ? "user" : ""}`}>
            <div className={`chat-bubble ${m.rol === "user" ? "user" : "bot"}`}>
              {m.texto}
            </div>
          </div>
        ))}
        {cargando && <div className="chat-loading">Pensando...</div>}
      </div>

      <form onSubmit={enviar} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          className="input"
          placeholder="Escribe tu mensaje..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn" disabled={cargando || !texto.trim()}>
          Enviar
        </button>
      </form>

      {error && <p className="status-text error">{error}</p>}
    </section>
  );
}
