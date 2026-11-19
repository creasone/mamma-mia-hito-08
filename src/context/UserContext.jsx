import { createContext, useContext, useState } from "react";
import { fetchJson } from "../services/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const authenticate = async (path, credentials) => {
    const data = await fetchJson(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    setToken(data.token);
    setEmail(data.email);
    return data;
  };

  const login = (credentials) => authenticate("/api/auth/login", credentials);
  const register = (credentials) => authenticate("/api/auth/register", credentials);

  const getProfile = async () => {
    if (!token) throw new Error("No existe una sesión activa.");
    const data = await fetchJson("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEmail(data.email);
    return data;
  };

  const logout = () => {
    setToken("");
    setEmail("");
  };

  return <UserContext.Provider value={{ token, email, login, register, getProfile, logout }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de UserProvider");
  return context;
}
