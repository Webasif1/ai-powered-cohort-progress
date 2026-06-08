"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

let Auth = createContext();

export let AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let hydrateUser = async () => {
      try {
        let res = await api.get("/api/auth/me");
        console.log(res);
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
        console.log("error in hydrateUser", error);
      }
    };

    hydrateUser();
  }, []);
  return <Auth.Provider value={{ user, setUser }}>{children}</Auth.Provider>;
};

export let useAuth = () => useContext(Auth);
