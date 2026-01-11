import React from "react";

const HeroSection = () => {
  return (
    <div className="heroSection container">
      <div className="heroImg1">
        <img src="./hero-1.webp" alt="Hero-img1" />
      </div>
      <div className="heroContent">
      <h4>Ignoring the spark of inspiration</h4>
      <h1>
        Unleash Your
        <br /> Brand {""}
        <div className="heroTextImageBox">
          <span className="heroTextImg">
            <img src="./hero-text-1.png" alt="hero-text-logo" />
          </span>
        </div>
        {""} with Our <br /> <span className="magic"><div className="magicIn"></div> Magico</span> Design
      </h1>
      </div>
    </div>
  );
};

export default HeroSection;
