import React from 'react'
import githubData from "../../assets/github.json"
import MacWindow from './MacWindow'
import "./github.scss"

const GitCard = ({data={id:1,img:"",title:"",description:"",tag:[],repolink:"",demolink:""}})=>{
  return <div className="card">
    <img src={data.img} alt="" />
    <h1>{data.title}</h1>
    <p className='description'>{data.description}</p>

    <div className="tags">
      {data.tag.map((tags)=>{
        return <p className='tag'>{tags}</p>
      })}
    </div>

    <div className="urls">
      <a href={data.repolink}>Repository</a>
      <a href={data.demolink}>Demo Link</a>
    </div>
  </div>
}

const Github = () => {
  return (
    <MacWindow>
      <div className="cards">
        {githubData.map((project)=>{
          return <GitCard data={project}/>
        })}
      </div>
    </MacWindow>
  )
}

export default Github
