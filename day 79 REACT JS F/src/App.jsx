import { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "./components/PokeCard";

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false);
  const [pokeapi, setpokeapi] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")


  const pokeCard = async function () {
    if (!pokeapi || loading) return
    setLoading(true);

    try {
      const request = await axios.get(pokeapi)
      const response = await Promise.all(
        request.data.results.map(async (p) => {
          const pokeDetail = await axios.get(p.url)

          return {
            name: p.name,
            image: pokeDetail.data.sprites.other["official-artwork"].front_default,
            gif: pokeDetail.data.sprites.other["showdown"].front_default,
            ability: pokeDetail.data.abilities.map((ab) => ab.ability.name)

          }
        })
      )
      setPokemons((pok) => [...pok, ...response])
      setpokeapi(request.data.next)
    } catch (error) {
      console.error("Failed to load Pokémon", error);
    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    const scrollCard = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        pokeCard()
      }
    }

    window.addEventListener("scroll", scrollCard)
    return () => window.removeEventListener("scroll", scrollCard)
  }, [pokeapi, loading]);



  return <div className="m-h-screen w-full p-10 flex flex-col items-center gap-8">
    <div className="flex flex-wrap justify-center gap-8">
    {pokemons.map((elem, idx) => (
      <PokeCard key={idx} name={elem.name} image={elem.image} id={idx+1}/>
    ))}
    </div>

    {pokeapi && (
      <button
        onClick={pokeCard}
        className="text-xl cursor-pointer px-6 w-fit py-3 bg-blue-500 text-black-700 rounded font-semibold hover:bg-blue-400"
      >
        Load Pokémon
      </button>
    )}
  </div>;
};

export default App;
