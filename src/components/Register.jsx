import React from 'react';
import  {NavBarComp}  from '../components/navbars/Navbar';
import { RegisterPage } from '../pages/register/RegisterPage';
import { HeaderComp } from './navbars/Header';
import { Footer } from './complements/Footer';

function Register() {
    return (
        <div className="Register">
            <HeaderComp/>
            <NavBarComp />
            <div className="content">
                <RegisterPage />
            </div>
            <Footer/>
        </div>
    );
}

export default Register;
