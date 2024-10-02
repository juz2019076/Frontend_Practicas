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
import { useLogVista } from '../../shared/hooks/useLogVista';
import { useNavigate } from 'react-router-dom';


export const DashboardPage = () => {

  const [orden, setOrden] = useState('asc');
  const [campo, setCampo] = useState('Descripción_responsabilidades');
  const { empresas = [], loading, error } = useGetEmpresas({ orden, campo });
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();

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
    `${empresa.Id_Asociado}${empresa.Código_personal} ${empresa.Descripción_responsabilidades}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
            <img src={employeeImage} alt="Empresas" />
            <h2>DATOS EMPRESARIALES DEL COLABORADOR</h2>
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

              <button className="back-button" onClick={() => {
                setSelectedEmpresa(null);
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
                        <th>CODIGO PERSONAL</th>
                        <th>CARGO</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmpresas.length > 0 ? (
                        filteredEmpresas.map((empresa) => (
                          <tr key={empresa.Id_Asociado}>
                            <td>{empresa.Código_personal}</td>
                            <td>{empresa.Cargo}</td>
                            <td>
                              <button className="info-button" onClick={() => handleSelect(empresa)}>
                                🔍
                              </button>
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
        {!selectedEmpresa && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}


      </div>
      <Footer />
    </main>
  );
};