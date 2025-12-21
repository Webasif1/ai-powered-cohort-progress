const Cards = () => {
  return (
    <div className="px-6 py-10 flex flex-col lg:flex-row gap-5 items-center">
      <div className="xl:w-1/4 lg:w-1/2 bg-zinc-800 p-10 rounded-xl">
        <h3 className="text-zinc-300 text-2xl">INDEPENDENCY</h3>
        <p className="text-zinc-400 mt-3 mb-12"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia. </p>

        <div className='flex items-center gap-3 cursor-pointer text-white'>
        <div className=' px-3 py-2 text-xl inline-block bg-zinc-700 border rounded-full'>
          <i  class="ri-arrow-right-up-long-line"></i>
          </div>
          <p className='text-xl'>Learn More</p>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 bg-zinc-800 p-10 rounded-xl">
        <h3 className="text-zinc-300 text-2xl">UNIQUITY</h3>
        <p className="text-zinc-400 mt-3 mb-12"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia. </p>
        <div className='flex items-center gap-3 cursor-pointer text-white'>
        <div className=' px-3 py-2 text-xl inline-block bg-zinc-700 border rounded-full'>
          <i  class="ri-arrow-right-up-long-line"></i>
          </div>
          <p className='text-xl'>Learn More</p>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 bg-zinc-800 p-10 rounded-xl">
        <h3 className="text-zinc-300 text-2xl">QUALITY</h3>
        <p className="text-zinc-400 mt-3 mb-12"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia. </p>
        <div className='flex items-center gap-3 cursor-pointer text-white'>
        <div className=' px-3 py-2 text-xl inline-block bg-zinc-700 border rounded-full'>
          <i  class="ri-arrow-right-up-long-line"></i>
          </div>
          <p className='text-xl'>Learn More</p>
          </div>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 bg-zinc-800 p-10 rounded-xl">
        <h3 className="text-zinc-300 text-2xl">SUSTAINABILITY</h3>
        <p className="text-zinc-400 mt-3 mb-12"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, mollitia. </p>
        <div className='flex items-center gap-3 cursor-pointer text-white'>
        <div className=' px-3 py-2 text-xl inline-block bg-zinc-700 border rounded-full'>
          <i  class="ri-arrow-right-up-long-line"></i>
          </div>
          <p className='text-xl'>Learn More</p>
          </div>
      </div>
    </div>
  )
}

export default Cards
