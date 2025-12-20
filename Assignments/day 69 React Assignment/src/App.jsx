import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import About from './components/About'

const App = () => {
  return (
    <div className='Main'>
      <Navbar/>
      <HeroSection/>
      <About/>
    </div>
  )
}

export default App
