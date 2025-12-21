import { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

function App() {

  return (
    <div className='h-screen bg-zinc-950'>
      <NavBar/>
      <Hero/>
    </div>
  )
}

export default App
