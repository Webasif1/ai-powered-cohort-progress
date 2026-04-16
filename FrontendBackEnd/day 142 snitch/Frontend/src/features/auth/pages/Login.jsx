import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import LoginComponents from "../components/LoginComponents";

const Login = () => {
  const { handelLogin } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail = formData.identifier.includes("@");
    await handelLogin({
      email: isEmail ? formData.identifier : undefined,
      contact: !isEmail ? formData.identifier : undefined,
      password: formData.password,
    });
    navigate("/");
  };
  console.log(user)

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen h-100 flex" style={{ background: "#fdf8f3" }}>
      <LoginComponents
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
      />
    </div>
  );
};

export default Login;
