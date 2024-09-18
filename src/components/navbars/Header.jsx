import React, { useState, useEffect } from 'react';
import './headerStyle.css';
import userIcon from '../../assets/img/userIcon.png';
import contactIcon from '../../assets/img/contactIcon.png';

export const HeaderComp = (usuario) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        
        const userDetails = localStorage.getItem('user');
        if (userDetails) {
            const { email } = JSON.parse(userDetails);
            setUserEmail(email);
        }
    }, []); 

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        console.log("Sesión cerrada");
        localStorage.removeItem('user');
        setUserEmail(null);
    };

    return (
        <header className="header">
            <div className="left-btn">
                <button className="circle-btn">
                    <img src={contactIcon} alt="Contactos" />
                </button>
            </div>

            <div className="center-title">
                <h1>TechLogix</h1>
            </div>

            <div className="right-btn">
                <button className="circle-btn" onClick={toggleDropdown}>
                    <img src={userIcon} alt="Usuario" />
                </button>

                {dropdownVisible && (
                    <div className="user-dropdown">
                        <p>Correo: {userEmail || 'Invitado'}</p> 
                        <a href="/" onClick={handleLogout}>Cerrar sesión</a>
                    </div>
                )}
            </div>
        </header>
    );
};