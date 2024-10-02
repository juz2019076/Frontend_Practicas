import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getEmpresas as getEmpresasRequest } from '../../services/api';

export const useGetEmpresas = ({ orden, campo }) => {
    const [empresas, setEmpresas] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchEmpresas = async () => {
        try {
            setIsFetching(true);
            const response = await getEmpresasRequest({ orden, campo });

            if (response.error) {
                throw new Error(response.e.message || 'Error en la solicitud');
            }

            setEmpresas(response.data.empresa);
        } catch (error) {
            setErrorMessage('Error al obtener los datos de empresas.');
            toast.error(error.message || 'Error al obtener los datos');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchEmpresas();
    }, [orden, campo]);

    return {
        empresas,
        isFetching,
        errorMessage,
    };
};