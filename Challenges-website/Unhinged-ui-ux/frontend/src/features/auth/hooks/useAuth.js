import { signup, signin, logout, getUser } from "../Services/auth.api.js";
import { useContext } from "react";
import { AuthContext } from "../state/authContext.jsx";
import { toast } from "sonner";

export function useSignup() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSignup must be used within an AuthProvider");
  }
  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleSignup = async (data) => {
    try {
      setLoading(true);
      const response = await signup(data);
      setUser(response.user || response);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (data) => {
    try {
      setLoading(true);
      const response = await signin(data);
      setUser(response.user || response);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();
      setUser(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUser(response.user || response);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, handleSignin, handleLogout, handleGetUser };
}
