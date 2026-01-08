import React from 'react'
import {Link} from "react-router-dom";

const HeroLeft = () => {
  return (
    <div className='w-1/2 h-[80vh] flex flex-col justify-center gap-5'>
      <h4 className='px-4 py-2 mb-2 text-xl font-semibold bg-white/30 backdrop-blur-xl w-fit rounded-full'>PokeVers</h4>
      <h1 className='text-8xl font-bold w-200 leading-22'>Discover Pokémon Like Never Before</h1>
      <p className='text-xl w-170'>Explore the Pokémon universe with real-time data, beautiful visuals, and infinite scrolling. Built for fans, trainers, and developers.</p>
      <Link to="/pokemon"><button className='w-fit px-4 py-2 bg-emerald-500 text-2xl font-normal rounded mt-2 cursor-pointer'>Start Exploring</button></Link>
    </div>
  )
}

export default HeroLeft
