import React from 'react'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './Contact.css'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        toast.info("Sending....", {autoClose: 250});
        const formData = new FormData(event.target);

        formData.append("access_key", "e5944525-fe56-4408-876b-13b4f6a4480b");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();

        if (data.success) {
        // setTimeout(5000);
        setResult("Form Submitted Successfully");
        toast.success("Success");
        event.target.reset();
        } else {
        console.log("Error", data);
        setResult(data.message);
        toast.error("Failure");
        }
    };

  return (
    <div className='contact' id='contact' name='contact'>
        <div className="contact-col">
            <h3>Send Us a Message</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad quae rem est ipsum voluptates ea pariatur minima, placeat harum, maiores beatae doloremque unde at corporis iure ratione earum ex? Impedit.</p>
            <ul>
                <li><img src={mail_icon} alt="" />Email</li>
                <li><img src={phone_icon} alt="" />Phone</li>
                <li><img src={location_icon} alt="" />Address</li>
            </ul>
        </div>
        <div className="contact-col">
            <form onSubmit={onSubmit}>
                <input type="text" name='name' placeholder='Type Your Name' required/>
                <input type="email" name="email" id="" placeholder='Enter you Email Address' pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required/>
                <input type="tel" name="phone" id="" placeholder='Enter Your Phone Number' minLength={10} maxLength={10} required/>
                <textarea name="message" rows="6" placeholder='Enter Your Message' required></textarea>
                <button type='submit' className='btn dark-btn' >Submit <img src={white_arrow} alt="" /></button>
            </form>
            {/* <span>{result}</span> */}
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Contact
