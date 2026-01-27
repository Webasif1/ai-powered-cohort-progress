import React from 'react'
import "./dock.scss"

const Dock = () => {
  return (
    <div>
      <footer className='dock'>
        <div className="icon github"><img src="./doc-icons/github.svg" alt="Github Icon" /></div>
        <div className="icon note"><img src="./doc-icons/note.svg" alt="Note Icon" /></div>
        <div className="icon pdf"><img src="./doc-icons/pdf.svg" alt="PDF Icon" /></div>
        <div className="icon calender"><img src="./doc-icons/calender.svg" alt="Calender Icon" /></div>
        <div className="icon spotify"><img src="./doc-icons/spotify.svg" alt="Spotify Icon" /></div>
        <div className="icon mail"><img src="./doc-icons/mail.svg" alt="Mail Icon" /></div>
        <div className="icon link"><img src="./doc-icons/link.svg" alt="Link Icon" /></div>
        <div className="icon cli"><img src="./doc-icons/cli.svg" alt="Command Icon" /></div>
      </footer>
    </div>
  )
}

export default Dock
