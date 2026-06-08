"use client"
import { createContext, useContext, useEffect } from "react";

let Auth = createContext();

export let AuthPProvider = ({children})=> {

  const [user, setUser] = useState(null)

  let hydrateUser = async ()=>{
    try{
      let res = await api.get("/api/auth/me")
      setUser(res.data.user)
    }catch(error){
      setUser(null)
      console.log("error in hydrateUser", error);
    }
  }

  useEffect(()=>{
    hydrateUser;
  },[])
  return <Auth.Provider value={{user,setUser}}>
    {children}
  </Auth.Provider>
}

export let useAuth = () => useContext(Auth);
