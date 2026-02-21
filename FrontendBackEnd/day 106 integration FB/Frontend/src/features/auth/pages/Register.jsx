import React from 'react'
import { Link } from "react-router"

const Register = () => {

  const handelSubmit = (e) => {
    e.prevent.default
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handelSubmit}>
          <input type="text" name="username" id="username" placeholder="Enter username" />
          <input type="email" name="email" id="email" placeholder="Enter email address" />
          <input type="password" name="password" id="password" placeholder="Enter password" />
          <button className='button primary-button'>Register</button>
        </form>
        <p>Have an account ? <Link to={"/login"}>Login.</Link></p>
      </div>
    </main>
  )
}

export default Register
