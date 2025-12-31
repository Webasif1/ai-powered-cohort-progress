import React from 'react'


const NavBar = () => {
  return (
    <div className='flex items-center justify-between'>
        <div className='w-120 relative'>
          <form>
            <input className='bg-(--c3) text-xl border border-zinc-500 text-white outline-none w-full  py-3 px-12 rounded-xl' type="text" placeholder='Search..' />
          </form>
            <i className="ri-search-line absolute text-white text-2xl top-3 left-3"></i>
        </div>
        <div className='flex items-center gap-4'>
          <div className='cursor-pointer px-3 py-2 rounded-full border bg-(--c3)'>
            <i className="ri-notification-2-line text-white text-2xl"></i>
          </div>
            <div className='cursor-pointer w-14 h-14 rounded-full border border-zinc-500 overflow-hidden object-center object-cover'>
              <img src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg" alt="profile image..." />
            </div>
        </div>
    </div>
  )
}

export default NavBar
