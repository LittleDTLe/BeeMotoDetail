import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <p>&copy;{new Date().getFullYear()} BeeMotoDetail.</p>
        <ul>
            <Link to="/terms"><li>Terms of Services</li></Link>
            <Link to="/policies"><li>Privacy Policy</li></Link>
        </ul>
    </div>
  )
}

export default Footer