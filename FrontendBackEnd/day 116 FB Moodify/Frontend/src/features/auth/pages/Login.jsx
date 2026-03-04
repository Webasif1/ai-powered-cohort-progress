import React, { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const { loading, handelLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  if(loading){
    return <h1>Loading...</h1>
  }

  async function handelSubmit(e) {
    e.preventDefault()
    await handelLogin({email, password})
    navigate("/")
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="email" placeholder="Enter your email" />
          <FormGroup
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            label="password" placeholder="Enter your password" />
          <button className='button' type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login

