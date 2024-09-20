/* eslint-disable no-unused-vars */
import React from 'react';
import './footer.css';
import { Logo } from '../Logo';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <Logo />
                </div>
                <div className="footer-links">
                    <a href="#privacy" className="footer-link"><i className="icon">🔒</i> Privacy Policy</a>
                    <a href="#terms" className="footer-link"><i className="icon">📜</i> Terms of Service</a>
                    <a href="#contact" className="footer-link"><i className="icon">📞</i> Contact Us</a>
                </div>
                <div className="footer-copy">
                    © 2024 Tech Logix. All rights reserved.
                </div>
            </div>
        </footer>
    );
};