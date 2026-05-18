import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../Services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response?.data) {
          setUser(response.data);
        } else if (response && !response.error) {
          setUser(response); // depending on how the api returns data
        }
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (initialLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">LOADING YOUR PATHETIC DATA...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
