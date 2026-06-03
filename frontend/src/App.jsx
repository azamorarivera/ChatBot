import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import ChatPublico from "./componentes/chatPublico";
import FormularioAdmin from "./componentes/FormularioAdmin";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import NavBar from "./componentes/NavBar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./estilos/principal.css";

function RutaPrivada({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {/* CAMBIO: el NavBar no se muestra en la página principal "/" */}
      {location.pathname !== "/" && <NavBar />}

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />

          {/* CAMBIO: esta es la ruta correcta del chat público */}
          <Route path="/chatPublico" element={<ChatPublico />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/alimentar"
            element={
              <RutaPrivada>
                <FormularioAdmin />
              </RutaPrivada>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}