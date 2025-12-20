import React from 'react'

const HeroBottom = () => {
  return (
    <div className='HeroBottom'>
      <div className="HeroBottomLeft">
        <p>Train with real professional. <br /> Get the real result.</p>
        <div className="HeroTrainer">
          <div className="ImageBox">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trainer image" />
          </div>
          <div className="ImageBox">
            <img src="https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trainer image" />
          </div>
          <div className="ImageBox">
            <img src="https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?q=80&w=693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trainer image" />
          </div>
        </div>
      </div>
      <div className="HeroBottomRight">
        <button><a href="#">Instagram</a><i class="ri-arrow-right-up-long-line"></i></button>
        <button><a href="#">Facebook</a><i class="ri-arrow-right-up-long-line"></i></button>
        <button><a href="#">Tik Tok</a><i class="ri-arrow-right-up-long-line"></i></button>
      </div>
    </div>
  )
}

export default HeroBottom
