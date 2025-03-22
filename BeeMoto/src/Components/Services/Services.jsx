import React from 'react'
import './Services.css'
import bike from '../../assets/bike.jpg'
import service_icon_1 from '../../assets/program-icon-1.png'
import service_icon_2 from '../../assets/program-icon-2.png'
import service_icon_3 from '../../assets/program-icon-3.png'

const Services = () => {
  return (
    <div className='services' id='services' name="services">
        <div className="service">
            <img src={bike} alt="" />
            <div className="caption">
                <img src={service_icon_1} alt="" />
                <p>Wheel Care</p>
            </div>
        </div>
        <div className="service">
            <img src={bike} alt="" />
            <div className="caption">
                <img src={service_icon_2} alt="" />
                <p>Body Paint Care</p>
            </div>
        </div>
        <div className="service">
            <img src={bike} alt="" />
            <div className="caption">
                <img src={service_icon_3} alt="" />
                <p>Deep Cleaning</p>
            </div>
        </div>
    </div>
  )
}

export default Services