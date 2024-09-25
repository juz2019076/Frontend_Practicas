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
  const [isDataExpanded, setIsDataExpanded] = useState(null); 
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
    console.log("Registro seleccionado:", registro);
    setIsModalOpen(false);
  };

  const toggleDataSection = (index) => {
    setIsDataExpanded(isDataExpanded === index ? null : index);
  };


  const filteredRegistros = registros.filter((registro) =>
    `${registro.file} ${new Date(registro.fecha_creacion).toLocaleString()}${registro.data.map(d => d.Operacion).join(', ')}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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

        <div className="registro-info">
          {selectedRegistro ? (
            <>
              <div><span className="detalle-label">ID:</span> {selectedRegistro._id}</div>
              <div><span className="detalle-label">Fecha de creación:</span> {selectedRegistro.fecha_creacion}</div>
              <strong>Detalles:</strong>
              {selectedRegistro.data && selectedRegistro.data.length > 0 ? (
                selectedRegistro.data.map((detalle, index) => (
                  <div key={index}>
                    <button className="toggle-button" onClick={() => toggleDataSection(index)}>
                      <strong>{isDataExpanded === index ? '▲' : '▼'} Detalle {index + 1}</strong>
                    </button>
                    {isDataExpanded === index && (
                      <div className="detalle-content">
                        <span className="detalle-label">ID:</span> {detalle.ID}<br />
                        <span className="detalle-label">Usuario:</span> {detalle.Usuario}<br />
                        <span className="detalle-label">Operación:</span> {detalle.Operacion}<br />
                        <span className="detalle-label">Nombre de la Tabla:</span> {detalle.Nombre_Tabla}<br />
                        <span className="detalle-label">Id Asociado:</span> {detalle.Id_Asociado}<br />
                        <span className="detalle-label">Detalles:</span><br />
                        <div className="detalles-list">
                          {detalle.Detalles && Object.entries(detalle.Detalles).map(([key, value], idx) => (
                            <div key={idx}>
                              {key}: {value}
                            </div>
                          ))}
                        </div>
                        <span className="detalle-label">Fecha de registro:</span> {detalle.Fecha_de_Registro}<br />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-detalles">No hay detalles disponibles.</div>
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
              <img src={buttonImage1} alt="Mostrar Registro" />
            </button>
          </div>
        </div>

        {
          isModalOpen && (
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
                          {highlightMatch(`Archivo: ${registro.file}   | | Fecha: ${registro.fecha_creacion} | | Operacion: ${registro.data.map(d => d.Operacion).join(', ')}`, debouncedSearchTerm)}
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
          )
        }
      </div >

      <Footer />
    </div >
  );
};