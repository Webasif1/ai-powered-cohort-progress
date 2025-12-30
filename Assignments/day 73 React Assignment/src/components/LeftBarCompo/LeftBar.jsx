import React from 'react'
import LeftTop from './LeftTop';
import LeftBottom from './LeftBottom';

const LeftBar = () => {
  return (
    <div className='w-1/6 overflow-hidden h-[95vh] border border-zinc-600 bg-(--c3) rounded-2xl p-5 flex justify-between flex-col' >
      <LeftTop/>
      <LeftBottom/>
    </div>
  )
}

export default LeftBar
