import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ children, role = "buyer" }) => {
  const { loading, user } = useSelector(state => state.auth);

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== role) {
    return <Navigate to="/" />
  }

  return children;
}

export default Protected
