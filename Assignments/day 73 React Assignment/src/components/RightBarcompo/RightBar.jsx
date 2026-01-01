import React from 'react'
import NavBar from './NavBar'
import RightBarHeroSlid from './RightBarHeroSlid'

const RightBar = () => {
  return (
    <div className=' overflow-hidden h-[95vh] w-5/6 rounded-2xl'>

      <NavBar/>
      <RightBarHeroSlid/>
    </div>
  )
}

export default RightBar
