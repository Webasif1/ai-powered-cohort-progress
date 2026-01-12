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

              console.log(<div key={idx} className="service">
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
            </div>);

          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceSection
