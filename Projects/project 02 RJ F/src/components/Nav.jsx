import React from "react";
import "./nav.scss";
import DateTime from "./DateTime";

const Nav = () => {
  return (
    <nav>
      <div className="left">
        <div className="apple-icon">
          <img src="./navbar-icons/apple.svg" alt="apple icon" />
        </div>
        <div className="nav-item">
          <p>Md Arafat Hossain</p>
        </div>
        <div className="nav-item">
          <p>File</p>
        </div>
        <div className="nav-item">
          <p>Window</p>
        </div>
        <div className="nav-item">
          <p>Terminal</p>
        </div>
      </div>
      <div className="right">
        <div className="nab-icon">
          <img src="./navbar-icons/wifi.svg" alt="wifi icon" />
        </div>

        <div className="nav-item">
          <DateTime/>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
