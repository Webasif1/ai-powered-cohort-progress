import React, { useState } from 'react'
import axios from 'axios'


 const App =  () => {
  const [notes, setNotes] = useState([
    {
      title: "title 1",
      description: "description 1"
    },
    {
      title: "title 2",
      description: "description 2"
    },
    {
      title: "title 3",
      description: "description 3"
    },
    {
      title: "title 4",
      description: "description 4"
    },
  ])

  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.note)
  })



  return (
    <>
    <div className="notes">
      {notes.map((elem,id)=>{
        return  <div key={id} className="note">
        <h2 className='title'>{elem.title}</h2>
        <p className="info">{elem.description}</p>
      </div>
      })}
    </div>
    </>
  )
}

export default App
