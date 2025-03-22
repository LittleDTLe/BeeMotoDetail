import { useState, useEffect } from "react";
import "./BookButton.css";

const BookButton = ({ openModal, isModalOpen }) => {
  
  return (
    <button onClick={openModal} disabled={isModalOpen} className="btn dark-btn book-button"> Book Now </button>
  );
};

export default BookButton;
