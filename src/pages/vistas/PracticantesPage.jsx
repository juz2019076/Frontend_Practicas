import React from 'react';
import buttonImage2 from '/src/assets/img/checkform.png';  
import employeeImage from '/src/assets/img/Practicantes.png';  
import techlogixLogo from '/src/assets/img/techlogix.png';  
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { HeaderComp } from '../../components/navbars/Header';

export const PracticantesPage = () => {
  return (
      <main className='dashboard'>   
        <HeaderComp/>   
        <NavBarComp/>
        <div className="content-box">
          <div className="employees-section">
            <div className="employees-icon">
              <img src={employeeImage} alt="Practicantes" />
              <h2>PRACTICANTES</h2>
            </div>

            <div className="employee-details">
              {['ID DE PRACTICANTE', 'Institucion_Colegio', 'Grado', 'Carrera', 'Habilidades', 'Número_De_Horas', 'Fecha_De_inicio', 'Fecha_De_Finalización', 'Referido', 'Estado','Action'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input type="text" placeholder={` ${field}`} readOnly />
                </div>
              ))}
            </div>
          </div>

          <div className="techlogix-info">
            <img src={techlogixLogo} alt="TechLogix" />
            <h2>Data Security & Technology</h2>
            <div className="action-buttons">
          
              <button className="action-button">
                <img src={buttonImage2} alt="Button 2" />
              </button>
             
            </div>
          </div>

          <div className="border-bottom"></div>
        </div>
        <Footer/>
      </main>
  );
};
