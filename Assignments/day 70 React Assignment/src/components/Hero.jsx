import React from 'react'

const Hero = () => {
  return (
    <div className='text-white px-6 md:px-10'>
      <div className='h-150 lg:h-190 bg-[url(https://images.unsplash.com/photo-1672853957347-d13c2ed2fc29?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat rounded flex justify-center flex-col items-start lg:p-20 gap-5 p-4'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-9xl '>DESIGN <br /> <span className='px-5 md:px-7 lg:px-20'></span> & FREEDOM</h1>
        <p className='md:w-100 md:absolute lg:bottom-40 md:bottom-80 lg:left-80 md:left-40 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum officia rerum, veritatis nulla neque mollitia sunt blanditiis eaque tempora.</p>

          <div className='flex items-center gap-3 md:absolute lg:bottom-30 md:bottom-70 md:right-30 cursor-pointer'>
        <div className='px-4 py-3 bg-zinc-500 border rounded-full'>
          <i  class="ri-arrow-down-long-line"></i>
          </div>
          <p className='text-xl'>Learn More</p>
          </div>
      </div>
    </div>
  )
}

export default Hero
