import React from 'react';
import { useRegister } from '../../shared/hooks/useRegister';
import './registerPage.css';
import { useNavigate } from 'react-router-dom';
import { useLogVista } from '../../shared/hooks/useLogVista';

export const RegisterPage = () => {

  const { logVista } = useLogVista();
  const navigate = useNavigate();
  const { handleFileChange, handleFileSubmit, file, isSubmitting, errorMessage } = useRegister();

  const handleCancel = async () => {
    const userDetails = localStorage.getItem('user');
    const usuario = userDetails ? JSON.parse(userDetails).email : 'Desconocido';

    await logVista(usuario, '/home');
    navigate('/home');
  };


  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2>Subir Archivo</h2>
        <form onSubmit={handleFileSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subiendo...' : 'Subir archivo'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
        </form>
        {file && <p>Archivo seleccionado: {file.name}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};