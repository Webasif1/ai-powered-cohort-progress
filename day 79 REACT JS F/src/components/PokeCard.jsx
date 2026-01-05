import React from 'react'

const PokeCard = (props) => {
  return (
    <div key={props.name}>
        <div className="w-80 h-90 bg-zinc-700 rounded-2xl flex flex-col items-center p-8">
          <div className="rounded-full overflow-hidden"> <img className="w-40 h-40" src={props.image || "/placeholder.png"} alt="" /></div>
          <p className="text-zinc-400 text-2xl mt-7">#{props.id}</p>
          <h4 className="text-white text-5xl">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h4>
        </div>
      </div>
  )
}

export default PokeCard
