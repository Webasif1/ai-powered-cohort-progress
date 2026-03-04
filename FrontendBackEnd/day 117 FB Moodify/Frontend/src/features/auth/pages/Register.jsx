import React, {useState} from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const { loading, handleRegister } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handelSubmit(e) {
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate("/")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          <FormGroup
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            label="username" placeholder="Username" />
          <FormGroup
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            label="email" placeholder="Email" />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="password" placeholder="Password" />
          <button className='button' type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
