import React from 'react'

const AboutCard = () => {
  return (
    <div className='AboutCards'>
      <div className="AboutCard Card1">
      <i class="ri-ping-pong-line"></i>
      <p>Professional hard courts<span className='GrayText'> with tournament-grade light and climate control -- play in </span>perfect condition in any season</p>
      <div className="GameMode">
        <div className="BtnOn">
          <div className="CircleOn"></div>
        </div>
        <p>Game Mode</p>
      </div>
      </div>
      <div className="AboutCard Card2">
        <button>Private & Group Lessons</button>
      </div>
      <div className="AboutCard "></div>
    </div>
  )
}

export default AboutCard
