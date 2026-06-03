import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-20 text-white flex items-center justify-between'>
      <h1 className='text-2xl font-bold'>
        Zewar E-Commerce App
      </h1>
      <div className='flex items-center gap-6 text-xl font-semibold'>
        <Link href={"/home"}>Home</Link>
        <Link href={"/products"}>Products</Link>
      </div>
      <div className='px-4 py-2 text-lg bg-black text-white cursor-pointer rounded-lg hover:bg-gray-800 transition'>
        Login
      </div>
    </div>
  )
}

export default Navbar
