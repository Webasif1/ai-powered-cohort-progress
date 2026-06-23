import React, { useEffect, useState } from 'react'
import { gsap } from "gsap"

const App = () => {

  const [value, setValue] = useState(0)


  useEffect(() => {
    gsap.fromTo(".box", {
      x: 200,
      delay: 0.5
    },{
      delay: 0.5,
      x:700,
      y:200,
      duration: 1,
    })
  },[])
  useEffect(() => {
      const obj = {
    a : 0,
  }
    gsap.to(obj, {
      a: 200,
      duration:1,
      onUpdate:()=>{
        console.log(obj.a)
        setValue(obj.a)
      },
    })
  },[])


  return (
    <div className='box'>{value}</div>
  )
}

export default App
