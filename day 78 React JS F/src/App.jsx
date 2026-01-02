import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    async function poke() {
      const { data } = await axios(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );

      setPokemons(data.results)
      console.log(pokemons.map((elem,idx)=>(
        elem.url
      )))

    }
    poke();
  }, []);

  return <div className="m-h-screen w-full bg-zinc-800 p-10 flex flex-wrap justify-center gap-8">
        {pokemons.map((elem,idx)=>(
          <div key={idx}>
          <div className="w-120 h-130 bg-zinc-700 rounded-2xl flex flex-col items-center p-8">
           <div className="h-70 w-70 rounded-full overflow-hidden"> <img className="w-full h-full" src={elem.url} alt="" /></div>
           <p className="text-zinc-400 text-2xl mt-7">#1</p>
           <h4 className="text-white text-5xl">{elem.name}</h4>
          </div>
        </div>
        ))}
  </div>;
};

export default App;
