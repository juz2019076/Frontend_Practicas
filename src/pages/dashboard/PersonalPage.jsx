import React from 'react';
import './dashboardPage.css';  // Importar los estilos
import buttonImage1 from '/src/assets/img/filtros.png';  
import buttonImage2 from '/src/assets/img/checkform.png';  
import buttonImage3 from '/src/assets/img/historial.png';  
import employeeImage from '/src/assets/img/empleado-del-mes.png';  
import techlogixLogo from '/src/assets/img/techlogix.png';  

export const PersonalPage = () => {
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
              <h2>PERSONALES</h2>
            </div>

            {/* Detalles de empleados con campos de entrada */}
            <div className="employee-details">
              {['primer_nombre', 'segundo_nombre', 'tercer_nombre', 'primer_apellido', 'segundo_apellido', 'apellido_de_casada', 'fecha_de_nac', 'lugar_de_nac', 'direccion_domicilio', 'numero_celular', 'numero_casa', 'correo_electronico', 'action'].map((field, index) => (
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