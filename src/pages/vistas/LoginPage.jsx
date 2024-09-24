import React, { useState }from 'react';
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

const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  );
};

export const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedLogin, setSelectedLogin] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
          <div className="json-display">
            <h3>Detalles del Login Seleccionado</h3>
            <pre>{JSON.stringify(selectedLogin, null, 2)}</pre>
          </div>
        )}

        <div className="techlogix-info">
          <img src={techlogixLogo} alt="TechLogix" />
          <h2>Data Security & Technology</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => setIsModalOpen(true)}>
              <img src={buttonImage1} alt="Mostrar Log Login" />
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
                  <li>Cargando registros de login...</li>
                ) : errorMessage ? (
                  <li>{errorMessage}</li>
                ) : (
                  filteredLogins.length > 0 ? (
                    filteredLogins.map((login) => (
                      <li key={login._id} className="employee-item">
                        {highlightMatch(`${login.email}   | | ${login.loginTime}`, debouncedSearchTerm)}
                        <button onClick={() => handleSelect(login)}>Select</button>
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