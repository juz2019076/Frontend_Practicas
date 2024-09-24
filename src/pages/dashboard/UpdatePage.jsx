import React from 'react';
import './dashboardPage.css';  // Importar los estilos
import buttonImage1 from '/src/assets/img/historial.png';  
import employeeImage from '/src/assets/img/update.png';  
import techlogixLogo from '/src/assets/img/techlogix.png';  

export const UpdatePage = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">TechLogix</div>
        <nav>
          <a href="/">Home</a>
          <a href="/ingresar">Ingresar</a>
          <a href="/tablas">Tablas</a>
        </nav>
        <div className="icons">
          <i className="mail-icon">📧</i>
          <i className="profile-icon">👤</i>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="content-box">
          <div className="employees-section">
            <div className="employees-icon">
              <img src={employeeImage} alt="Empleados" />
              <h2>UPDATE</h2>
            </div>
          </div>

          {/* Información de TechLogix */}
          <div className="techlogix-info">
            <img src={techlogixLogo} alt="TechLogix" />
            <h2>Data Security & Technology</h2>
            {/* Botón de acción */}
            <div className="action-buttons">
              <button className="action-button">
                <img src={buttonImage1} alt="Button 1" />
              </button>
            </div>
          </div>

          {/* Borde gris grande debajo del botón */}
          <div className="border-bottom"></div>
        </div>
      </main>
    </div>
  );
};
