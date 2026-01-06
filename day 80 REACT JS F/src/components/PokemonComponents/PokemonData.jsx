import React,{useState,useEffect} from 'react'
import PokeCard from './PokeCard';
import axios from "axios"
import LoadMoreButton from './LoadMoreButton';
import PokemonsText from './PokemonsText';

const PokemonData = () => {

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
  return (
    <>
    <PokemonsText/>
    <div className="w-full flex flex-wrap justify-center gap-8">
      {pokemons.map((elem, idx) => (
        <PokeCard key={idx} name={elem.name} image={elem.image} gif={elem.gif} id={idx + 1} />
      ))}
    </div>
    <LoadMoreButton pokeCard ={pokeCard} pokeapi={pokeapi}/>
    </>
  )
}

export default PokemonData
