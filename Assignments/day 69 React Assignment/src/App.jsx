import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import About from './components/About'
import Service from './components/Service'

const App = () => {
  return (
    <div className='Main'>
      <Navbar/>
      <HeroSection/>
      <About/>
      <Service/>
    </div>
  )
}

export default App
