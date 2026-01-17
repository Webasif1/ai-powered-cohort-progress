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
          <h6> <img src="./service-text-1.png" alt="" /> Our {" "}
             <span className='gray'>visionary</span> {" "}
             <span className='orange'>artisan</span> {" "}
             collaborate<br/>
             {" "} <span className='purple'>seamless</span> {" "}
             craft <img src="./favicon-1.png" alt="" /> inspiring {" "}<span className='gray'>experiences</span>,<br/> <span className='orange'>leaving</span> lasting <span className='gray'>imprints</span>{" "} on <span className='purple'>brands</span><br/> and space <img src="./service-text-2.png" alt="" /> </h6>
        </div>

        <div className="bottomImg">
          <img src="./line-purple.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default ServiceSection
