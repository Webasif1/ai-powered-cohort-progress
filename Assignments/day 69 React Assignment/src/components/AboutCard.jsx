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
      <div className="AboutCard Card3">
        <div className="Coaches">
          <h5>100+</h5>
          <p className='ProCoaches'>Pro Coaches</p>
          <p className='ProCoachesPara'>Certified professional ready to boost your game from first server to tournament level.</p>
        </div>
        <div className="Level">
          <div className="CommonLev Beginner">
            <div className="ComChTx">
            <p>Beginner</p>
            <div className="CircleLevel">
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
            </div>
            </div>
            <p>55</p>
          </div>
          <div className="CommonLev Beginner">
            <div className="ComChTx">
            <p>Intermediate</p>
            <div className="CircleLevel">
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
            </div>
            </div>
            <p>40</p>
          </div>
          <div className="CommonLev Beginner">
            <div className="ComChTx">
            <p>Advanced</p>
            <div className="CircleLevel">
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
              <div className="Circle"></div>
            </div>
            </div>
            <p>35</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutCard
