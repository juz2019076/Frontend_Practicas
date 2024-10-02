import React from 'react';
import { NavBarComp } from '../../components/navbars/Navbar';
import { HeaderComp } from '../../components/navbars/Header';
import './homeStyle.css';
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
                    <p>En un mundo donde la información se ha convertido en uno de los activos más valiosos</p>
                    <p>TECHLOGIX se dedica a ofrecer soluciones avanzadas en seguridad de datos y tecnología</p>
                    <p>Nuestro objetivo es proteger su información, garantizar la confidencialidad de sus datos y ofrecer tecnologías innovadoras que impulsen su negocio hacia el futuro.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};
