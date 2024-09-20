import { useState } from "react";
import toast from "react-hot-toast";
import { uploadFile as uploadFileRequest } from '../../services/api'

export const useRegister = () => {

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage(''); 
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('files', file); 
    try {
      setIsSubmitting(true);
      const response = await uploadFileRequest(formData);
      if (response.error) {
        throw new Error('Error al subir el archivo');
      }

      toast.success('Archivo subido exitosamente');
      setFile(null); 
    } catch (error) {
      setErrorMessage('Hubo un error al subir el archivo. Inténtalo de nuevo.');
      toast.error(error.message || 'Error al subir el archivo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleFileChange,
    handleFileSubmit,
    file,
    isSubmitting,
    errorMessage,
  };
};