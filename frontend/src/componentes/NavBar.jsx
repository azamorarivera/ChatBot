import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { setAuthToken } from "../services/api";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    logout();
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    marginLeft: 16,
    textDecoration: "none",
    color: isActive ? "var(--accent-strong)" : "var(--muted)",
    fontWeight: isActive ? "700" : "500",
  });

  return (
    <header className="topbar">
      <div
        className="logo"
        style={{ fontWeight: 700, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Chatbot MERN
      </div>

      <nav className="nav" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <NavLink to="/chatPublico" style={linkStyle}>
          Chat
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/alimentar" style={linkStyle}>
            Alimentar
          </NavLink>
        )}

        {!isAuthenticated && (
          <>
            <NavLink to="/login" style={linkStyle}>
              Iniciar sesion
            </NavLink>

            <NavLink to="/registro" style={linkStyle}>
              Registrarse
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <span style={{ marginLeft: 16, color: "var(--muted)" }}>
              Hola, {user?.nombre}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginLeft: 16,
                padding: "6px 12px",
                background: "var(--card-strong)",
                borderRadius: 999,
                border: "1px solid var(--border)",
                color: "var(--danger)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cerrar sesion
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
