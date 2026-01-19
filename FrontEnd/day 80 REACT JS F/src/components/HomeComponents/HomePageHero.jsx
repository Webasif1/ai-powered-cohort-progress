import React from 'react'
import HeroLeft from './HeroLeft'
import HeroRight from './HeroRight'

const HomePageHero = () => {
  return (
    <div className='flex items-center'>
      <HeroLeft/>
      <HeroRight/>
    </div>
  )
}

export default HomePageHero
