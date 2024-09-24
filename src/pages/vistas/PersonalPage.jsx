import React, { useState, useEffect } from 'react';
import '../dashboard/dashboardPage.css';  // Importar los estilos
import buttonImage2 from '/src/assets/img/checkform.png';
import employeeImage from '/src/assets/img/empleado-del-mes.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useGetPersonal } from '../../shared/hooks/useGetPersonal';
import { useDebounce } from '../../shared/hooks/useDebounce';


const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  );
};


export const PersonalPage = () => {

  const [orden, setOrden] = useState('asc');
  const [campo, setCampo] = useState('primer_nombre');
  const { personales = [], loading, error } = useGetPersonal({ orden, campo });
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);


  const handleSelect = (personal) => {
    setSelectedPersonal(personal);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrden(newOrder);
  };

  const filteredPersonales = personales.filter((personal) =>
    `${personal.primer_nombre} ${personal.primer_apellido}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <main className='dashboard'>
      <HeaderComp />
      <NavBarComp />
      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Empleados" />
            <h2>PERSONALES</h2>
          </div>

          {selectedPersonal && (
            <div className="employee-details">
              {['primer_nombre', 'segundo_nombre', 'tercer_nombre', 'primer_apellido', 'segundo_apellido', 'apellido_de_casada', 'fecha_de_nac', 'lugar_de_nac', 'direccion_domicilio', 'numero_celular', 'numero_casa', 'correo_electronico'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={selectedPersonal[field] || ''}
                    readOnly
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="techlogix-info">
          <img src={techlogixLogo} alt="TechLogix" />
          <h2>Data Security & Technology</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => setIsModalOpen(true)}>
              <img src={buttonImage2} alt="Button 2" />
            </button>
          </div>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {loading ? (
              <p>Cargando datos...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <div className="search-and-order">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="order-buttons">
                    <button onClick={() => handleChangeOrder('asc')}>
                      <span className="icon">🔼</span>
                      Orden Ascendente
                    </button>
                    <button onClick={() => handleChangeOrder('desc')}>
                      <span className="icon">🔽</span>
                      Orden Descendente
                    </button>
                  </div>
                </div>

                <div className="scrollable-list">
                <ul className="employee-list">
                  {filteredPersonales.length > 0 ? (
                    filteredPersonales.map((personal) => (
                      <li key={personal.Id_Asociado} className="employee-item">
                        <span>ID: {personal.Id_Asociado}</span>
                        {highlightMatch(`${personal.primer_nombre} ${personal.primer_apellido}`, debouncedSearchTerm)}
                        <button onClick={() => handleSelect(personal)}>Select</button>
                      </li>
                    ))
                  ) : (
                    <li>No se encontraron resultados</li>
                  )}
                </ul>
                </div>
              </>
            )}
          </Modal>
        )}
      </div>
      <Footer />
    </main>
  );
};