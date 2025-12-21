import { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Cards from './components/Cards'
import Numbers from './components/Numbers'
import About from './components/About'
import Advantages from './components/Advantages'

function App() {

  return (
    <div className='bg-zinc-950'>
      <NavBar/>
      <Hero/>
      <Cards/>
      <Numbers/>
      <About/>
      <Advantages/>
    </div>
  )
}

export default App
