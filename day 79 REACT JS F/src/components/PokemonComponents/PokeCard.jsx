import React, {useState} from 'react'

const PokeCard = (props) => {
  const [image, setimage] = useState(props.image)
  return (
    <>
      <div key={props.name}>
        <div className="w-80 h-100 bg-zinc-700 rounded-2xl flex flex-col items-center p-8">
          <div
          onMouseEnter={()=>{
            setimage(props.gif)
          }}
          onMouseLeave={()=>{
            setimage(props.image)
          }}
           className="rounded-full">
            <img className="w-50 h-50" src={image || "/placeholder.png"} alt="Pokemon character image" />
            </div>
          <p className="text-zinc-400 text-2xl mt-7">#{props.id}</p>
          <h4 className="text-white text-5xl">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h4>
        </div>
      </div>
    </>
  )
}

export default PokeCard
