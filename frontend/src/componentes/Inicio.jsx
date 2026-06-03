
import "../estilos/Inicio.css" // ajusta la ruta según donde lo guardes
import {useNavigate} from "react-router-dom"

export default function Inicio() {
  const navigate = useNavigate()
  
  return (
    
    <div className="inicio-container">
      
      <img src="/img/fondo.png" alt="Inicio ChatBot MERN" className="fondo-inicio"/>

      <button className="boton-img boton-chat" onClick={() => navigate("/chatPublico")}>
      <img src="/img/chatear.png" alt="Chatear"/>
      </button>

      <button className="boton-img boton-login" onClick={() => navigate("/Login")}>
      <img src="/img/iniciar.png" alt="Login"/>
      </button>
      
     < button className="boton-img boton-registro" onClick={() => navigate("/registro")}>
      <img src="/img/registrarse.png" alt="Registro"/>
      </button>

    
    </div>
    
  );
  
}
