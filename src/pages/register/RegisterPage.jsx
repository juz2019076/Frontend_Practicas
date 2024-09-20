import React from 'react';
import { useRegister } from '../../shared/hooks/useRegister';
import './registerPage.css';

export const RegisterPage = () => {

  const { handleFileChange, handleFileSubmit, file, isSubmitting, errorMessage } = useRegister();

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2>Subir archivo</h2>
        <form onSubmit={handleFileSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subiendo...' : 'Subir archivo'}
          </button>
        </form>
        {file && <p>Archivo seleccionado: {file.name}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};