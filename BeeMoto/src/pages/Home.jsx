import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../Components/Hero/Hero'
import Services from '../Components/Services/Services'
import Title from '../Components/Title/Title'
import About from '../Components/About/About'
import Store from '../Components/Store/Store'
import Contact from '../Components/Contact/Contact'
import Video from '../Components/VideoPlayer/VideoPlayer'

const Home = () => {

  const { hash } = useLocation();

useEffect(() => {
  if (hash) {
    const id = hash.substring(1);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -250; // Adjust based on navbar height
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 200);
  }
}, [hash]); // Run effect whenever hash changes

  const [playState, setPlayState] = useState(false);

  return (
    <div id='home'>
      <Hero/>
      <div className="container">
        <Title subTitle='our services' title='What We Offer'/>
        <Services/>
        <About setPlayState={setPlayState}/>
        <Title subTitle='Gallery' title='Our Space'/>
        <Store/>
        <Title subTitle='Contact Us' title='Only a Message Away'/>
        <Contact/>
      </div>
      <Video playState={playState} setPlayState={setPlayState}/>
    </div>
  )
}

export default Home