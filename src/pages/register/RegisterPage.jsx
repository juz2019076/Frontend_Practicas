import React from 'react';
import { useRegister } from '../../shared/hooks/useRegister';
import './registerPage.css'; 

export const RegisterPage = () => {
  const { handleFileChange, handleFileSubmit, file } = useRegister();

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Sube tu archivo aquí</h1>
        <form onSubmit={handleFileSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Subir archivo</button>
        </form>
        {file && <p>Archivo seleccionado: {file.name}</p>}
      </div>
    </div>
  );
};