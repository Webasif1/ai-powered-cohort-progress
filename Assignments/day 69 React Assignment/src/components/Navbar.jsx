import { useState } from "react";

const Menu = ["About Us", "Service", "Coaches", "Event", "Contact"];

cfnst Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="Navbar">
      <div className="Navbar-logo">
        <h4>Webasif</h4>
      </div>
      <div className="MenuBtn"onClick={() => setOpen(!open)}>
      <i className={open ? "ri-close-line" : "ri-menu-3-fill"}></i></div>
      <div className={`NavMenu ${open ? "active" : ""}`}>
        {Menu.map((elem, idx)=>{
          return <a key={idx} href="#">{elem}</a>
        })}
      </div>
      <button className="NavBtn">Book now <i class="ri-arrow-right-up-long-line"></i></button>
    </div>
  )
}

export default Navbar
