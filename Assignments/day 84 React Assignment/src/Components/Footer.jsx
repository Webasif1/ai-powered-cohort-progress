import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer container'>
      <div className="footerElem">
        <div className="footerText">
          <h6>Open the door to forging your brand's story</h6>
          <h2>Embark on a Transformative Journey <br /> Shaping <span className='textColo'>Yours Brand's Destiny</span> Through Our <br /> Dedicated Partnership</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita debitis vel, ipsa in neque nemo labore itaque, eveniet quibusdam, facere libero repellendus corrupti accusamus voluptates.</p>
        </div>
        <div className="footerBottom">
          <p>Via della Creativita ,26 ,20626 Milano</p>
          <div className="social">
            <i class="ri-twitter-x-line"></i>
            <i class="ri-linkedin-fill"></i>
            <i class="ri-instagram-line"></i>
          </div>
          <div className="privacyCopy">
            <Link className='privacy'>Privacy & Cookies Policy</Link>
              <p>Webasif ©️ 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
