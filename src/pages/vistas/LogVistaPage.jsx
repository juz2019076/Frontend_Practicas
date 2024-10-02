import React, { useState, useEffect } from 'react';
import '../dashboard/dashboardPage.css';
import buttonImage1 from '/src/assets/img/historial.png';
import employeeImage from '/src/assets/img/vista.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useLogVista } from '../../shared/hooks/useGetLogVista';
import { useLogVista as useLogVistaPost} from '../../shared/hooks/useLogVista';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';


export const LogVistaPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedLogin, setSelectedLogin] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVistaPost();



  const { logins, isFetching, errorMessage } = useLogVista({ orden: order, campo: 'usuario' });

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleBackButton = async () => {
    const userDetails = localStorage.getItem('user');
    const usuario = userDetails ? JSON.parse(userDetails).email : 'Desconocido';
    await logVista(usuario, '/home');
    navigate('/home');
  };


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
    `${login.usuario} ${login.fecha_de_registro} ${login.pagina}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );


  return (
    <div className="dashboard">
      <HeaderComp />
      <NavBarComp />

      <div className="content-box">
        <div className="employees-section">
          <div className="employees-icon">
            <img src={employeeImage} alt="Logins" />
            <h2>LOG VISTA</h2>
          </div>
        </div>


        {selectedLogin && (
          <div className="registro-info">
            <>
              <div><strong>ID:</strong> {selectedLogin._id}</div>
              <div><strong>Usuario:</strong> {selectedLogin.usuario}</div>
              <div><strong>Pagina:</strong> {selectedLogin.pagina}</div>
              <div><strong>Fecha de Inicio de Sesión:</strong> {selectedLogin.fecha_de_registro}</div>

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
                        <th>FECHA DE REGISTRO</th>
                        <th>PAGINA VISITADA</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogins.length > 0 ? (
                        filteredLogins.map((login) => (
                          <tr key={login._id}>
                            <td>{login.usuario}</td>
                            <td>{login.fecha_de_registro}</td>
                            <td>{login.pagina}</td>
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