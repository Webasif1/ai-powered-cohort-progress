import React from 'react'

const LoadMoreButton = (props) => {
  return (
    <div className='text-center'>
      {props.pokeapi && (
        <button
          onClick={props.pokeCard}
          className="text-xl cursor-pointer px-6 w-fit py-3 bg-blue-500 text-black-700 rounded font-semibold hover:bg-blue-400"
        >
          Load Pokémon
        </button>
      )}</div>
  )
}

export default LoadMoreButton
