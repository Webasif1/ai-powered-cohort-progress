import React from 'react'
import LeftTopLogo from './LeftTopLogo'
import LeftTopMid from './LeftTopMid'
import LeftTopEnd from './LeftTopEnd'
import LeftBarSetting from './LeftBarSetting'

const LeftTop = () => {
  return (
    <div className='flex flex-col text-white'>
    <LeftTopLogo/>
    <LeftTopMid/>
    <LeftTopEnd/>
    <LeftBarSetting/>
  </div>
  )
}

export default LeftTop
