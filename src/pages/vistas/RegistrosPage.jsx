import React, { useState } from 'react';
import '../dashboard/dashboardPage.css';  // Importar los estilos
import buttonImage1 from '/src/assets/img/historial.png';
import employeeImage from '/src/assets/img/registro.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useGetRegistros } from '../../shared/hooks/useGetRegistro';
import { useDebounce } from '../../shared/hooks/useDebounce';

const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
  );
};

export const RegistrosPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);


  const { registros, isFetching, errorMessage } = useGetRegistros({ orden: order, campo: 'file' });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrder(newOrder);
  };

  const handleSelect = (registro) => {
    setSelectedRegistro(registro);
    setIsModalOpen(false);
  };

  const filteredRegistros = registros.filter((registro) =>
  `${registro.file} ${registro.fecha_creacion}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <HeaderComp />
      <NavBarComp />

      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Registros" />
            <h2>REGISTRO</h2>
          </div>
        </div>

        {selectedRegistro && (
          <div className="json-display">
            <h3>Detalles del Registro Seleccionado</h3>
            <pre>{JSON.stringify(selectedRegistro, null, 2)}</pre>
          </div>
        )}

        <div className="techlogix-info">
          <img src={techlogixLogo} alt="TechLogix" />
          <h2>Data Security & Technology</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => setIsModalOpen(true)}>
              <img src={buttonImage1} alt="Mostrar Registro" />
            </button>
          </div>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
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
                {isFetching ? (
                  <li>Cargando registros...</li>
                ) : errorMessage ? (
                  <li>{errorMessage}</li>
                ) : (
                  filteredRegistros.length > 0 ? (
                    filteredRegistros.map((registro) => (
                      <li key={registro._id.$oid} className="employee-item">
                        <span></span>
                        {highlightMatch(`${registro.file}   | | ${registro.fecha_creacion}`, debouncedSearchTerm)}
                        <button onClick={() => handleSelect(registro)}>Select</button>
                      </li>
                    ))
                  ) : (
                    <li>No se encontraron resultados</li>
                  )
                )}
              </ul>
            </div>
          </Modal>
        )}
      </div>

      <Footer />
    </div>
  );
};