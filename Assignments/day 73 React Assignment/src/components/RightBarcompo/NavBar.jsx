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
          <div className='px-4 py-3 rounded-full border bg-(--c3)'>
            <i className="ri-notification-2-line text-white text-2xl"></i>
          </div>
            <div className='w-15 h-15 rounded-full border border-zinc-500 overflow-hidden object-center object-cover'>
              <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default NavBar
