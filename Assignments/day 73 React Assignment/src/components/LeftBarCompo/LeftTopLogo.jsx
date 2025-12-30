import React from 'react'
import { MonitorPlay } from 'lucide-react';

const LeftTopLogo = () => {
  return (
    <div className='text-white flex items-center justify-between '>
    <div className='flex items-center g-2'>
      <MonitorPlay color="#B693EA" size={45} />
      <h4 className='ml-3 text-3xl font-semibold'>Drameeo</h4>
    </div>
    <span className='text-3xl cursor-pointer'><i class="ri-menu-unfold-4-line"></i></span>
  </div>
  )
}

export default LeftTopLogo
