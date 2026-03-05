import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const Home = () => {

  const { handelGetSong } = useSong()

  return (
    <>
      <FaceExpression
        onClick={(expression) => { handelGetSong({ mood: expression }) }}
      />
      <Player />
    </>
  )
}

export default Home
