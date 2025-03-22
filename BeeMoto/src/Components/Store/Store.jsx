import React from 'react'
import './Store.css'
import bike from '../../assets/bike.jpg'
import white_arrow from '../../assets/white-arrow.png'
import {Link} from 'react-router-dom'


const Store = () => {
  return (
    <div className='store' id='store' name='store'>
        <div className="gallery">
            <img src={bike} alt="" />
            <img src={bike} alt="" />
            <img src={bike} alt="" />
            <img src={bike} alt="" />
        </div>
        <Link to="/gallery"><button className='btn dark-btn'>See More <img src={white_arrow} alt="" /></button></Link>
    </div>
  )
}

export default Store