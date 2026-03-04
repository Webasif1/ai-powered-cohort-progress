import { register, login, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handelRegister({ username, email, password }) {
    setLoading(true);
    const data = await register( username, email, password );
    setUser(data.user);
    setLoading(false);
  }

  async function handelLogin({ email, password }) {
    setLoading(true);
    const data = await login(email, password );
    setUser(data.user);
    setLoading(false);
  }

  async function handelGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }

  async function handelLogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(()=>{
    handelGetMe()
  },[])

  return {
    user,
    loading,
    handelRegister,
    handelLogin,
    handelGetMe,
    handelLogout,
  };
};
