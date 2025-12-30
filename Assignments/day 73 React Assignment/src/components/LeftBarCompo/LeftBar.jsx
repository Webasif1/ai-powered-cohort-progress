import React from 'react'
import LeftTop from './LeftTop';
import LeftBottom from './LeftBottom';

const LeftBar = () => {
  return (
    <div className='w-80 h-[95vh] bg-(--c3) rounded-2xl p-5 flex justify-between flex-col' >
      <LeftTop/>
      <LeftBottom/>
    </div>
  )
}

export default LeftBar
