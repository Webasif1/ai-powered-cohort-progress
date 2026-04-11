import { useDispatch } from "react-redux";
import { register, login } from "../services/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handelRegister({ email, contact, password, fullName }) {
    try {
      dispatch(setLoading(true));
      const res = await register({ email, contact, password, fullName });
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handelLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const res = await login({ email, password });
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
}
