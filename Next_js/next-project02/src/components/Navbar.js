import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      <h1>Logo</h1>
      <span className='flex items-center gap-4 font-medium text-xl'>
        <Link href="/">Main</Link>
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </span>

      <button className='bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer'>Contact Now</button>
    </div>
  )
}

export default Navbar
