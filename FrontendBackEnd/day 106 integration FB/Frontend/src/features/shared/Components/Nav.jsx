import React from 'react'
import { useNavigate } from 'react-router'
import "../nav.scss"

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className="nav-bar">
      <div className="logo">
        <h2>Insta</h2>
      </div>
      <div className="create-post-btn">
        <button
          onClick={() => { navigate("/create-post") }}
          className='button primary-button'>Create post</button>
      </div>
    </div>
  )
}

export default Nav
