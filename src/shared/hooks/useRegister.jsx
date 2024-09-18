import { useState } from 'react';

export const useRegister = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log('Archivo subido:', file);
      // Aquí puedes agregar la lógica para enviar el archivo a un servidor
    } else {
      alert('Por favor selecciona un archivo.');
    }
  };

  return {
    handleFileChange,
    handleFileSubmit,
    file,
  };
};