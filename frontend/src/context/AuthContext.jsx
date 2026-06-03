import React, { createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("chatbot_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignorar error de parseo
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("chatbot_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("chatbot_user");
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}