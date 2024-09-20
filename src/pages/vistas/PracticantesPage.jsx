import React from 'react';
import './dashboardPage.css';  // Usando los mismos estilos
import buttonImage1 from '/src/assets/img/filtros.png';  
import buttonImage2 from '/src/assets/img/checkform.png';  
import buttonImage3 from '/src/assets/img/historial.png';  
import employeeImage from '/src/assets/img/Practicantes.png';  
import techlogixLogo from '/src/assets/img/techlogix.png';  

export const PracticantesPage = () => {
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
              <img src={employeeImage} alt="Practicantes" />
              <h2>PRACTICANTES</h2>
            </div>

            {/* Detalles de practicantes con campos de entrada */}
            <div className="employee-details">
              {['ID DE PRACTICANTE', 'Institucion_Colegio', 'Grado', 'Carrera', 'Habilidades', 'Número_De_Horas', 'Fecha_De_inicio', 'Fecha_De_Finalización', 'Referido', 'Estado','Action'].map((field, index) => (
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
    </div>
  );
};
