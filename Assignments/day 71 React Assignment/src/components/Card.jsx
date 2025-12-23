import React from 'react'

const Card = (props) => {
  return (
    <div className='flex flex-col  w-full lg:w-92 h-140 rounded-4xl bg-[#FCFCFC] shadow-lg shadow-zinc-400/50 overflow-hidden p-3'>
      <div className={`Card-top  h-1/3 rounded-3xl relative bg-cover bg-center`} style={{ backgroundImage: `url(${props.bgImage})` }}>
      <div className='h-12 w-12 cursor-pointer text-black text-xl bg-[#EFEEED] flex items-center justify-center rounded-full absolute right-4 top-5'>
      <i class="ri-add-large-fill"></i>
      </div>
      </div>
      <div className='Card-round h-30 w-30 rounded-full -mt-10 z-9 mx-auto border-3 border-zinc-100 overflow-hidden'><img className='bg-cover' src={props.image} alt="" />
      </div>
      <div className="Card-middle mt-5 px-6 ">
      <h1 className='text-center text-2xl lg:text-4xl font-semibold text-[#302f2f]'>{props.name}</h1>
      <p className='text-center mt-2 leading-none text-[20px] lg:text-xl '>{props.description}</p>
      </div>
      <div className="Card-middle2 border border-gray-300 flex items-center justify-center gap-10 w-full h-1/5 bg-[#F5F5F5] mt-8 rounded-3xl shadow-lg shadow-zinc-300/20">
      <div className="Like">
        <h3 className='text-xl lg:text-2xl text-center font-semibold'>{props.like}</h3>
        <p className='text:md lg:text-xl text-center text-zinc-500'>Likes</p>
      </div>
      <div className="Post">
        <h3 className='text-xl lg:text-2xl text-center font-semibold'>{props.post}</h3>
        <p className='text:md lg:text-xl text-center text-zinc-500'>Post</p>
      </div>
      <div className="View">
        <h3 className='text-xl lg:text-2xl text-center font-semibold'>{props.view}</h3>
        <p className='text:md lg:text-xl text-center text-zinc-500'>View</p>
      </div>
      </div>
      <div className="Card-bottom flex items-center justify-center py-3 gap-10 text-2xl">
      <i className='cursor-pointer ri-instagram-line'></i>
      <i className='cursor-pointer ri-twitter-x-line'></i>
      <i className='cursor-pointer ri-threads-line' ></i>
      </div>
    </div>
  )
}

export default Card
