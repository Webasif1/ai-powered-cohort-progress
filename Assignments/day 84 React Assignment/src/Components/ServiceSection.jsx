import React from 'react'
import { ServicesContent } from '../utils/ServicesContent'

const ServiceSection = () => {
  return (
    <div className='serviceSection container'>
      <div className="serviceElement">
        <div className="serviceContent">
          <h2 className="commonTitle">Our Service</h2>
          <p className="commonDes">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis suscipit rem harum hic dolores? Tempora culpa similique eius quia! Tempore!</p>
        </div>

        <div className="services">
          {ServicesContent.map((elem, idx) => {
            return <div key={idx} className="service">
              <div className="serviceTop">
                <h4>{elem.tittle}</h4>
                <i class="ri-arrow-right-up-long-line"></i>
              </div>
              <p className="ServiceMiddle">
                {elem.des}
              </p>
              <div className="serviceBottom">
                <img src={elem.img} alt="Services" />
              </div>
            </div>
          })}
        </div>


          <div className="arrow-dots">
            <div className="arrows">
            <i class="ri-arrow-left-line"></i>
            <i class="ri-arrow-right-line"></i>
            </div>
            <div className="dots">
              {ServicesContent.map((_,idx)=>(
                <div key={idx} className="dot active-dot" id={idx}></div>
              ))}
            </div>
          </div>


        <div className="serviceBottomText">
          <p><div className='line'></div>ABOUT ARTISAN</p>
          <h6>Our visionary artisan collaborate<br/> seamless craft inspiring experiences,<br/> leaving lasting imprints on brands<br/> and space</h6>
        </div>
      </div>
    </div>
  )
}

export default ServiceSection
