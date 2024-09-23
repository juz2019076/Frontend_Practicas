import React from 'react';
import './dashboardPage.css';  // Importar los estilos
import buttonImage1 from '/src/assets/img/filtros.png';  
import buttonImage2 from '/src/assets/img/checkform.png';  
import buttonImage3 from '/src/assets/img/historial.png';  
import employeeImage from '/src/assets/img/Empresas.png';  
import techlogixLogo from '/src/assets/img/techlogix.png';  
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';

export const DashboardPage = () => {
  return (
    <div className="dashboard">
      <HeaderComp/>
      <NavBarComp/>
      {/* Main Content */}
      <main className="dashboard-main">
        <div className="content-box">
          <div className="employees-section">
            <div className="employees-icon">
              <img src={employeeImage} alt="Empleados" />
              <h2>EMPRESAS</h2>
            </div>

            {/* Detalles de empleados con campos de entrada */}
            <div className="employee-details">
              {['ID DE EMPLEADO', 'CÓDIGO PERSONAL', 'Fecha de Contratación', 'Fecha de Cargo', 'CARGO', 'SUELDO', 'RESPONSABILIDADES', 'PERSONAL DE CARGO', 'JEFE INMEDIATO', 'ESTADO', 'FECHA DE REGISTRO', 'ID_EMPLEADO'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input type="text" placeholder={` ${field}`} readOnly />
                </div>
              ))}
            </div>
          </div>

          {/* Información de TechLogix */}
          <div className="techlogix-info">
            <img src={techlogixLogo} alt="TechLogix" />
            <h2>Data Security & Technology</h2>
            {/* Botones de acción */}
            <div className="action-buttons">
              <button className="action-button">
                <img src={buttonImage1} alt="Button 1" />
              </button>
              <button className="action-button">
                <img src={buttonImage2} alt="Button 2" />
              </button>
              <button className="action-button">
                <img src={buttonImage3} alt="Button 3" />
              </button>
            </div>
          </div>

          {/* Borde gris grande debajo de los botones */}
          <div className="border-bottom"></div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};