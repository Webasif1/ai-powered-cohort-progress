import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navBar container'>
        <div className="navLink">
          <Link>Service</Link>
          <Link>Work</Link>
          <Link>About</Link>
        </div>
        <Link to='/' className="NavLogo">
          <img src="./favicon-1.png" alt="navLogo" />
          <h2 className='logoText'>Astratto</h2>
        </Link>
          <div className="navBtns">
            <Link to='/'>Careers</Link>
            <Link className='contactUs-btn' to="/">Contact Us <i class="ri-arrow-right-up-long-line"></i> </Link>
          </div>
    </div>
  )
}

export default NavBar
