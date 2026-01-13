import React from 'react'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/> }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
