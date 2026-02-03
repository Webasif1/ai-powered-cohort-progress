import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [note, setNote] = useState([
    { title: "My Note", description: "This is my note" },
    { title: "My Note 2", description: "This is my second note" },
    { title: "My Note 3", description: "This is my third note" },
  ])
  const editForm = document.querySelector('.edit-note');
  const showPopup = document.querySelector('.edit-note-popup');
  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    await axios.get("https://note-ucmb.onrender.com/api/notes").then((res) => {
      setNote(res.data.notes)
    })
  }
  async function createNote(title, description) {
    await axios.post("https://note-ucmb.onrender.com/api/notes", { title, description }).then((res) => {
      fetchNotes()
    })
  }

  async function deleteNote(id) {
    await axios.delete(`https://note-ucmb.onrender.com/api/notes/${id}`).then((res) => {
      fetchNotes()
    })
  }

  async function updateNote(id, title, description) {
    await axios.patch(`https://note-ucmb.onrender.com/api/notes/${id}`, { title, description }).then((res) => {
      fetchNotes()
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    createNote(title, description);
    e.target.title.value = "";
    e.target.description.value = "";
  }
  function handleUpdate(e) {
    e.preventDefault();
    const id = e.target.id.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    updateNote(id, title, description);
    e.target.id.value = "";
    e.target.title.value = "";
    e.target.description.value = "";
    showPopup.style.display = 'none';
    editForm.style.display = 'none';
  }
  function handleEdit(id, title, description) {
    const form = document.querySelector('.edit-note form');
    form.id.value = id;
    form.title.value = title;
    form.description.value = description;
  }
  function showEditForm() {
    showPopup.style.display = 'flex';
    editForm.style.display = 'block';
  }



  return (
    <>
      <div className="form-container">
        <h1>Create Note</h1>
        <form className="note-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" name='title' className="title-input" />
          <textarea placeholder="Description" name='description' className="description-input"></textarea>
          <button type="submit" className="submit-btn">Add Note</button>
        </form>
        <div className="edit-note-popup">

          <div className="edit-note">
            <h1>Update Note</h1>
            <form className="note-form" onSubmit={handleUpdate}>
              <input type="text" placeholder="id" name='id' className="title-input" />
              <input type="text" placeholder="Title" name='title' className="title-input" />
              <textarea placeholder="Description" name='description' className="description-input"></textarea>
              <button type="submit" className="submit-btn">Update Note</button>
            </form>
          </div>
        </div>
      </div>
      <h2>All Notes</h2>
      <div className="notes">
        {note.map((elem, index) => (
          <div className="note" key={index}>
            <h3>{elem.title}</h3>
            <p>{elem.description}</p>
            <div className="btns">
              <button className="delete-btn" onClick={() => deleteNote(elem._id)}>Delete</button>
              <button className="edit-btn" onClick={() => { handleEdit(elem._id, elem.title, elem.description); showEditForm(); }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
