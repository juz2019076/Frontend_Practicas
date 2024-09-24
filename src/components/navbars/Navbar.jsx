import React, {useState} from 'react';
import './navbarStyle.css';

export const NavBarComp = () => {

  const [showDropdownTablas, setShowDropdownTablas] = useState(false);
  const [showDropdownLogs, setShowDropdownLogs] = useState(false);

  const toggleDropdownTablas = () => setShowDropdownTablas(!showDropdownTablas);
  const toggleDropdownLogs = () => setShowDropdownLogs(!showDropdownLogs);

  return (
    <nav className="nav-bar">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/register">Ingresar</a></li>

        <li className="dropdown">
          <button onClick={toggleDropdownTablas} className="dropbtn">Tablas</button>
          {showDropdownTablas && (
            <div className="dropdown-content">
              <a href="/empresa">Empresa</a>
              <a href="/personal">Personales</a>
              <a href="/practicantes">Practicas</a>
            </div>
          )}
        </li>

        <li className="dropdown">
          <button onClick={toggleDropdownLogs} className="dropbtn">Logs</button>
          {showDropdownLogs && (
            <div className="dropdown-content">
              <a href="/registro">Registro</a>
              <a href="/logUpdate">Log Update</a>
              <a href="/logLogin">Log Login</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};