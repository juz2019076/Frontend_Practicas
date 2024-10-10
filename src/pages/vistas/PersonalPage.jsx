import React, { useState, useEffect } from 'react';
import '../dashboard/dashboardPage.css';  // Importar los estilos
import buttonImage2 from '/src/assets/img/checkform.png';
import employeeImage from '/src/assets/img/empleado-del-mes.png';
import techlogixLogo from '/src/assets/img/techlogix.png';
import { HeaderComp } from '../../components/navbars/Header';
import { NavBarComp } from '../../components/navbars/Navbar';
import { Footer } from '../../components/complements/Footer';
import { Modal } from '../../components/complements/Modal';
import { useGetPersonal } from '../../shared/hooks/useGetPersonal';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useLogVista } from '../../shared/hooks/useLogVista';
import { useNavigate } from 'react-router-dom';



export const PersonalPage = () => {

  const [orden, setOrden] = useState('asc');
  const [campo, setCampo] = useState('primer_nombre');
  const { personales = [], loading, error } = useGetPersonal({ orden, campo });
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const { logVista } = useLogVista();


  const handleSelect = (personal) => {
    setSelectedPersonal(personal);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeOrder = (newOrder) => {
    setOrden(newOrder);
  };

  const filteredPersonales = personales.filter((personal) =>
    `${personal.Id_Asociado} ${personal.primer_nombre} ${personal.primer_apellido}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
            <h2>DATOS PERSONALES DEL COLABORADOR</h2>
          </div>

          {selectedPersonal && (
            <div className="employee-details">
              {['Primer_Nombre', 'Segundo_Nombre', 'Tercer_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Apellido_de_Casada', 'Fecha_de_Nac', 'Lugar_de_Nac', 'Direccion_De_Domicilio', 'numero_celular', 'Numero_De_Celular', 'Correo_Electronico'].map((field, index) => (
                <div className="employee-field" key={index}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={selectedPersonal[field] || ''}
                    readOnly
                  />
                </div>

              ))}

              <button className="back-button" onClick={() => {
                setSelectedPersonal(null);
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
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>MÁS INFORMACIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonales.length > 0 ? (
                        filteredPersonales.map((personal) => (
                          <tr key={personal.Id_Asociado}>
                            <td>{personal.Id_Asociado}</td>
                            <td>{personal.Primer_Nombre}</td>
                            <td>{personal.Primer_Apellido}</td>
                            <td>
                              <div className='button-container'>
                                <button className="info-button" onClick={() => handleSelect(personal)}>
                                  🔍
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <li>No se encontraron resultados</li>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Modal>
        )}

        {!selectedPersonal && (
          <div>
            <button className='regresar-button' onClick={handleBackButton}>Salir</button>
          </div>
        )}


      </div>
      <Footer />
    </main>
  );
};