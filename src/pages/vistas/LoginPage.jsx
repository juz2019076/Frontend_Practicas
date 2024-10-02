import React, { useState, useEffect } from 'react';
import '../dashboard/dashboardPage.css';
import buttonImage1 from '/src/assets/img/historial.png';
import employeeImage from '/src/assets/img/login1.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useGetLogins } from '../../shared/hooks/useGetLoginLog';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useLogVista } from '../../shared/hooks/useLogVista';

export const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedLogin, setSelectedLogin] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();



  const { logins, isFetching, errorMessage } = useGetLogins({ orden: order, campo: 'email' });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrder(newOrder);
  };

  const handleSelect = (login) => {
    setSelectedLogin(login);
    setIsModalOpen(false);
  };

  const filteredLogins = logins.filter((login) =>
    `${login.email} ${login.loginTime}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
            <img src={employeeImage} alt="Logins" />
            <h2>LOG LOGIN</h2>
          </div>
        </div>


        {selectedLogin && (
          <div className="registro-info">
            <>
              <div><strong>ID:</strong> {selectedLogin._id}</div>
              <div><strong>Usuario ID:</strong> {selectedLogin.userId}</div>
              <div><strong>Email:</strong> {selectedLogin.email}</div>
              <div><strong>IP Address:</strong> {selectedLogin.ipAddress}</div>
              <div><strong>Fecha de Inicio de Sesión:</strong> {selectedLogin.loginTime}</div>
              <div><strong>Fecha de Cierre de Sesión:</strong> {selectedLogin.logoutTime || 'Sesión no cerrada'}</div>

              <div className='button-container'>
                <button className="back-button" onClick={() => {
                  setSelectedLogin(null);
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
                        <th>USUARIO</th>
                        <th>FECHA DE LOGEO</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogins.length > 0 ? (
                        filteredLogins.map((login) => (
                          <tr key={login._id}>
                            <td>{login.email}</td>
                            <td>{login.loginTime}</td>
                            <td>
                              <div className='button-container'>

                                <button className="info-button" onClick={() => handleSelect(login)}>
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

        {!selectedLogin && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}

      </div >

      <Footer />
    </div>
  );
};