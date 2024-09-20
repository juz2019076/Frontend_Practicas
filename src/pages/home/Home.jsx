import React from 'react';
import { NavBarComp } from '../../components/navbars/Navbar';
import { HeaderComp } from '../../components/navbars/Header';
import './homeStyle.css'
import { Footer } from '../../components/complements/Footer';

export const Home = () => {
    return (
        <div>
            <HeaderComp />
            <NavBarComp />
            <div className="main-content">

                <div className="welcome-message">

                    <img src="/src/assets/img/techlogix.png" alt="TechLogix Logo" />
                    <h1>Bienvenido!</h1>
                    <h2>TECHLOGIX</h2>
                    <p>Data Security & Technology</p>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

