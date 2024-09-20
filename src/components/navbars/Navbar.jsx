import React, {useState} from 'react';
import './navbarStyle.css';

export const NavBarComp = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="nav-bar">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/register">Ingresar</a></li>

        <li className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">Tablas</button>
          {showDropdown && (
            <div className="dropdown-content">
              <a href="/empresa">Empresa</a>
              <a href="/personal">Personales</a>
              <a href="/practica">Practicas</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};