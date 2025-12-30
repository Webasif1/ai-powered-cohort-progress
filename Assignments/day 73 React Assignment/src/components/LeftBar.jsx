import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { MonitorPlay } from 'lucide-react';
import { LogOut } from 'lucide-react';

const LeftBar = () => {
  return (
    <div className='w-80 h-screen bg-(--c3) rounded-2xl p-5 flex justify-between flex-col' >
      <div className='flex flex-col text-white'>
        <div className='text-white flex items-center justify-between '>
          <div className='flex items-center g-2'>
            <MonitorPlay color="#B693EA" size={45} />
            <h4 className='ml-3 text-4xl font-semibold'>Drameeo</h4>
          </div>
          <span className='text-3xl cursor-pointer'><i class="ri-menu-unfold-4-line"></i></span>
        </div>



        <div className='flex flex-col gap-6 mt-[40px] border-b pb-9 border-gray-700 '>
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




        <div className='flex flex-col gap-6 mt-[40px] border-b pb-9 border-gray-700 '>
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
      <div className='text-white flex g-2 items-center '>
        <div><LogOut /></div>
        <h6 className='text-2xl'>Logout</h6>
      </div>
    </div>
  )
}

export default LeftBar
