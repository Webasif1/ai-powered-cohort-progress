import React from 'react'

const LeftTopEnd = () => {
    const LeftMenuEnd =[
    {
      name:"Continue Watching",
      icon:"ri-play-large-line"
    },
    {
      name:"Recently Added",
      icon:"ri-time-line"
    },
    {
      name:"My Collection",
      icon:"ri-folder-5-line"
    },
    {
      name:"Download",
      icon:"ri-download-2-line"
    }

  ]

  return (
    <div className='flex flex-col gap-6 mt-8 border-b pb-9 border-zinc-700 '>
      {LeftMenuEnd.map((elem, idx) =>
        <div key={idx} className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className={`${elem.icon} text-2xl`}></i>
          <p className='text-md'>{elem.name}</p>
        </div>
      )}
    </div>
  )
}

export default LeftTopEnd
