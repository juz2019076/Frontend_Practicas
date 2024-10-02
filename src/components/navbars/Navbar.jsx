import React, { useState } from 'react';
import './navbarStyle.css';
import { useLogVista } from '../../shared/hooks/useLogVista';
import { useNavigate } from 'react-router-dom';

export const NavBarComp = () => {

  const [showDropdownTablas, setShowDropdownTablas] = useState(false);
  const [showDropdownLogs, setShowDropdownLogs] = useState(false);
  const [showDropdownRegister, setShowDropdownRegister] = useState(false);

  const { logVista } = useLogVista();
  const navigate = useNavigate();

  const toggleDropdownTablas = () => setShowDropdownTablas(!showDropdownTablas);
  const toggleDropdownLogs = () => setShowDropdownLogs(!showDropdownLogs);
  const toggleDropdownRegister = () => setShowDropdownRegister(!showDropdownRegister);


  const handleNavigation = async (pagina) => {
    const userDetails = localStorage.getItem('user');
    const usuario = userDetails ? JSON.parse(userDetails).email : 'Desconocido'; 

    await logVista(usuario, pagina);

    navigate(pagina);
  };

  return (
    <nav className="nav-bar">
      <ul>
        <li><a href="/home" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>Home</a></li>

        <li className="dropdown">
          <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdownRegister(); }} className="dropbtn">Ingresar</a>
          {showDropdownRegister && (
            <div className="dropdown-content">
              <a href="/register" onClick={(e) => { e.preventDefault(); handleNavigation('/register'); }}>Ingresar formato</a>
            </div>
          )}
        </li>

        <li className="dropdown">
          <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdownTablas(); }} className="dropbtn">Tablas</a>
          {showDropdownTablas && (
            <div className="dropdown-content">
              <a href="/empresa" onClick={(e) => { e.preventDefault(); handleNavigation('/empresa'); }}>Datos Empresariales</a>
              <a href="/personal" onClick={(e) => { e.preventDefault(); handleNavigation('/personal'); }}>Datos Personales</a>
              <a href="/practicantes" onClick={(e) => { e.preventDefault(); handleNavigation('/practicantes'); }}>Solicitudes Practicas</a>
            </div>
          )}
        </li>

        <li className="dropdown">
          <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdownLogs(); }} className="dropbtn">Logs</a>
          {showDropdownLogs && (
            <div className="dropdown-content">
              <a href="/registro" onClick={(e) => { e.preventDefault(); handleNavigation('/registro'); }}>Registro</a>
              <a href="/logUpdate" onClick={(e) => { e.preventDefault(); handleNavigation('/logUpdate'); }}>Log Update</a>
              <a href="/logLogin" onClick={(e) => { e.preventDefault(); handleNavigation('/logLogin'); }}>Log Login</a>
              <a href="/logVista" onClick={(e) => { e.preventDefault(); handleNavigation('/logVista'); }}>Log Vista</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};