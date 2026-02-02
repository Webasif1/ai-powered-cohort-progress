import React,{useState} from 'react'

const App = () => {

  const [note, setNote] = useState([
    { title: "My Note", description: "This is my note" },
    { title: "My Note 2", description: "This is my second note" },
    { title: "My Note 3", description: "This is my third note" },
  ])

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
