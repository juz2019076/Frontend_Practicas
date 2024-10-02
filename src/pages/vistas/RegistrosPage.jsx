import React, { useState, useEffect } from 'react';
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
import { useLogVista } from '../../shared/hooks/useLogVista';
import { useNavigate } from 'react-router-dom';

export const RegistrosPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [isDataExpanded, setIsDataExpanded] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();


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

  const toggleDataSection = (index) => {
    setIsDataExpanded(isDataExpanded === index ? null : index);
  };


  const filteredRegistros = registros.filter((registro) =>
    `${registro.file} ${new Date(registro.fecha_creacion).toLocaleString()}${registro.data.map(d => d.Operacion).join(', ')}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
            <img src={employeeImage} alt="Registros" />
            <h2>REGISTRO</h2>
          </div>
        </div>


        {selectedRegistro && (
          <div className="registro-info">
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

              <div className='button-container'>
                <button className="back-button" onClick={() => {
                  setSelectedRegistro(null);
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
                        <th>FILE</th>
                        <th>OPERACION</th>
                        <th>FECHA DE REGISTRO</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistros.length > 0 ? (
                        filteredRegistros.map((registro) => (
                          <tr key={registro._id}>
                            <td>{registro.file}</td>
                            <td>{registro.data.map(d => d.Operacion).join(', ')}</td>
                            <td>{registro.fecha_creacion}</td>
                            <td>
                            <div className='button-container'>

                              <button className="info-button" onClick={() => handleSelect(registro)}>
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

        {!selectedRegistro && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}

      </div >

      <Footer />
    </div >
  );
};