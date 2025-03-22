import React from 'react'
import './About.css'
import about_img from '../../assets/bike.jpg'
import play_icon from '../../assets/play-icon.png'

const About = ({setPlayState}) => {
  return (
    <div className='about' id = 'about' name="about">
        <div className="about-left">
            <img src={about_img} alt="" className='about-img'/>
            <img src={play_icon} alt="" className='play-icon' onClick={()=>{setPlayState(true)}}/>
        </div>
        <div className="about-right">
            <h3>About Bee Moto Detailing</h3>
            <h2>Our Road To Cleanliness</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quia suscipit sint labore repellendus assumenda, fugiat totam delectus eveniet corrupti dicta ratione, quibusdam commodi eligendi ipsum at tempora atque in.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis cupiditate veritatis iure quaerat nobis doloremque hic. Aliquid possimus alias qui numquam quasi. Amet omnis explicabo ab molestias, rem assumenda laudantium.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptate assumenda minus, hic inventore et sequi dolorem illo expedita laborum provident ad necessitatibus cum alias quae, tenetur laudantium id! Perspiciatis.</p>
        </div>
    </div>
  )
}

export default About