"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.log("error in hydrateUser", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return (
    <Auth.Provider value={{ user, setUser, loading, hydrateUser }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
