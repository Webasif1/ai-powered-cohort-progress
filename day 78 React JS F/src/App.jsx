import { useEffect, useState } from "react";
import axios from "axios";

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
            ability: pokeDetail.data.abilities.map((ab) => ab.ability.name)
          }
        })
      )
      setPokemons((pok) => [...pok, ...response])
      setpokeapi(request.data.next)
      console.log(request);
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

  return <div className="m-h-screen w-full bg-zinc-800 p-10 flex flex-col items-center gap-8">
    <div className="flex flex-wrap justify-center gap-8">
    {pokemons.map((elem, idx) => (
      <div key={elem.name}>
        <div className="w-80 h-90 bg-zinc-700 rounded-2xl flex flex-col items-center p-8">
          <div className="rounded-full overflow-hidden"> <img className="w-40 h-40" src={elem.image || "/placeholder.png"} alt="" /></div>
          <p className="text-zinc-400 text-2xl mt-7">#{idx + 1}</p>
          <h4 className="text-white text-5xl">{elem.name.charAt(0).toUpperCase() + elem.name.slice(1)}</h4>
        </div>
      </div>
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
