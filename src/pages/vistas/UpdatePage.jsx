import React, { useState } from 'react';
import '../dashboard/dashboardPage.css';  // Importar los estilos
import buttonImage1 from '/src/assets/img/historial.png';
import employeeImage from '/src/assets/img/update.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useGetUpdate } from '../../shared/hooks/useGetUpdate';
import { useDebounce } from '../../shared/hooks/useDebounce';

const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  );
};


export const UpdatePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isDataExpanded, setIsDataExpanded] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);


  const { updates, isFetching, errorMessage } = useGetUpdate({ orden: order, campo: 'Nombre_Tabla' });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrder(newOrder);
  };

  const handleSelect = (update) => {
    setSelectedUpdate(update);
    setIsModalOpen(false);
  };

  const toggleDataSection = (index) => {
    setIsDataExpanded(isDataExpanded === index ? null : index);
  };

  const filteredUpdates = updates.filter((update) =>
    `${update.Nombre_Tabla} ${update.Fecha_de_Registro}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <HeaderComp />
      <NavBarComp />

      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Empleados" />
            <h2>UPDATE</h2>
          </div>
        </div>

        <div className="registro-info">
          {selectedUpdate ? (
            <>
              <div><span className="detalle-label">ID:</span> {selectedUpdate._id}</div>
              <div><span className="detalle-label">Usuario:</span> {selectedUpdate.Usuario}</div>
              <div><span className="detalle-label">Nombre de la Tabla:</span> {selectedUpdate.Nombre_Tabla}</div>
              <div><span className="detalle-label">Id Asociado:</span> {selectedUpdate.Id_Asociado}</div>
              <div><span className="detalle-label">Fecha de Registro:</span> {selectedUpdate.Fecha_de_Registro}</div>
              <strong>Cambios:</strong>
              {selectedUpdate.Cambios && selectedUpdate.Cambios.length > 0 ? (
                selectedUpdate.Cambios.map((cambio, index) => (
                  <div key={index}>
                    <button className="toggle-button" onClick={() => toggleDataSection(index)}>
                      <strong>{isDataExpanded === index ? '▲' : '▼'} Cambio {index + 1}</strong>
                    </button>
                    {isDataExpanded === index && (
                      <div className="detalle-content">
                        <span className="detalle-label">Campo:</span> {cambio.campo}<br />
                        <span className="detalle-label">Valor Anterior:</span> {cambio.valor_anterior}<br />
                        <span className="detalle-label">Valor Nuevo:</span> {cambio.valor_nuevo}<br />
                        <span className="detalle-label">ID del Cambio:</span> {cambio._id}<br />
                        <span className="detalle-label">Fecha de registro:</span> {selectedUpdate.Fecha_de_Registro}<br />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-detalles">No hay cambios disponibles.</div>
              )}
            </>
          ) : (
            <div className="no-registro">Seleccione un registro para ver los detalles.</div>
            )}
        </div>

        <div className="techlogix-info">
          <img src={techlogixLogo} alt="TechLogix" />
          <h2>Data Security & Technology</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => setIsModalOpen(true)}>
              <img src={buttonImage1} alt="Mostrar Actualización" />
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
                  <li>Cargando actualizaciones...</li>
                ) : errorMessage ? (
                  <li>{errorMessage}</li>
                ) : (
                  filteredUpdates.length > 0 ? (
                    filteredUpdates.map((update) => (
                      <li key={update._id} className="employee-item">
                        <span> {update.Usuario}   </span>
                        {highlightMatch(`${update.Nombre_Tabla}   | | ${update.Fecha_de_Registro}`, debouncedSearchTerm)}
                        <button onClick={() => handleSelect(update)}>Select</button>
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