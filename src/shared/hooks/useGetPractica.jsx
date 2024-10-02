import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPracticas as getPracticasRequest } from '../../services/api';

export const useGetPracticas = ({ orden, campo }) => {
    const [practicas, setPracticas] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPracticas = async () => {
        try {
            setIsFetching(true);
            const response = await getPracticasRequest({ orden, campo });

            if (response.error) {
                throw new Error(response.error.message || 'Error en la solicitud');
            }

            setPracticas(response.practicas || []); 
        } catch (error) {
            setErrorMessage('Error al obtener los datos de prácticas.');
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchPracticas();
    }, [orden, campo]);

    return {
        practicas,
        isFetching,
        errorMessage,
    };
};