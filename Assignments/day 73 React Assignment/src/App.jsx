import React from 'react'
import LeftBar from './components/LeftBarCompo/LeftBar'
import 'remixicon/fonts/remixicon.css'
import RightBar from './components/RightBarcompo/RightBar'

const App = () => {
  return (
    <div className='min-h-screen w-full flex gap-8 bg-(--c2) p-5'>
      <LeftBar/>
      <RightBar/>
    </div>
  )
}

export default App
