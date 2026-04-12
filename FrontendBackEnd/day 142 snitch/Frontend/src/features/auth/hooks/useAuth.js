import { useDispatch } from "react-redux";
import { register, login, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../state/auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handelRegister({
    email,
    contact,
    password,
    fullName,
    isSeller = false,
  }) {
    try {
      dispatch(setLoading(true));
      const res = await register({
        email,
        contact,
        password,
        fullName,
        isSeller,
      });
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handelLogin({ email, contact, password }) {
    try {
      dispatch(setLoading(true));
      const res = await login({ email, contact, password });
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setUser(res.user));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch user"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { handelRegister, handelLogin, handleGetMe };
}
