import { useState, useEffect } from 'react';
import { getLogVista } from '../../services/api';
import toast from 'react-hot-toast';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Fecha Inválida';
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return date.toLocaleString('es-ES', options);
};

export const useLogVista = ({ orden, campo }) => {

    const [logins, setLogins] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchLogins = async () => {
            try {
                setIsFetching(true);
                const response = await getLogVista({ orden, campo });

                if (response.error) {
                    throw new Error(response.e.message);
                }

                const loginsData = response.data.logvista || [];
                if (Array.isArray(loginsData) && loginsData.length > 0) {
                    const formattedLogins = loginsData.map(login => ({
                        ...login,
                        fecha_de_registro: formatDate(login.fecha_de_registro) // Formatea la fecha
                    }));
                    setLogins(formattedLogins);
                    toast.success('Logs de vista cargados exitosamente');
                } else {
                    console.warn('No se encontraron registros de login.');
                    setLogins([]);
                }
            } catch (error) {
                setErrorMessage('Error al obtener los registros de inicio de sesión.');
                console.error(error);
                toast.error(error.message || 'Error al obtener los datos');
            } finally {
                setIsFetching(false);
            }
        };

        fetchLogins();
    }, [orden, campo]);

    return { logins, isFetching, errorMessage };
};