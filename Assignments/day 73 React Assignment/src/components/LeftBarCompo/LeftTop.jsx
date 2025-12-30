import React from 'react'
import LeftTopLogo from './LeftTopLogo'

const LeftTop = () => {
  return (
    <div className='flex flex-col text-white'>

    <LeftTopLogo/>

    <div className='flex flex-col gap-6 mt-8 border-b pb-9 border-zinc-700 '>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-home-2-line text-2xl"></i>
          <p className='text-md'>Home</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-compass-line text-2xl"></i>
          <p className='text-md'>Explore</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-stack-line text-2xl"></i>
          <p className='text-md'>Genres</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-bookmark-line text-2xl"></i>
          <p className='text-md'>Favourites</p>
        </div>
      </div>




    <div className='flex flex-col gap-6 mt-8 border-b pb-9 border-zinc-700 '>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-home-2-line text-2xl"></i>
          <p className='text-md'>Home</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-compass-line text-2xl"></i>
          <p className='text-md'>Explore</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-stack-line text-2xl"></i>
          <p className='text-md'>Genres</p>
        </div>
        <div className='flex items-center gap-3 text-zinc-400 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
          <i className="ri-bookmark-line text-2xl"></i>
          <p className='text-md'>Favourites</p>
        </div>
      </div>



  </div>
  )
}

export default LeftTop
