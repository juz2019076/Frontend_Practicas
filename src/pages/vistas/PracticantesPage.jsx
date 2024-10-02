import React, { useState, useEffect } from 'react';
import buttonImage2 from '/src/assets/img/checkform.png';
import employeeImage from '/src/assets/img/Practicantes.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { HeaderComp } from '../../components/navbars/Header';
import { Modal } from '../../components/complements/Modal';
import { useGetPracticas } from '../../shared/hooks/useGetPractica';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useLogVista } from '../../shared/hooks/useLogVista';


export const PracticantesPage = () => {
  const [orden, setOrden] = useState('asc');
  const [campo, setCampo] = useState('Institucion_Colegio');
  const { practicas = [], loading, error } = useGetPracticas({ orden, campo });
  const [selectedPractica, setSelectedPractica] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();

  const handleSelect = (practica) => {
    setSelectedPractica(practica);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrden(newOrder);
  };

  const filteredPracticas = practicas.filter((practica) =>
    `${practica.Id_Asociado}${practica.Institucion_Colegio} ${practica.Carrera}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
    <main className='dashboard'>
      <HeaderComp />
      <NavBarComp />
      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Empleados" />
            <h2>SOLICTUDES PRACTICAS</h2>
          </div>

          {selectedPractica && (
            <div className="employee-details">
              {['Institucion_Colegio', 'Grado', 'Carrera', 'Habilidades', 'Número_De_Horas', 'Fecha_De_inicio', 'Fecha_De_Finalización', 'Referido', 'Estado'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={selectedPractica[field] || ''}
                    readOnly
                  />
                </div>
              ))}

              <button className="back-button" onClick={() => {
                setSelectedPractica(null);
                setIsModalOpen(true);
              }}>
                Regresar
              </button>
            </div>
          )}

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
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>COLEGIO</th>
                        <th>CARRERA</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPracticas.length > 0 ? (
                        filteredPracticas.map((practica) => (
                          <tr key={practica.Id_Asociado}>
                            <td>{practica.Id_Asociado}</td>
                            <td>{practica.Institucion_Colegio}</td>
                            <td>{practica.Carrera}</td>
                            <td>
                              <div className='button-container'>
                                <button className="info-button" onClick={() => handleSelect(practica)}>
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
        {!selectedPractica && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
};