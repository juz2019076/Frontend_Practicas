import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useLogVista } from '../../shared/hooks/useLogVista';


export const UpdatePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isAllDataExpanded, setIsAllDataExpanded] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();


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

  const toggleAllSections = () => {
    setIsAllDataExpanded(!isAllDataExpanded);
  };

  const filteredUpdates = updates.filter((update) =>
    `${update.Nombre_Tabla} ${update.Fecha_de_Registro}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleBackButton = async () => {
    const userDetails = localStorage.getItem('user');
    const usuario = userDetails ? JSON.parse(userDetails).email : 'Desconocido';
    await logVista(usuario, '/home');
    navigate('/home');
  };



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

        {selectedUpdate && (
          <div className="registro-info">
            <>
              <div><span className="detalle-label">ID:</span> {selectedUpdate._id}</div>
              <div><span className="detalle-label">Usuario:</span> {selectedUpdate.Usuario}</div>
              <div><span className="detalle-label">Nombre de la Tabla:</span> {selectedUpdate.Nombre_Tabla}</div>
              <div><span className="detalle-label">Id Asociado:</span> {selectedUpdate.Id_Asociado}</div>
              <div><span className="detalle-label">Fecha de Registro:</span> {selectedUpdate.Fecha_de_Registro}</div>

              <button className="toggle-button" onClick={() => toggleAllSections()}>
                <strong>{isAllDataExpanded ? '▲ Ocultar todos los detalles' : '▼ Mostrar todos los detalles'}</strong>
              </button>

              {isAllDataExpanded && selectedUpdate.Cambios && selectedUpdate.Cambios.length > 0 && (
                <div className="detalle-content">
                  {selectedUpdate.Cambios.map((cambio, index) => (
                    <div key={index}>
                      <span className="detalle-label">Cambio {index + 1}</span><br />
                      <span className="detalle-label">Campo:</span> {cambio.campo}<br />
                      <span className="detalle-label">Valor Anterior:</span> {cambio.valor_anterior}<br />
                      <span className="detalle-label">Valor Nuevo:</span> {cambio.valor_nuevo}<br />
                      <span className="detalle-label">ID del Cambio:</span> {cambio._id}<br />
                      <hr style={{ marginTop: '10px', borderTop: '1px solid #ccc' }} />
                   </div>
                  ))}
                </div>
              )}

              <div className="button-container">
                <button className="back-button" onClick={() => {
                  setSelectedUpdate(null);
                  setIsModalOpen(true);
                }}>
                  Regresar
                </button>
              </div>
            </>
          </div>
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {isFetching ? (
              <p>Cargando datos...</p>
            ) : errorMessage ? (
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
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>TABLA MODIFICADA</th>
                        <th>FECHA DE LA MODIFICACION</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUpdates.length > 0 ? (
                        filteredUpdates.map((update) => (
                          <tr key={update._id}>
                            <td>{update.Nombre_Tabla}</td>
                            <td>{update.Fecha_de_Registro}</td>
                            <td>
                              <div className='button-container'>
                                <button className="info-button" onClick={() => handleSelect(update)}>
                                  🔍
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No se encontraron resultados</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Modal>
        )}

        {!selectedUpdate && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};