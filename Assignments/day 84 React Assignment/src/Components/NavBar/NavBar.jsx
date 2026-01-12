import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='navBar container'>
      <div className="navLink">
        <Link className='navItem'>Service</Link>
        <Link className='navItem'>Work</Link>
        <Link className='navItem'>About</Link>
      </div>
      <Link to='/' className="NavLogo">
        <img src="./favicon-1.png" alt="navLogo" />
        <h2 className='logoText'>Astratto</h2>
      </Link>
      <div className="navBtns">
        <Link className='careersNav' to='/'>Careers</Link>
        <Link className='contactUs-btn' to="/">Contact Us <i className="ri-arrow-right-up-long-line"></i> </Link>
      </div>

      {/* Mobile Menu  */}
      <div className='mobileMenu'>
        <div onClick={() => {
          setToggleMenu((prev) => !prev)
        }} className='mobileNav'>
          {toggleMenu ? <i className="ri-close-large-line"></i> :
          <i class="ri-menu-3-fill"></i>
          }
        </div>
        {toggleMenu && <div className="mobileNavList">
          <div className="mobNavLink">
            <Link className='navItem'>Service</Link>
            <Link className='navItem'>Work</Link>
            <Link className='navItem'>About</Link>
            <Link className='navItem' to='/'>Careers</Link>
            <Link className='navItem contactUs-btn' to="/">Contact Us <i className="ri-arrow-right-up-long-line"></i> </Link>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default NavBar
