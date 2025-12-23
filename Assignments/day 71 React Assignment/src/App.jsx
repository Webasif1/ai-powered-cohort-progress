import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {

  const userProfile = [
    {
      "fullName": "Ayaan Rahman",
      "description": "Frontend developer focused on clean UI and smooth UX.",
      "userImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      "backgroundImage": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "posts": 520,
      "views": "300.5K",
      "likes": "72.0K"
    },
    {
      "fullName": "Sara Ahmed",
      "description": "Creative designer turning ideas into visual stories.",
      "userImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      "backgroundImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "posts": 480,
      "views": "290.8K",
      "likes": "69.5K"
    },
    {
      "fullName": "Nabil Hossain",
      "description": "JavaScript enthusiast building modern web apps.",
      "userImage": "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      "backgroundImage": "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
      "posts": 510,
      "views": "31.2K",
      "likes": "74.2K"
    },
    {
      "fullName": "Tania Islam",
      "description": "UI designer with a passion for minimal layouts.",
      "userImage": "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "backgroundImage": "https://images.unsplash.com/photo-1503264116251-35a269479413",
      "posts": 495,
      "views": "28.7K",
      "likes": "68.0K"
    },
    {
      "fullName": "Fahim Khan",
      "description": "React developer crafting scalable components.",
      "userImage": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "backgroundImage": "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      "posts": 530,
      "views": "320.0K",
      "likes": "76.0K"
    },
    {
      "fullName": "Mehedi Hasan",
      "description": "Web developer exploring performance and accessibility.",
      "userImage": "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "backgroundImage": "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
      "posts": 505,
      "views": "290.5K",
      "likes": "70.5K"
    },
    {
      "fullName": "Nusrat Jahan",
      "description": "Content creator sharing design inspiration daily.",
      "userImage": "https://images.unsplash.com/photo-1548142813-c348350df52b",
      "backgroundImage": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "posts": 515,
      "views": "310.0K",
      "likes": "73.5K"
    },
    {
      "fullName": "Arif Mahmud",
      "description": "Full-stack learner documenting the dev journey.",
      "userImage": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      "backgroundImage": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      "posts": 490,
      "views": "280.0K",
      "likes": "66.5K"
    },
    {
      "fullName": "Riya Chowdhury",
      "description": "Visual designer obsessed with color and typography.",
      "userImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "backgroundImage": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "posts": 525,
      "views": "325.0K",
      "likes": "78.0K"
    },
    {
      "fullName": "Samiul Islam",
      "description": "Tech blogger writing about frontend trends.",
      "userImage": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      "backgroundImage": "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
      "posts": 500,
      "views": "300.0K",
      "likes": "70.0K"
    }
  ]


  return (
    <div className='flex gap-5 flex-wrap justify-center w-full m-h-screen bg-[#F5F5F5] p-5 lg:p-10'>
      {userProfile.map((elem,idx)=>{
      return  <div key={idx}>
      <Card bgImage = {elem.backgroundImage} image = {elem.userImage} name ={elem.fullName} description = {elem.description} like = {elem.likes} view = {elem.views} post = {elem.posts} /></div>
      })}

    </div>
  )
}

export default App
