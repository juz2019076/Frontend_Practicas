import React, { useState, useEffect } from 'react';
import './dashboardPage.css';
import buttonImage2 from '/src/assets/img/checkform.png';
import employeeImage from '/src/assets/img/Empresas.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useGetEmpresas } from '../../shared/hooks/useGetEmpresa';

const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  );
};


export const DashboardPage = () => {

  const [orden, setOrden] = useState('asc');
  const [campo, setCampo] = useState('Descripción_responsabilidades');
  const { empresas = [], loading, error } = useGetEmpresas({ orden, campo });
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSelect = (empresa) => {
    setSelectedEmpresa(empresa);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrden(newOrder);
  };

  const filteredEmpresas = empresas.filter((empresa) =>
    `${empresa.Código_personal} ${empresa.Descripción_responsabilidades}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <main className='dashboard'>
      <HeaderComp />
      <NavBarComp />
      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Empresas" />
            <h2>EMPRESAS</h2>
          </div>

          {selectedEmpresa && (
            <div className="employee-details">
              {['Id_Asociado', 'Código_personal', 'Fecha_contratación', 'Fecha_cargo', 'Cargo', 'Sueldo', 'Descripción_responsabilidades', 'Personal_cargo', 'Jefe_inmediato', 'Estado'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={selectedEmpresa[field] || ''}
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
                    {filteredEmpresas.length > 0 ? (
                      filteredEmpresas.map((empresa) => (
                        <li key={empresa.Id_Asociado} className="employee-item">
                          <span>ID: {empresa.Id_Asociado}</span>
                          {highlightMatch(`${empresa.Código_personal} || ${empresa.Descripción_responsabilidades} `, debouncedSearchTerm)}
                          <button onClick={() => handleSelect(empresa)}>Select</button>
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