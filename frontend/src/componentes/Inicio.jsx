import { useNavigate } from "react-router-dom"
import "../estilos/Inicio.css"

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div className="inicio-container">
      
      <div className="inicio-hero">
        <h1 className="inicio-titulo">¡Bienvenido a <span>Chatbot MERN</span>!</h1>
        <p className="inicio-subtitulo">Tu asistente inteligente está aquí para ayudarte.<br/>
        Inicia sesión, regístrate o comienza a chatear como invitado.</p>
        <div className="inicio-icono">💬</div>
      </div>

      <p className="inicio-pregunta">¿Qué quieres hacer?</p>

      <div className="inicio-botones">
        <div className="inicio-card" onClick={() => navigate("/chatPublico")}>
          <span className="card-icono">🗨️</span>
          <h3>Usar el Chat</h3>
          <p>Comienza a conversar con el chatbot</p>
          <button className="btn-verde">Chatear</button>
        </div>

        <div className="inicio-card" onClick={() => navigate("/Login")}>
          <span className="card-icono">🔒</span>
          <h3>Iniciar sesión</h3>
          <p>Accede a tu cuenta</p>
          <button className="btn-verde">Iniciar sesión</button>
        </div>

        <div className="inicio-card" onClick={() => navigate("/registro")}>
          <span className="card-icono">👤</span>
          <h3>Registrarse</h3>
          <p>Crea una cuenta nueva</p>
          <button className="btn-verde">Registrarse</button>
        </div>
      </div>

    </div>
  );
}
