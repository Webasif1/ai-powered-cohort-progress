import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home"
import About from "./Pages/About";
import Pokemons from "./Pages/Pokemons";
import PokemonDetails from "./Pages/PokemonDetails";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (< >
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/pokemon" element={<Pokemons/>}/>
      <Route path="/pokemonDetails" element={<PokemonDetails/>}/>
    </Routes>
    <Footer/>
  </>
  )
}
export default App;
