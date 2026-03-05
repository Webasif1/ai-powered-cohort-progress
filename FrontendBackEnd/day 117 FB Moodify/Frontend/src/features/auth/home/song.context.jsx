import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext()

export const SongContextProvider = ({ children }) => {

  const [song, setSong] = useState({
    "url": "https://ik.imagekit.io/webasifdotio/cohort-2/moodify/songs/Jaane_Na_Tu__Official_Music_Video____Bhoomi___Almost_Loved_-_EP___UR_Debut___Latest_Hindi_Indie_Song_gj5TYnlp9.mp3",
    "posterUrl": "https://ik.imagekit.io/webasifdotio/cohort-2/moodify/posters/Jaane_Na_Tu__Official_Music_Video____Bhoomi___Almost_Loved_-_EP___UR_Debut___Latest_Hindi_Indie_Song_n44Lbnxvi.jpeg",
    "title": "Jaane Na Tu (Official Music Video) : Bhoomi | Almost Loved - EP | UR Debut | Latest Hindi Indie Song",
    "mood": "happy",
  })

  const [loading, setLoading] = useState(false)

  return (
    <songContext.Provider
      value={{ loading, setLoading, song, setSong }}
    >
      {children}
    </songContext.Provider>
  )
}
