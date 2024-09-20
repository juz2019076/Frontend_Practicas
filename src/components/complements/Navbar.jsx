import React, { useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false); 

    const handleHomeClick = () => {
        navigate(`/`);
    };

    const handleIngresarClick = () => {
        navigate(`/ingresar`);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleMenuOptionClick = (path) => {
        setDropdownOpen(false);
        navigate(path);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-image">
                        <img src="/src/assets/img/logo.png" alt="Custom Image" />
                    </div>

                    <div className="navbar-title">
                        <h1>TechLogix</h1>
                    </div>

                    <div className="nav-links">
                        <a onClick={handleHomeClick} className="nav-link"><i className="icon">🏠</i> Home</a>
                        <a onClick={handleIngresarClick} className="nav-link"><i className="icon">🔑</i> Ingresar</a>

                        <div className="dropdown">
                            <button onClick={toggleDropdown} className="dropdown-toggle">
                                Tablas ⬇️
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <a onClick={() => handleMenuOptionClick('/tabla1')} className="dropdown-item">Tabla 1</a>
                                    <a onClick={() => handleMenuOptionClick('/tabla2')} className="dropdown-item">Tabla 2</a>
                                    <a onClick={() => handleMenuOptionClick('/tabla3')} className="dropdown-item">Tabla 3</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="navbar-icon-right">
                        <i onClick={toggleUserMenu} className="icon-user">👤</i>
                        {userMenuOpen && (
                            <div className="user-menu">
                                <a onClick={() => handleMenuOptionClick('/perfil')} className="user-menu-item">Perfil</a>
                                <a onClick={() => handleMenuOptionClick('/cerrar-sesion')} className="user-menu-item">Cerrar sesión</a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
