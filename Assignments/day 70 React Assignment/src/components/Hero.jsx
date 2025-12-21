import React from 'react'

const Hero = () => {
  return (
    <div className='text-white px-6 md:px-10'>
      <div className='h-200 bg-[url(https://images.unsplash.com/photo-1672853957347-d13c2ed2fc29?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat rounded flex justify-center flex-col items-start p-20'>
        <h1 className='text-9xl '>DESIGN <br /> <span className='px-20'></span> & FREEDOM</h1>
        <p className='w-100 absolute bottom-50 left-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi earum officia rerum, veritatis nulla neque mollitia sunt blanditiis eaque tempora.</p>

          <div className='flex items-center gap-3 absolute bottom-30 right-30'>
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
