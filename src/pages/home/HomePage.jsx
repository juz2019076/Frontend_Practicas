import React from 'react';
import { Navbar } from '../../components/complements/Navbar';
import { Footer } from '../../components/complements/Footer';
import './homepage.css'; 

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="homepage-container">
                <h2>Bienvenido a TechLogix</h2>
                <div className="dashboard-content">
                    <p>Este es el contenido de TechLogix.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};
