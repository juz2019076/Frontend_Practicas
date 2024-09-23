import React from "react";
import './modal.css';

export const Modal = ({ onClose, children }) => {
    const handleBackgroundClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose(); 
      }
    };
  
    return (
      <div className="modal-overlay" onClick={handleBackgroundClick}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  };