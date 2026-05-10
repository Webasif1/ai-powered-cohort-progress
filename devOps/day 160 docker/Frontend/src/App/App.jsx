import axios from "axios"
import { useState, useEffect } from 'react'

const App = () => {
  const [data, setData] = useState()

  useEffect(
    ()=>{
      axios.get("/api/health")
      .then(response => {
        setData(response.data)
      })
    },[]
  )
  return (
    <div>
      {data}
    </div>
  )
}

export default App
