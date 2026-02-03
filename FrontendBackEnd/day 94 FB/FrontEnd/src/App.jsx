import React,{useEffect, useState} from 'react'
import axios from 'axios'

const App =  () => {

  const [note, setNote] = useState([
    { title: "My Note", description: "This is my note" },
    { title: "My Note 2", description: "This is my second note" },
    { title: "My Note 3", description: "This is my third note" },
  ])

  async function fetchNotes() {
  await axios.get("http://localhost:3000/api/notes").then((res)=>{
    setNote(res.data.notes)
  })
  }


  useEffect(() => {
    fetchNotes()
  }, [])


  return (
    <>
    <div className="notes">
      {note.map((elem, index) => (
        <div className="note" key={index}>
          <h2>{elem.title}</h2>
          <p>{elem.description}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
