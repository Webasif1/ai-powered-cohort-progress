import React from 'react'
import { ProjectContent } from '../utils/ProjectContent'

const ProjectSection = () => {
  return (
    <div className='projectSection container'>
      <div className="projectContent">
        <h2 className="commonTitle">Our Service</h2>
          <p className="commonDes">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis suscipit rem harum hic dolores? Tempora culpa similique eius quia! Tempore!</p>
      </div>

      <div className="projects">
        {ProjectContent.map((elem,idx)=>(
                  <div key={elem.tittle} className="project">
          <div className="prTop" style={{backgroundImage: `url(${elem.img})`}} >
          <p className="tag">{elem.tag}</p>
          <div className="proIcon">
            <i class="ri-arrow-right-up-long-line"></i>
          </div>
          </div>
          <div className="prBottom">
            <h4>{elem.tittle}</h4>
            <p>{elem.des}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectSection
