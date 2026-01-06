import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Pokemons from "./Pages/Pokemons";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (< >
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/pokemon" element={<Pokemons/>}/>
    </Routes>

  </>
  )
}
export default App;
