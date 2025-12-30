import React from 'react'

const LeftBarSetting = () => {
  return (
    <div className='mt-8'>
      <div className='flex items-center gap-3 text-zinc-300 cursor-pointer duration-300 ease-in hover:text-(--c1)'>
        <i className="ri-settings-5-line text-2xl"></i>
        <p className='text-xl'>Setting</p>
      </div>
    </div>
  )
}

export default LeftBarSetting
