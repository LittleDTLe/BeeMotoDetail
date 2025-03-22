import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero container' id='hero' name='hero'>
        <div className="hero-text">
            <h1>We Ensure Only The Best For Your Bike</h1>
            <Link to="/pricing"><button className='btn'>Explore More <img src={dark_arrow} alt="" /></button></Link>
        </div>
    </div>
  )
}

export default Hero