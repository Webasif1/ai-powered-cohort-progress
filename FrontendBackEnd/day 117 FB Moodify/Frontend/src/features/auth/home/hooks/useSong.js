import { getSong } from "../services/song.api";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
  const context = useContext(songContext);

  const { loading, setLoading, song, setSong } = context;

  async function handelGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
  }

  return { loading, song, handelGetSong };
};
