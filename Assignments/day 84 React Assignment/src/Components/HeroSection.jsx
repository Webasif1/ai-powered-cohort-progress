import React from "react";
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="heroSection container">
      <div className="heroTopBtns">
        <button className="via23">Via della Creativeita 23</button><button className="mi20">20121 Milano</button>
      </div>
      <div className="heroImg1">
        <img src="./hero-1.webp" alt="Hero-img1" />
      </div>
      <div className="heroContent">
      <h4>Ignoring the spark of inspiration</h4>
      <h1>
        Unleash Your
        <br /> Brand {""}
            <img src="./hero-text-1.jpg" alt="hero-text-logo" />
        {""} with Our <br /> <span className="magic"><div className="magicIn"></div> Magico</span> Design
      </h1>
      </div>
            <div className="heroImg2">
        <img src="./hero-2.jpg" alt="Hero-img2" />
      </div>
      <div className="heroBtnBottom">
        <Link to="/" className="heroMagicBtn">Create Magic </Link>
        <i class="ri-magic-line"></i>
      </div>
    </div>
  );
};

export default HeroSection;
