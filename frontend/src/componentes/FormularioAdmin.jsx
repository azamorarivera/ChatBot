import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function FormularioAdmin() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [lista, setLista] = useState([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const cargar = async () => {
    setError("");
    try {
      const data = await api.listarPreguntas();
      setLista(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudieron cargar las preguntas.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const resetForm = () => {
    setPregunta("");
    setRespuesta("");
    setEditId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!pregunta.trim() || !respuesta.trim()) {
      setError("Completa ambos campos.");
      return;
    }
    try {
      setGuardando(true);
      if (editId) {
        await api.actualizarPregunta(editId, {
          pregunta: pregunta.trim(),
          respuesta: respuesta.trim(),
        });
      } else {
        await api.crearPregunta({
          pregunta: pregunta.trim(),
          respuesta: respuesta.trim(),
        });
      }
      resetForm();
      await cargar();
    } catch (e) {
      setError(e.message || (editId ? "Error al actualizar." : "Error al crear."));
    } finally {
      setGuardando(false);
    }
  };

  const onEditar = (p) => {
    setPregunta(p.pregunta || "");
    setRespuesta(p.respuesta || "");
    setEditId(p._id || p.id);
  };

  const onEliminar = async (id) => {
    if (!window.confirm("Seguro que deseas eliminar esta pregunta?")) return;
    setError("");
    try {
      setGuardando(true);
      await api.eliminarPregunta(id);
      if (editId === id) resetForm();
      await cargar();
    } catch (e) {
      setError(e.message || "No se pudo eliminar la pregunta.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="card">
      <h2>Alimentar el chatbot</h2>

      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <label>Pregunta</label>
        <textarea
          className="textarea"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          required
        />

        <label>Respuesta</label>
        <textarea
          className="textarea"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          required
        />

        <div className="action-row" style={{ marginTop: 12 }}>
          <button className="btn" disabled={guardando}>
            {guardando ? "Guardando..." : editId ? "Actualizar" : "Guardar"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn secondary"
              onClick={resetForm}
              disabled={guardando}
            >
              Cancelar edicion
            </button>
          )}
        </div>

        {error && <p className="status-text error">{error}</p>}
      </form>

      <hr className="divider" />

      <h3>Base de conocimiento</h3>
      {lista.length === 0 ? (
        <p className="status-text muted">Aun no hay preguntas registradas.</p>
      ) : (
        <ul className="knowledge-list">
          {lista.map((p) => {
            const id = p._id || p.id;
            return (
              <li key={id} className="knowledge-item">
                <strong>{p.pregunta}</strong>
                <div className="knowledge-answer">{p.respuesta}</div>
                <div className="action-row">
                  <button className="btn" type="button" onClick={() => onEditar(p)}>
                    Editar
                  </button>
                  <button className="btn danger" type="button" onClick={() => onEliminar(id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
