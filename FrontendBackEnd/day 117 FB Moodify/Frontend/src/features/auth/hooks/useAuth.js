import { register, login, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handelGetMe() {
      try {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
  } catch (error) {
    setUser(null);
  } finally {
    setLoading(false);
  }
  }

  async function handelLogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    handelGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handelGetMe,
    handelLogout,
  };
};
