import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route.jsx";
import "./App.css";
import { useAuth } from "../features/auth/hooks/useAuth";

const App = () => {
  const { getMe } = useAuth();
  console.log(getMe.res)
  useEffect(() => {
    getMe();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
