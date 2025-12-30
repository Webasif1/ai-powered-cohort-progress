import React from 'react'
import { LogOut } from 'lucide-react';

const LeftBottom = () => {
  return (
    <div className='text-white flex gap-4 items-center cursor-pointer w-fit'>
        <div><LogOut /></div>
        <h6 className='text-xl font-light'>Logout</h6>
      </div>
  )
}

export default LeftBottom
