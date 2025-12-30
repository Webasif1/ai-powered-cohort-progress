import React from 'react'

const LeftTopMid = () => {
  const LeftMenuMid =[
        {
      name:"Home",
      icon:"ri-home-2-line"
    },
    {
      name:"Explore",
      icon:"ri-compass-line"
    },
    {
      name:"Genres",
      icon:"ri-stack-line"
    },
    {
      name:"Favourites",
      icon:"ri-bookmark-line"
    }
  ]



  return (
    <div className='flex flex-col gap-6 mt-8 border-b pb-9 border-zinc-700 '>
      {LeftMenuMid.map((elem,idx)=>
        <div key={idx} className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
        <i className={`${elem.icon} text-2xl`}></i>
        <p className='text-md'>{elem.name}</p>
      </div>
      )}
    </div>
  )
}

export default LeftTopMid
