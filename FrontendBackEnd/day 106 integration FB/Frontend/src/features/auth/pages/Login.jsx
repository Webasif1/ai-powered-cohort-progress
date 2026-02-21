import React, { useState } from 'react'
import { Link } from "react-router"
import { useAuth } from '../hooks/useAuth'
import "../style/form.scss"

const Login = () => {

  const { user, loading, handelLogin } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handelSubmit = async (e) => {
    e.preventDefault()

    await handelLogin(username, password)

    console.log("User loggedIn")
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username" />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password" />
          <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account ? <Link to={"/register"}>Create an account.</Link></p>
      </div>
    </main>
  )
}

export default Login
