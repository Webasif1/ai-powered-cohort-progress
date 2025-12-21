import React from 'react'

function Numbers() {
  return (
    <div className="px-6 py-5 flex flex-col lg:flex-row gap-5 items-center">
      <div className="xl:w-1/4 lg:w-1/2 p-2 rounded-xl text-center">
        <p className="text-gray-400 text-lg mt-3"> DESIGNERS </p>
        <h4 className="text-zinc-200 text-5xl">150+</h4>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 p-2 rounded-xl text-center">
        <p className="text-gray-400 text-lg mt-3"> CLIENTS </p>
        <h4 className="text-zinc-200 text-5xl">500+</h4>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 p-2 rounded-xl text-center">
        <p className="text-gray-400 text-lg mt-3"> MASTERPIECES </p>
        <h4 className="text-zinc-200 text-5xl">200K+</h4>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 p-2 rounded-xl text-center">
        <p className="text-gray-400 text-lg mt-3"> EVENTS </p>
        <h4 className="text-zinc-200 text-5xl">50+</h4>
      </div>
    </div>
  )
}

export default Numbers
