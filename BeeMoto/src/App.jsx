import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { createPortal } from 'react-dom'
import Navbar from './Components/Navbar/Navbar'
import Pricing from './pages/Pricing'
import Gallery from './pages/Gallery'
import Footer from './Components/Footer/Footer'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Policies from './pages/Policies'
import './index.css'
import Modal from './Components/Booking/Modal'
import BookButton from './Components/Booking/BookButton'

const App = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(false);
  }

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/policies' element={<Policies/>}/>
        </Routes>
        <div className='container'><Footer/></div>
        <BookButton openModal={() => setModalOpen(true)} isModalOpen={modalOpen}/>
        {modalOpen && (
          createPortal(<Modal onClose={handleButtonClick}/>,document.body)
        )}
      </Router>
    </div>
  )
}

export default App