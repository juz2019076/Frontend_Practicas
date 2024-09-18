import React from 'react';
import { Navbar } from '../components/complements/Navbar';
import { RegisterPage } from '../pages/register/RegisterPage';

function Register() {
    return (
        <div className="Register">
            <Navbar />
            <div className="content">
                <RegisterPage />
            </div>
        </div>
    );
}

export default Register;
