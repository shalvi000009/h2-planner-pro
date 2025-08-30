import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "user" | "admin";
export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  role: Role;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("h2_auth");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const value = useMemo(() => ({
    user,
    login: (u: AuthUser) => {
      setUser(u);
      localStorage.setItem("h2_auth", JSON.stringify(u));
    },
    logout: () => {
      setUser(null);
      localStorage.removeItem("h2_auth");
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};