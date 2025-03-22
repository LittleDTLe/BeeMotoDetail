import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import io from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';
import './Modal.css'

// Connect to the WebSocket server
const socket = io("http://localhost:5000"); // Adjust the URL if needed


const Modal = ({ onClose }) => {

    const handleCancel = () => {
        document.getElementById("appointment").reset();
    }

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: ""
      });

      const [services, setServices] = useState([]);
      const [availableTimes, setAvailableTimes] = useState([]);
    
      // Fetch services from services.json in the public folder
      useEffect(() => {
        fetch("/services.json")
          .then(res => res.json())
          .then(data => setServices(data))
          .catch(err => console.error("Error fetching services:", err));
      }, []);
    
      // Fetch available timeslots when a date is selected
      useEffect(() => {
        if (formData.date) {
          fetch(`http://localhost:5000/api/timeslots/${formData.date}`)
            .then(res => res.json())
            .then(data => setAvailableTimes(data))
            .catch(err => console.error("Error fetching timeslots:", err));
        }
      }, [formData.date]);
    
      // Listen for real-time updates via WebSockets
      useEffect(() => {
        socket.on("timeslotBooked", ({ date, time }) => {
          if (formData.date === date) {
            setAvailableTimes(prev => prev.filter(t => t !== time));
          }
        });
        return () => socket.off("timeslotBooked");
      }, [formData.date]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // First, submit form data to Web3Forms for email notification
        const web3FormData = new FormData();
        web3FormData.append("access_key", "e5944525-fe56-4408-876b-13b4f6a4480b"); // Replace with your actual key
        web3FormData.append("name", formData.name);
        web3FormData.append("email", formData.email);
        web3FormData.append("tel", formData.phone);
        web3FormData.append("service", formData.service);
        web3FormData.append("date", formData.date);
        web3FormData.append("time", formData.time);
    
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: web3FormData,
        });
        const web3Result = await web3Response.json();
        if (!web3Response.ok) {
          toast.error("Web3Forms submission failed: " + web3Result.message);
          return;
        }
    
        // Then, book the appointment via our backend API
        const response = await fetch("http://localhost:5000/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          // Emit a WebSocket event to update other users
          socket.emit("bookTime", { date: formData.date, time: formData.time });
          onClose();
        } else {
          toast.info(result.message);
        }
      };
    

  return (
    <div className='modal-container' onClick={(e) => {
        if(e.target.className === "modal-container"){
            onClose()
            }
        }
    }>
        <div className='modal'>
            <div className="modal-header">
                <p className="close" onClick={() => onClose()}>&times;</p>
            </div>
            <div className="modal-content">
                <span className='book-col right'>
                    <h1>Book Your Appointment Now!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </span>
                <div className="book-col left">
                <form onSubmit={handleSubmit} id='appointment'>
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="tel" name="phone"  placeholder='Enter Your Phone Number' minLength={10} maxLength={10} required onChange={handleChange}/>
                    <select name="service" required onChange={handleChange}>
                        <option value="">Select Service</option>
                        {services.map(service => (
                        <option key={service.id} value={service.name}>
                            {service.name}
                        </option>
                        ))}
                    </select>
                    <input type="date" name="date" required onChange={handleChange} />
                    <select name="time" required onChange={handleChange}>
                        <option value="">Select Time</option>
                        {availableTimes.map(time => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                        ))}
                    </select>
                    {/* <button className='btn btn-submit' type="submit">Confirm Booking</button>
                    <button className='btn btn-cancel' type="button" onClick={handleCancel}>Cancel</button> */}
                </form>
                </div>
            </div>
            <div className="modal-footer">
                <button className='btn btn-submit' type='submit' onClick={handleSubmit}>Book Appointment</button>
                <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )

}

export default Modal