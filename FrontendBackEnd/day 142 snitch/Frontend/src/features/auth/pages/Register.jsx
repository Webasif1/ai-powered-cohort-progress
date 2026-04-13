import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import RegisterComponents from "../components/RegisterComponents";

const Register = () => {
  const { handelRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSellerChange = (value) => {
    setFormData((prev) => ({ ...prev, isSeller: value }));
  };

  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handelRegister(formData);
    navigate("/");
  };

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen h-100 flex" style={{ background: "#fdf8f3" }}>
      <RegisterComponents
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        handleSellerChange={handleSellerChange}
        loading={loading}
        handleChange={handleChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default Register;
