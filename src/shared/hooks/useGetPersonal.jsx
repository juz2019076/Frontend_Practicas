import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPersonales as getPersonalesRequest } from '../../services/api';

export const useGetPersonal = ({ orden, campo }) => {
    const [personales, setPersonales] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPersonales = async () => {
        try {
            setIsFetching(true);
            const response = await getPersonalesRequest({ orden, campo: 'primer_nombre' });

            if (response.error) {
                throw new Error(response.e.message || 'Error en la solicitud');
            }

            setPersonales(response.data.personal);
            toast.success('Datos cargados exitosamente');
        } catch (error) {
            setErrorMessage('Error al obtener los datos de personales.');
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchPersonales();
    }, [orden, campo]);

    return {
        personales,
        isFetching,
        errorMessage,
    };
};